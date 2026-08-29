# Flowlyra Launch Checklist

## Repository metadata

Recommended About description:

> Open-source code intelligence for tracing and visualizing how features flow through a codebase.

Recommended topics:

- code-intelligence
- code-visualization
- code-analysis
- static-analysis
- call-graph
- dependency-graph
- software-architecture
- architecture-visualization
- developer-tools
- code-navigation
- source-code-analysis
- program-analysis
- ast
- data-flow
- code-comprehension
- repository-analysis
- open-source
- typescript
- developer-experience
- codebase-visualization

## Before public promotion

- [ ] README renders correctly on the repository root.
- [ ] Hero visual or real demo GIF appears above the fold.
- [ ] Repository About description is updated.
- [ ] Repository topics are added.
- [ ] Social preview image is configured in repository settings.
- [ ] `CONTRIBUTING.md` is present.
- [ ] `CODE_OF_CONDUCT.md` is present.
- [ ] `SECURITY.md` is present.
- [ ] Issue forms are enabled.
- [ ] Pull request template is present.
- [ ] Labels used by issue forms exist.
- [ ] At least 8 real contribution issues are open.
- [ ] At least 3 are genuinely small `good first issue` tasks.
- [ ] First working demo is reproducible.
- [ ] README does not claim unreleased features are already available.
- [ ] Demo uses a public fixture repository so others can reproduce it.

## First-screen README target

A visitor should understand these within ~10 seconds:

1. What Flowlyra does.
2. What makes it different.
3. What the output looks like.
4. Whether they can try it now.
5. How to contribute if it is still pre-release.

## Demo concept

Record a short terminal + graph demo:

```text
$ flowlyra trace "user login"

Discovering feature entry points...
Tracing route handlers...
Connecting service and data access...

LoginPage
   ↓
POST /api/login
   ↓
AuthController
   ↓
AuthService
   ↓
UserRepository
   ↓
PostgreSQL
```

Then transition to the interactive graph.

Keep it short, readable, and real.
