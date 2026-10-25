<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

- Next.js 16.4.3 App Router, React 19, TypeScript (strict), plain CSS Modules (no Tailwind CSS).
- Use npm (`package-lock.json` is the lockfile).
- No test framework is configured.

## Commands

- `npm run dev`, `npm run build`, `npm run start`
- `npm run lint` (ESLint 9 flat config)
- No typecheck script: use `npx tsc --noEmit`

## Layout and conventions

- All routes live in `app/`; `app/layout.tsx` is the root layout and `app/page.tsx` is `/`.
- `@/*` resolves to the repo root (there is no `src/` directory).
- Styling uses CSS Modules with design tokens in `app/globals.css`. Do not add Tailwind, PostCSS, or a CSS-in-JS library.
- Editable portfolio content lives in `lib/content.ts`; reusable UI lives under `components/`.
- Route props use generated global types, e.g. `LayoutProps<"/">` in `app/layout.tsx`. Regenerate `.next/types` with `next dev` or `next build` when adding routes.

## Config gotchas

- `cacheComponents: true` and `partialPrefetching: true` are enabled. Caching is opt-in (`use cache`, `cacheLife`, `cacheTag`); route segment configs `dynamic`/`revalidate`/`fetchCache` and `runtime` exports are unsupported, and PPR is default. Read `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md` before changing caching behavior.
- `experimental.agentFeedback` is enabled in `next.config.ts`; leave it in place.
- `.next/` is generated — never edit it. The Next.js block at the top is rewritten by `next dev`; keep it.
