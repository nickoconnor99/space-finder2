# Copilot Instructions for AI Coding Agents

## Big Picture Architecture

This workspace contains two main projects:

- **react-frontend/**: A React + TypeScript app using Vite for fast builds and HMR. Frontend code is organized under `src/`, with components, services, and assets. Auth logic is in `src/services/AuthService.ts` and UI components in `src/components/`.
- **space-finder2V4/**: An AWS CDK TypeScript project for backend infrastructure and Lambda services. Key stacks are in `infra/stacks/`, Lambda handlers in `services/spaces/`, and shared utilities in `services/shared/`.

Frontend and backend communicate via API endpoints defined in CDK stacks and Lambda handlers.

## Developer Workflows

- **Frontend**:
  - Build: `npm run build` (in `react-frontend`)
  - Dev server: `npm run dev` (Vite)
  - Lint: `npm run lint` (ESLint, config in `eslint.config.js`)
  - Entry: `src/main.tsx`, root component: `App.tsx`
- **Backend/CDK**:
  - Build: `npm run build` (in `space-finder2V4`)
  - Watch: `npm run watch`
  - Test: `npm run test` (Jest)
  - Deploy: `cdk deploy`
  - Diff: `cdk diff`
  - Synth: `cdk synth`

## Project-Specific Patterns

- **Frontend**:
  - Use TypeScript and React function components.
  - Service logic (e.g., authentication) is separated in `src/services/`.
  - Components are grouped in `src/components/`.
  - Vite config: `vite.config.ts`, TypeScript configs: `tsconfig*.json`.
- **Backend**:
  - CDK stacks are modularized in `infra/stacks/`.
  - Lambda handlers are in `services/spaces/` (e.g., `GetSpaces.ts`, `PostSpaces.ts`).
  - Shared utilities: `services/shared/`.
  - Main stack entry: `lib/space-finder2-stack.ts`.

## Integration Points

- **Frontend ↔ Backend**: API endpoints are managed by CDK stacks and Lambda handlers. Update `infra/stacks/ApiStack.ts` and `services/spaces/handler.ts` for new endpoints.
- **Auth**: Auth logic is handled in `src/services/AuthService.ts` (frontend) and `infra/stacks/AuthStack.ts` (backend).

## External Dependencies

- **Frontend**: React, Vite, TypeScript, ESLint.
- **Backend**: AWS CDK, Jest, TypeScript.

## Examples

- To add a new API endpoint, create a Lambda handler in `services/spaces/`, update `infra/stacks/ApiStack.ts`, and redeploy with `cdk deploy`.
- To add a new frontend feature, create a component in `src/components/` and update service logic in `src/services/` if needed.

## Key Files/Directories

- `react-frontend/src/components/` — UI components
- `react-frontend/src/services/` — Service logic (e.g., Auth)
- `space-finder2V4/infra/stacks/` — CDK stack definitions
- `space-finder2V4/services/spaces/` — Lambda handlers
- `space-finder2V4/services/shared/` — Shared utilities
- `space-finder2V4/lib/space-finder2-stack.ts` — Main stack entry

---

**Review and update these instructions as the architecture evolves.**
