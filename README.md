# Canonical CLA UI

A Svelte 5 application for managing and signing **Contributor License Agreements (CLAs)** for Canonical projects. This UI interfaces with the Canonical CLA API, supporting GitHub, Launchpad, and OIDC authentication flows.

---

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed.

### Installation

```sh
bun install

```

### Development

Start the development server:

```sh
# Standard dev mode
bun run dev
```

---

## 📡 API Integration (OpenAPI)

The project uses `openapi-typescript` to maintain a type-safe interface with the CLA backend.

- **Update Schema**: Fetch the latest `openapi.json` from production.
- **Generate Types**: Re-generate TypeScript interfaces from the local schema.

```sh
# Run both steps
bun run openapi:update

# Or run individually
bun run openapi:update-schema
bun run openapi:generate-types

```

The generated types are located at `src/lib/api/cla/types.ts`.

---

## 🧪 Testing & Quality

This project maintains high code standards through multiple testing layers.

### Unit & Component Testing (Vitest)

Tests are split into `client`, `server`, and `storybook` projects within the Vitest config.

```sh
# Run all tests
bun run test

# Component testing with browser provider (Playwright)
# Controlled via vite.config.ts

```

### End-to-End Testing (Playwright)

```sh
bun run test:e2e # (Ensure dev server is running or use playwright's built-in server)

```

### UI Components (Storybook)

Explore and develop UI components in isolation:

```sh
bun run storybook

```

### Linting & Formatting

```sh
# Check for issues
bun run check

# Automatically fix linting and formatting
bun run check:fix

```

---

## 🏗️ Building for Production

```sh
bun run build

```

The app uses `@sveltejs/adapter-auto`. For specific environments (e.g., Docker, Vercel), update the `adapter` in `svelte.config.js`.

---

## 📂 Project Structure

- `src/lib/api/`: API clients and generated OpenAPI types.
- `src/routes/`: SvelteKit pages and layouts.
- `.api-spec/`: Storage for the `cla.json` OpenAPI definition.
- `e2e/`: Playwright end-to-end tests.
- `scripts/`: Utility shell scripts (e.g., schema updates).

---

## 🤖 Agent Instructions

If you are using an AI agent (like Cursor or VS Code with MCP), refer to `AGENTS.md` for specific tool usage instructions regarding the Svelte 5 documentation and auto-fixers.
