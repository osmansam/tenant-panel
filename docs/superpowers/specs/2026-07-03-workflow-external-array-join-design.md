# Workflow External Array Join Design

## Goal

Allow a data-returning workflow to:

1. Read records from an AutoTable schema.
2. Query a configured, read-only Dynamic API synchronously.
3. Join the two arrays using configurable fields.
4. Add configurable values from matching external items.
5. Return the enriched records as a table source.

The initial use case enriches `product` records by matching
`product.davinciId` to the `_id` returned by the `davinci-menu-items`
Dynamic API and adds the external `price` as `davinciPrice`. A missing match
produces `"-"`.

No schema name, URL, field name, or output value is hard-coded in the workflow
engine.

## Existing Constraints

`autotable-Go` already supports configured Dynamic APIs and synchronous HTTP
execution internally. The existing `execute_dynamic_api` workflow step cannot
be used here because it is classified as potentially side-effecting and must
run in outbox mode. Outbox steps execute asynchronously and cannot provide
their output to a later `join` or `return` step.

The workflow engine also has no operation that joins two in-memory arrays.
Existing `for_each` and `transform` steps cannot efficiently create the
required enriched result.

## Architecture

Add two reusable workflow step types to `autotable-Go`:

- `query_dynamic_api`: synchronously executes an existing Dynamic API only
  when its configured HTTP method is `GET`.
- `join_arrays`: performs a left join between a primary item array and a
  lookup array, then copies configured lookup fields onto cloned primary
  items.

Both steps run in the synchronous workflow phase. They are read-only, so a
workflow containing only read operations, these steps, and `return` does not
require a MongoDB transaction.

`tenantPanel` and `react-template` already support selecting a workflow as a
table source and using the workflow's `outputFields` to configure table
columns. They require no runtime behavior change for this use case.

## Dynamic API Configuration

The external URL remains in the container's existing `dynamicApis`
configuration:

```json
{
  "name": "davinci-menu-items",
  "url": "https://apiv2.davinciboardgame.com/menu/items",
  "method": "GET",
  "dependencies": [],
  "isAuthenticated": false,
  "isAuthorized": false,
  "authorizeRole": [],
  "isActive": true,
  "isRedisCached": true,
  "cacheTime": 10
}
```

The workflow references the Dynamic API by name. It never accepts an arbitrary
URL in the workflow step.

## `query_dynamic_api` Contract

Example:

```json
{
  "name": "davinciItems",
  "type": "query_dynamic_api",
  "order": 2,
  "isActive": true,
  "targetSchema": "product",
  "config": {
    "apiName": "davinci-menu-items",
    "body": {}
  }
}
```

Behavior:

- `apiName` is required.
- The referenced Dynamic API must exist, be active, and use HTTP `GET`
  case-insensitively.
- Optional `body` configuration is resolved using existing workflow template
  rules and must resolve to an object. This preserves the existing dependency
  mechanism.
- Execution reuses `DynamicService.ExecuteDynamicAPI`, including dependency
  validation, timeout, response-size limit, JSON decoding, and Redis caching.
- The step output has the existing Dynamic API result shape:

```json
{
  "message": "API result fetched",
  "data": [],
  "source": "API call"
}
```

- API, decoding, configuration, or cache errors fail the workflow. A missing
  join match is handled separately by `join_arrays` and does not fail the
  workflow.

## `join_arrays` Contract

Example:

```json
{
  "name": "enrichedProducts",
  "type": "join_arrays",
  "order": 3,
  "isActive": true,
  "config": {
    "items": "{{steps.products.items}}",
    "lookupItems": "{{steps.davinciItems.data}}",
    "localField": "davinciId",
    "lookupField": "_id",
    "mappings": {
      "davinciPrice": "price"
    },
    "fallbacks": {
      "davinciPrice": "-"
    }
  }
}
```

Behavior:

- `items` and `lookupItems` are required and must resolve to arrays of objects.
- `localField`, `lookupField`, and at least one `mappings` entry are required.
- Field paths support dot notation.
- `mappings` maps each destination field on the primary item to a source field
  on the matched lookup item.
- `fallbacks` is optional. When no lookup item matches, or a mapped lookup
  value is absent, the destination receives its configured fallback. Without
  a configured fallback, it receives `null`.
