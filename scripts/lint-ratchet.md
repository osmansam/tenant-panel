# Lint debt ratchet

`yarn lint` runs all configured ESLint rules, including TypeScript recommended,
four type-aware promise/assertion rules, React Hooks, and JSX accessibility.
It rejects any file/rule count above `lint-baseline.json`. Warnings count too.
Hook-order violations, missing rule definitions, and fatal/parser errors always fail, even if someone adds
them to the baseline.

The baseline records existing findings, not exemptions in the ESLint config.
`yarn lint:report` shows the complete debt with locations. Fix a category in a
file, then run `yarn lint:baseline` to lower the baseline. This command cannot
increase debt. Review and commit the reduced baseline alongside the fixes.
New files have zero allowance. When renaming a file with debt, review that debt
explicitly rather than automatically transferring the allowance.

Counts are per file and rule, so replacing a finding with another of the same
rule in the same file is not detectable. Reviewers should inspect changed lines
and use the full lint report. The baseline is intentionally explicit about this
limit; it does not imply the application is free of lint findings.

`node --test scripts/lint-ratchet.test.mjs` verifies the comparison rules.
`--seed` is reserved for the initial baseline and refuses an existing file.
