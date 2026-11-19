## Change

Describe the concrete problem and resulting behavior. Include screenshots for
visible changes and link the relevant issue or ADR.

## Validation

- [ ] `yarn install --immutable` and `yarn release:check`
- [ ] `yarn audit:high` (also enforced by CI)
- [ ] Browser smoke result recorded (or precise local limitation; CI remains required)
- [ ] Relevant behavior exercised, including session/workspace boundaries if affected
- [ ] Environment changes, migration/runtime compatibility and rollback documented if affected
- [ ] No credentials or private source maps included; CHANGELOG updated for user-facing changes

Include command results, relevant bundle changes and any known limitations.
