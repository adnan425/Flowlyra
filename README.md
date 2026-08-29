# Flowlyra

<p align="center">
  <strong>Understand features, not files.</strong>
</p>

<p align="center">
  Flowlyra is an open-source code intelligence tool that helps developers understand how a feature actually flows through a codebase — from UI to API to services, databases, queues, and external systems.
</p>

<p align="center">
  <a href="https://github.com/adnan425/Flowlyra/stargazers">
    <img src="https://img.shields.io/github/stars/adnan425/Flowlyra?style=flat-square" alt="GitHub Stars">
  </a>
  <a href="https://github.com/adnan425/Flowlyra/network/members">
    <img src="https://img.shields.io/github/forks/adnan425/Flowlyra?style=flat-square" alt="GitHub Forks">
  </a>
  <a href="https://github.com/adnan425/Flowlyra/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/adnan425/Flowlyra?style=flat-square" alt="License">
  </a>
</p>

---

## Why Flowlyra?

You clone a new codebase.

It contains:

```text
2,000 files
400 components
120 API routes
80 services
30 database models
```

Someone asks:

> **"How does user login work?"**

You shouldn't have to manually search through dozens of files to answer that.

Flowlyra aims to let you ask about a **feature** and visualize the complete path it takes through the application.

```text
                    User Login

 LoginPage.tsx
      │
      ▼
 POST /api/login
      │
      ▼
 AuthController
      │
      ▼
 AuthService
      │
      ├──────────────► TokenService
      │
      ▼
 UserRepository
      │
      ▼
 PostgreSQL
      │
      ▼
 Session / Cookie
```

**Stop exploring files. Start exploring flows.**

---

## The Idea

Instead of asking:

> Where is the authentication code?

Ask:

```bash
flowlyra trace "user login"
```

Flowlyra will eventually identify and connect the relevant parts of the codebase:

```text
UI
 ↓
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
 ↓
External Systems
```

Another example:

```bash
flowlyra trace "checkout"
```

Could produce:

```text
CartPage
   │
   ▼
POST /api/checkout
   │
   ▼
CheckoutController
   │
   ▼
CheckoutService
   │
   ├─────────────► InventoryService
   │
   ├─────────────► PaymentService
   │                    │
   │                    ▼
   │                  Stripe
   │
   ▼
OrderRepository
   │
   ▼
Database
   │
   ▼
NotificationService
```

---

## What Flowlyra Wants to Solve

Understanding an unfamiliar codebase usually involves:

* searching for filenames
* following imports manually
* jumping between controllers and services
* finding API routes
* tracing database calls
* checking event handlers
* finding queues and background jobs
* understanding third-party integrations
* asking someone who already knows the system

Flowlyra aims to automate that exploration.

### You ask:

```text
"How does password reset work?"
```

### Flowlyra finds:

```text
ForgotPasswordPage
        ↓
POST /api/password/reset
        ↓
AuthController
        ↓
PasswordResetService
        ↓
TokenRepository
        ↓
EmailService
        ↓
SendGrid
```

---

## Planned Experience

The long-term goal is to make Flowlyra usable from several places.

### CLI

```bash
flowlyra trace "authentication"
```

### Interactive Explorer

Select a feature and navigate through its execution flow visually.

```text
Authentication
     │
     ├── Login
     ├── Logout
     ├── Password Reset
     ├── Token Refresh
     └── Session Validation
```

### GitHub Repository Analysis

Point Flowlyra at a repository and explore features without manually navigating hundreds of files.

### IDE Integration

Eventually:

```text
Right click function
        ↓
"Show Flow"
        ↓
Interactive dependency path
```

---

## Planned Features

> Flowlyra is currently in early development. The features below describe the direction of the project.

### Feature Tracing

Ask Flowlyra how a feature works:

```bash
flowlyra trace "checkout"
```

### Interactive Flow Graphs

Explore relationships between:

* frontend components
* API endpoints
* controllers
* services
* functions
* database models
* queues
* events
* external APIs

### Clickable Source Nodes

Every node should lead back to the code responsible for it.

```text
AuthService
src/services/auth.ts:42
```

### Natural-Language Queries

Instead of knowing filenames:

```text
How does login work?

Where are payments processed?

What happens after a user creates an account?

How are notifications sent?

Where does file upload go?
```

