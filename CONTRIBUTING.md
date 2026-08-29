# Contributing to Flowlyra

Thanks for your interest in contributing to Flowlyra.

Flowlyra is an open-source code intelligence project focused on one question:

> **How does this feature actually work through the codebase?**

The project is early, which means contributors can help shape the architecture, analysis model, framework support, CLI, and visualization experience.

## Ways to contribute

You can help with:

- static analysis and AST tooling
- call-graph and dependency-graph analysis
- JavaScript / TypeScript parsing
- framework detection
- feature-flow tracing
- graph algorithms
- visualization and UI/UX
- CLI developer experience
- test fixtures
- documentation
- performance
- bug reports and reproducible examples

You do **not** need to understand the entire project before contributing.

## Before opening a PR

For small fixes, documentation improvements, tests, or clearly scoped issues, feel free to open a pull request directly.

For larger features or architectural changes, please open an issue first so we can agree on the direction before significant work begins.

## Contribution philosophy

Flowlyra should remain:

1. **Feature-first** — users explore product behavior, not just files.
2. **Source-linked** — important claims should point back to source code.
3. **Evidence-driven** — deterministic analysis should be preferred where possible.
4. **Local-friendly** — private source code should not require upload to a third-party service.
5. **Extensible** — new languages and frameworks should be addable without rewriting the core.
6. **Honest about confidence** — inferred relationships should be distinguishable from directly discovered relationships.

## Development setup

The implementation is still being established.

Until the first development environment is committed, please use issues to discuss proposed contributions. This section will be updated with exact install, test, lint, and build commands as soon as the first runnable version lands.

## Good first contributions

Great early contributions include:

- add a small test repository fixture
- propose a graph-node or edge schema
- prototype a framework detector
- improve docs or diagrams
- research parser options for a language
- create benchmark repositories
- improve CLI command design
- prototype visualization components

Look for issues labeled:

- `good first issue`
- `help wanted`
- `framework`
- `parser`
- `visualization`
- `documentation`

## Pull request checklist

Before submitting a pull request:

- [ ] The change has a clear purpose.
- [ ] Related issue is linked when applicable.
- [ ] Tests or fixtures are included when behavior changes.
- [ ] Documentation is updated when user-facing behavior changes.
- [ ] New analysis logic explains what evidence it relies on.
- [ ] No private repository content, credentials, or secrets are committed.
- [ ] The PR is focused and avoids unrelated changes.

## Commit messages

Clear commit messages are preferred.

Examples:

```text
feat(tracer): connect Express routes to controller handlers
fix(parser): resolve aliased TypeScript imports
docs: add framework detector contribution guide
test: add Next.js app-router fixture
```

## Reporting bugs

Use the bug report issue form and include:

- the smallest repository or fixture that reproduces the problem
- expected behavior
- actual behavior
- Flowlyra version or commit
- OS/runtime information
- relevant logs with secrets removed

## Requesting framework support

Use the framework support issue form.

Helpful information includes:

- framework name and version
- official routing conventions
- controller/service conventions
- ORM or data-access conventions
- event/background-job conventions
- a small public example repository

## Code of Conduct

By participating in this project, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Please do not report vulnerabilities in public issues. See [SECURITY.md](SECURITY.md).

## Questions

For general help, see [SUPPORT.md](SUPPORT.md).

Thank you for helping build Flowlyra.
