# Suggested First Issues

These issues are designed to attract contributors while building real project foundations.

## 1. Define the unified graph schema

**Labels:** `help wanted`, `architecture`

Design the first representation for nodes and edges used by Flowlyra.

Candidate nodes:

- file
- module
- function
- class
- route
- component
- service
- repository
- database model
- queue
- event
- external service

Candidate edges:

- imports
- calls
- handles-route
- reads-from
- writes-to
- emits
- consumes
- renders
- invokes-external

**Success:** a documented TypeScript schema with representative examples.

---

## 2. Create the first TypeScript fixture repository

**Labels:** `good first issue`, `testing`, `typescript`

Add a tiny example application that contains:

- login UI
- API route
- auth service
- user repository
- mock database access

**Success:** the expected login flow can be written down unambiguously.

---

## 3. Detect JavaScript / TypeScript imports

**Labels:** `good first issue`, `parser`, `typescript`

Parse a fixture project and output import relationships.

**Success:** tests correctly identify relative and aliased imports in the fixture.

---

## 4. Prototype `flowlyra analyze .`

**Labels:** `good first issue`, `cli`

Create the CLI shell for analyzing the current directory.

**Success:** the command accepts a path and prints basic repository metadata without crashing.

---

## 5. Prototype Mermaid rendering

**Labels:** `good first issue`, `visualization`

Take a small in-memory graph and export it as a Mermaid flowchart.

**Success:** the fixture login flow renders correctly on GitHub.

---

## 6. Research AST parser strategy

**Labels:** `help wanted`, `research`, `parser`

Compare viable parsing approaches for JavaScript/TypeScript, including tradeoffs for speed, symbol resolution, and cross-language expansion.

**Success:** short architecture decision record with a recommendation.

---

## 7. Detect Express routes

**Labels:** `good first issue`, `framework`, `express`

Detect common Express route declarations and map HTTP method + path to handler.

**Success:** fixture tests cover direct handlers and router-based routes.

---

## 8. Detect Next.js App Router endpoints

**Labels:** `help wanted`, `framework`, `nextjs`

Recognize route handlers under the Next.js App Router convention.

**Success:** map filesystem routes to HTTP endpoints and handler source locations.

---

## 9. Add source-location metadata

**Labels:** `good first issue`, `core`

Ensure graph nodes can retain file path plus line/column ranges.

**Success:** rendered nodes can point back to the exact source location.

---

## 10. Add confidence metadata to inferred edges

**Labels:** `help wanted`, `core`

Design a simple confidence/evidence model so Flowlyra can distinguish direct static-analysis evidence from heuristics.

**Success:** edges can explain why they exist.

---

## 11. Create a benchmark fixture suite

**Labels:** `help wanted`, `testing`

Collect tiny public or purpose-built fixtures representing common app structures.

**Success:** repeatable expected flows exist for at least three frameworks.

---

## 12. Design the first interactive flow explorer

**Labels:** `help wanted`, `visualization`, `frontend`

Prototype an interface where a user can:

- view a feature flow
- expand/collapse nodes
- inspect source location
- search nodes

**Success:** clickable prototype or minimal implementation with the login fixture.
