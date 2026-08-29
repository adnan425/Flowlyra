# Security Policy

## Reporting a vulnerability

Please **do not open a public GitHub issue** for security vulnerabilities.

Flowlyra analyzes source code and may eventually interact with local repositories, repository metadata, parser outputs, and generated artifacts. Security and privacy issues in these areas are taken seriously.

When reporting a vulnerability, please include:

- a concise description of the issue
- affected component or feature
- reproduction steps or proof of concept
- expected impact
- suggested mitigation, if known
- whether the issue may expose source code, secrets, filesystem data, or remote content

Remove real credentials, tokens, private repository contents, and personally identifiable information from reports.

## Security principles

Flowlyra aims to follow these principles:

- local analysis should remain local unless the user explicitly enables an external integration
- source code should not be uploaded silently
- secrets should never be included in generated telemetry or example output
- external repository content should be treated as untrusted input
- generated paths and links should be validated before use
- parsers and analyzers should fail safely on malformed input

## Supported versions

Flowlyra is currently in early development. Until versioned releases begin, security fixes will target the latest code on the default branch.
