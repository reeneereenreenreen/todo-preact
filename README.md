# 📋 The TODO List

A simple Preact project. Includes scripts for development, production builds, and testing.

- Vanilla CSS (no scss)
- Preact Framework

⚠️ Some features used in this project are not yet supported in all browsers. Build for the current Chrome versions.

- corner-shape
- animation-timeline: scroll()
- clip-path: shape()
- transition-behavior: allow-discrete

## Dependencies

- Preact https://preactjs.com/

- `npm ci` - Installs dependencies for a reproducible setup

## PWA (Progressiv Web App)

- Using the _vite-plugin-pwa_ package to create PWA functionality

## 📢 Quickstart

### Run

- `npm run build` - Builds the project for production, optimizing assets and output.
- `npm run preview` - Serves the optimized production build locally for testing and preview.

### Test

- `npm run test:coverage` - Run once

### Lint

- `npm run lint` - Run all linter

## Run: Getting Started

- `npm run dev` - Starts a dev server at http://localhost:5173/
- `npm run build` - Builds for production, emitting to `dist/`
- `npm run preview` - Starts a server at http://localhost:4173/ to test production build locally

## Test: Getting Started

- `npm run test` - Runs tests once and exits
- `npm run test:watch` - Runs tests in watch mode (recommended for development)
- `npm run test:ui` - Starts the visual UI debugger at http://localhost:148/

## Test: Debugging

- `npx vitest Badge.test.tsx` - Runs only the `Badge.test.tsx` file
- `npm run test:coverage` - Runs tests and generates a coverage report

## Linting

ESLint + Preact/TS, Stylelint for CSS, Prettier (auto-fix)

## Lint: Getting Started

- `npm run lint:fix` - Fixes TypeScript/TSX issues and formats code
- `npm run stylelint:fix` - Fixes CSS issues
- `npm run lint:check` - Checks for lint issues (CI, fails on errors)
- `npm run format` - Formats all files with Prettier
