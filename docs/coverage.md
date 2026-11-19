# Coverage gate

Run `corepack yarn test:coverage` to run the complete Vitest suite with V8 coverage and enforce the checked-in floors. Reports are written to `coverage/`, including `lcov.info`, `coverage-summary.json`, and per-file `coverage-final.json`. Coverage workers and report processing run one at a time to keep memory bounded. CI uploads the reports even when the test or coverage gate fails.

The gate measures every TypeScript and JavaScript source file under `src/`, including files never imported by a test, authored starter documents, and vendored visual effects. It excludes test files, declaration-only files, test setup/helpers, `testFixtures.ts`, and generated `*.generated.ts` files. The generated starter catalog contains metadata and import descriptors produced by `scripts/generate-starter-catalog.mjs`; its generator parity and loader contract are tested directly. CSS, images, and other non-code assets are outside the executable-code denominator. There are no application-directory exclusions.

The initial measurement before the new coverage tests was:

| Metric | Covered / total | Initial coverage | Required floor |
| --- | --- | --- | --- |
| Lines | 36,688 / 190,372 | 19.27174% | 21.28% |
| Statements | 36,688 / 190,373 | 19.27164% | 21.28% |
| Functions | 2,037 / 3,844 | 52.99168% | 55.00% |
| Branches | 9,297 / 12,871 | 72.23215% | 74.24% |

Each floor is the measured value plus two percentage points, rounded upward to the next hundredth. The first report included the newly generated catalog; its exact counts were subtracted to use the same exclusions as the final configuration. The raw counts and the adjustment are recorded in `scripts/coverage-baseline.json`. That first run had one failing pre-existing keyboard assertion, subsequently corrected; no successful baseline-suite run is implied by these measurements. A complete passing run is required by `test:coverage` before its report can pass the gate.

The verified run on 2026-11-19 passed all 190 test files and 1,108 tests, then passed the gate:

| Metric | Covered / total | Verified coverage | Floor |
| --- | --- | --- | --- |
| Lines | 138,738 / 190,625 | 72.78059% | 21.28% |
| Statements | 138,738 / 190,625 | 72.78059% | 21.28% |
| Functions | 2,157 / 3,853 | 55.98235% | 55.00% |
| Branches | 10,723 / 14,284 | 75.07001% | 74.24% |

The gate calculates percentages from raw covered/total counts, so its rounded display can differ by 0.01 from V8's truncated summary. The initial and final denominators can also differ when V8 discovers functions and branches in newly executed modules; both sets of raw counts are retained rather than assuming an unchanged denominator.

The added coverage tests prioritize strict document validation, legacy and effect migration integrity, immutable subtree/table/effect edits, renderer editing and layout models, storage corruption and permission failures, template ID collisions, and version/style-kit retention. Runtime tests exercise table controls, keyboard and pointer chart edits, disclosure and tab navigation, and inline text commits. Every authored starter also has to migrate and round-trip through JSON export/import without changing its source.

Starter documents contain a large share of the repository's source lines, so loading and validating the full catalog produces a large line-coverage increase. The independent function and branch floors remain required; importing static document data alone does not satisfy the gate. WebGL effects, editor event handlers, and browser-only animation behavior still need targeted behavioral coverage; the global percentage does not establish their correctness.

## Monthly review

The checked-in baseline records a reviewed calendar month in UTC. From the next month onward, the gate fails until a review raises the floors. During the review:

1. Inspect `coverage/coverage-summary.json`, `coverage/coverage-final.json`, and `coverage/lcov.info`; add behavior tests for meaningful uncovered paths.
2. Run `corepack yarn coverage:ratchet`. It runs the full suite again and raises **every** metric floor by two percentage points, capped at 100%, only if that fresh report meets the new floors.
3. Review and commit the resulting `scripts/coverage-baseline.json` change with the tests. A second ratchet in the same month is rejected. The original measurement is retained for provenance.

Neither a normal coverage run nor a failed ratchet rewrites the floors. Do not reset the initial measurement, reduce thresholds, or exclude application files to make a failed gate pass. `corepack yarn test:coverage-gate` exercises the gate's precision, missing-data rejection, month/year rollover, upward-only review, and 100% cap.
