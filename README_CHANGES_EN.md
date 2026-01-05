
#  Rick and Morty — Employability Assessment (Refactor)

This project is a Next.js 15 + TypeScript application that consumes the Rick and Morty API. The main objective of this intervention was to transform a codebase with technical debt into a professional, maintainable, and robust application.

##  Intervention summary

The application was transformed from a project with runtime errors and missing types into a modern architecture based on separation of concerns and strict typing.

## 1. Architecture and structure

- **Component consolidation:** removed duplicated component folders and centralized UI under `src/app/components` with organized subfolders (`card`, `filters`, `header`, `sidebar`).
- **Route fixes:** renamed the misnamed `src/app/home)` folder to `src/app/home` to prevent import/resolution errors.
- **Styles migration:** replaced `styled-components` with CSS Modules (`.module.css`) to simplify styling, improve load performance and visual consistency.

## 2. TypeScript and code quality (Zero `any` policy)

We cleaned up types to ensure the project compiles without warnings:

- **Typed services:** `getCharacters()` in `src/services/api.ts` now returns `Promise<Character[]>` and validates the `CharactersApiResponse` shape.
- **Utilities:** typed and simplified helpers in `src/utils/helpers.ts` (e.g., `isAlive`).
- **Component props:** components such as `CharacterCard` now require strict interfaces, removing untyped props.

## 3. Business logic and hooks

Data consumption was extracted into a custom hook `useCharacters`:

- **Centralization:** Home and Dashboard now use the same hook for data, loading/error state, and refetching.
- **React error prevention:** fixed the hook-order bug ("Rendered more hooks than during the previous render") by declaring all hooks before any early returns.

## 4. Authentication and security

- **Mock auth:** implemented a simulated authentication flow using `localStorage`.
- **Route protection:** Dashboard redirects to `/login` when no active user is detected.
- **API proxy previously used:** server routes (e.g. `src/app/api/characters` and `src/app/api/image`) were available as a workaround for CORS/SSL issues; the codebase can use proxies or call the external API directly depending on the environment.

## 🛠 Technical decisions

- **Separation of concerns:** fetch logic lives in `services`, state in `hooks`, and UI in `components`.
- **`localStorage` for auth:** chosen to enable full flow testing (Register → Login → Dashboard) without a backend.
- **Server-side proxy:** used when SSL/CORS issues are present in the client environment.

##  How to run the project locally

Install dependencies:

```bash
npm install
```

Ensure `public/img/rick.jpg` exists.

Start the dev server:

```bash
npm run dev
```

Test flow:
- Go to `/register` and create an account.
- Log in at `/login`.
- Open the protected Dashboard and verify filters and status filters work as expected.

##  Next steps (improvement roadmap)

- Data validation: add Zod to validate external API responses at runtime.
- Real authentication: migrate from `localStorage` to JWT or session-based auth backed by a server.
- Image optimization: adopt `next/image` to improve LCP and overall performance.
- Testing: add unit tests for `useCharacters` and E2E tests for auth flow using Playwright.
- Accessibility: perform an ARIA/accessibility audit to ensure navigation and modals are fully accessible.