### Framework Awareness

Flowlyra should understand framework conventions rather than treating every repository as a collection of random files.

Potential support:

* JavaScript / TypeScript
* React
* Next.js
* Node.js
* NestJS
* Python
* Django
* FastAPI
* Java / Spring
* Go
* Rust
* Laravel
* Rails

### Exportable Diagrams

Planned export formats could include:

```text
Mermaid
SVG
PNG
JSON
HTML
```

---

## Example

Imagine joining a large e-commerce project.

You want to understand:

```text
"How does placing an order work?"
```

Instead of manually searching the repository, Flowlyra could generate:

```text
                    PLACE ORDER

                    Checkout UI
                         │
                         ▼
                  POST /api/orders
                         │
                         ▼
                   OrderController
                         │
                         ▼
                    OrderService
                    /           \
                   ▼             ▼
          InventoryService   PaymentService
                   │             │
                   ▼             ▼
                Redis          Stripe
                   \             /
                    \           /
                         ▼
                  OrderRepository
                         │
                         ▼
                     PostgreSQL
                         │
                         ▼
               NotificationService
                         │
                         ▼
                       Email
```

And clicking:

```text
PaymentService
```

would take you directly to something like:

```text
src/services/payment.service.ts
```

---

## Vision

Most developer tools organize code around:

```text
files
folders
symbols
classes
functions
```

But developers often think in terms of:

```text
authentication
checkout
payments
notifications
uploads
search
subscriptions
orders
```

Flowlyra wants to bridge that gap.

### Files tell you where code lives.

### Flowlyra should tell you how the product works.

---

## Roadmap

### Phase 1 — Foundation

* [ ] Repository scanner
* [ ] File and language detection
* [ ] Import graph
* [ ] Function and symbol extraction
* [ ] Basic dependency graph
* [ ] CLI

### Phase 2 — Feature Flows

* [ ] Trace routes through the backend
* [ ] Detect controllers and services
* [ ] Detect database access
* [ ] Connect frontend calls to API routes
* [ ] Feature search
* [ ] Interactive visualization

### Phase 3 — Framework Intelligence

* [ ] Next.js
* [ ] Express
* [ ] NestJS
* [ ] FastAPI
* [ ] Django
* [ ] Spring Boot
* [ ] Laravel
* [ ] Rails

### Phase 4 — Code Intelligence

* [ ] Natural-language feature search
* [ ] Flow explanations
* [ ] Confidence scoring
* [ ] Background-job tracing
* [ ] Event tracing
* [ ] External-service detection

### Phase 5 — Ecosystem

* [ ] GitHub App
* [ ] VS Code extension
* [ ] Plugin system
* [ ] Shareable flow diagrams
* [ ] Community framework analyzers

---

## Architecture

The architecture is still being designed, but Flowlyra will likely separate language parsing from framework-specific understanding.

```text
Repository
    │
    ▼
Scanner
    │
    ▼
Language Parsers
    │
    ▼
Symbol + Dependency Graph
    │
    ▼
Framework Detectors
    │
    ▼
Feature Flow Engine
    │
    ▼
Visualization
```

This separation should make it easier for contributors to add support for new languages and frameworks.

---

## Contributing

Flowlyra is being built as an open-source project and contributions are welcome.

You don't need to implement a huge feature.

Future contribution areas will include:

* language parsers
* framework detectors
* visualization
* CLI improvements
* documentation
* test repositories
* bug fixes
* UI/UX
* performance
* developer experience

If you're interested in contributing, ⭐ star the repository and watch for upcoming issues tagged:

```text
good first issue
help wanted
parser
framework
visualization
documentation
```

You can also open an issue with an idea or framework you'd like Flowlyra to support.

---

## Help Shape Flowlyra

Flowlyra is at the beginning.

If you've ever joined a large codebase and thought:

> **"I just want to understand how this feature works."**

this project is for you.

Ideas, feedback, issues, experiments, and contributions are welcome.

---

## Star History

If you like the idea, consider giving Flowlyra a ⭐.

It helps other developers discover the project and motivates continued development.

---

## License

Flowlyra is released under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Flowlyra</strong>
  <br>
  Understand features, not files.
</p>
