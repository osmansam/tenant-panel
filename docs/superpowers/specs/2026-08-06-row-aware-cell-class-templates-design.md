# Row-aware Cell Class Templates

## Goal

Allow table cell class rules to use top-level values from the current row in both the tenantPanel preview and the react-template runtime.

## Syntax

- `{{backgroundColor}}` supports a row value containing a complete class, such as `bg-red-500`.
- `bg-[{{backgroundColor}}]` supports a row value containing a raw CSS color, such as `#ff0000`, `rgb(255, 0, 0)`, or `red`.
- Static and dynamic tokens can be combined, such as `text-white bg-[{{backgroundColor}}]`.
- Only top-level row fields are supported. Missing, null, object, and array values resolve to an empty string.

## Design

Add a shared-purpose resolver to each frontend's `genericPageHelpers.ts`. The resolver interpolates placeholders only after a cell-class rule matches its condition. It returns the resolved class string and extracts runtime arbitrary background colors into an inline `backgroundColor` style, because Tailwind cannot generate CSS for arbitrary values known only at runtime.

Extend GenericTable row-key presentation from class-only to class plus optional cell style. Paginated and unpaginated table builders pass the same row to the resolver. Existing static classes, conditional rules, fallback rules, computed-label rows, and legacy field configuration continue to behave unchanged.

The Page Designer cell-class editor will document both supported examples.

## Validation

Tests cover complete-class interpolation, arbitrary raw colors, mixed static/dynamic content, missing values, condition and fallback behavior, invalid non-scalar values, and equivalent behavior in tenantPanel and react-template. Both frontend test suites and production builds must pass.