- Matching normalizes numeric types so Mongo integer values match JSON numbers
  such as `181` decoded as `float64(181)`. Non-numeric scalar values use their
  exact string representation.
- Lookup keys must be scalar values. Missing or unsupported keys do not match.
- If the lookup array contains duplicate keys, the first item wins.
- Primary records are cloned before enrichment; workflow step inputs are not
  mutated.
- The result preserves primary item order and has this shape:

```json
{
  "items": [],
  "count": 0
}
```

Invalid configuration or non-object array entries fail the workflow with a
specific validation/runtime error.

## Complete Workflow

```json
{
  "name": "products-with-external-prices",
  "trigger": "manual",
  "mode": "transactional",
  "isActive": true,
  "stopOnError": true,
  "timeoutSec": 30,
  "outputFields": [
    "name",
    "image",
    "davinciId",
    "price",
    "category",
    "davinciPrice"
  ],
  "steps": [
    {
      "name": "products",
      "type": "find_records",
      "order": 1,
      "isActive": true,
      "targetSchema": "product",
      "config": {
        "limit": 500
      }
    },
    {
      "name": "davinciItems",
      "type": "query_dynamic_api",
      "order": 2,
      "isActive": true,
      "targetSchema": "product",
      "config": {
        "apiName": "davinci-menu-items",
        "body": {}
      }
    },
    {
      "name": "enrichedProducts",
      "type": "join_arrays",
      "order": 3,
      "isActive": true,
      "config": {
        "items": "{{steps.products.items}}",
        "lookupItems": "{{steps.davinciItems.data}}",
        "localField": "davinciId",
        "lookupField": "_id",
        "mappings": {
          "davinciPrice": "price"
        },
        "fallbacks": {
          "davinciPrice": "-"
        }
      }
    },
    {
      "name": "result",
      "type": "return",
      "order": 4,
      "isActive": true,
      "config": {
        "value": "{{steps.enrichedProducts.items}}"
      }
    }
  ]
}
```

The existing workflow `find_records` limit is 500. Consequently this workflow
is suitable only while the source schema contains at most 500 relevant
records. Supporting larger datasets requires a separate pagination design and
is outside this change.

## Table Configuration

In Page Designer:

1. Select `product` as the table schema.
2. Select `Workflow request` as the table source.
3. Select `products-with-external-prices`.
4. Include `davinciPrice` among the table columns and optionally label it
   `Davinci Price`.

The table-source endpoint executes the workflow, validates that it returned an
array of objects, projects the requested fields, and applies its existing
in-memory pagination.

## Validation

Workflow validation must:

- Recognize `query_dynamic_api` and `join_arrays` as supported step types.
- Require a non-empty `apiName` for `query_dynamic_api`.
- Require `items`, `lookupItems`, `localField`, `lookupField`, and non-empty
  `mappings` for `join_arrays`.
- Permit both steps in synchronous/transactional execution mode.
- Continue requiring the existing `execute_dynamic_api` step to use outbox
  mode.

Runtime validation must verify the referenced Dynamic API because workflow
validation does not have access to the container definition.

## Testing

Add focused `autotable-Go` tests for:

- Workflow validation accepts both new step types with valid configuration.
- Workflow validation rejects each missing required configuration value.
- `query_dynamic_api` rejects missing, inactive, and non-GET Dynamic APIs.
- `query_dynamic_api` returns the existing Dynamic API result shape.
- `join_arrays` matches equivalent integer and JSON numeric keys.
- `join_arrays` copies one or multiple configured fields.
- Missing matches and missing source values apply configured fallbacks.
- Missing fallbacks produce `null`.
- Duplicate lookup keys use the first item.
- Nested source and destination field paths work.
- Inputs are not mutated.
- Invalid arrays and non-object entries return clear errors.
- The complete workflow returns enriched rows compatible with
  `GetTableSource`.

Run the full Go test suite after focused tests pass.

## Scope

This change modifies `autotable-Go` workflow models, validation, execution, and
tests. The Dynamic API and workflow definitions are project data configured
after deployment. No hard-coded Davinci behavior is added to any repository.

No `tenantPanel` or `react-template` source change is required unless later
work adds a visual editor specifically for these workflow step types.
