# Jonathan Jinayon — Portfolio

A personal developer portfolio built with Next.js 16 (App Router), React 19, and strict TypeScript. The design is monospace-first and inspired by the OpenCode website: flat surfaces, thin borders, numbered sections, and restrained motion.

The site includes the standard portfolio sections plus an interactive `World` experience — a walkable knowledge map where software, science, invention, and library exhibits can be explored.

## Features

- Single-page portfolio: Hero, About, Tech Stack, Projects, Experience, and Contact.
- `/world` — an interactive knowledge world with a player, maps, exhibits, search, and a journal.
- Light/dark theme with a persisted preference and no flash on load.
- Route-safe navigation, a skip link, and reduced-motion support.
- Cache Components enabled (`cacheComponents` + `partialPrefetching`), with PPR as the default rendering model.
- Plain CSS Modules and shared design tokens — no Tailwind or CSS-in-JS.

## Tech Stack

- Next.js 16.4.3 (App Router)
- React 19.3
- TypeScript 5 (strict)
- ESLint 9 (flat config)
- IBM Plex Mono via `next/font/google`
- CSS Modules

## Getting Started

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page reloads as you edit files.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check the project |

## Project Structure

```text
app/                    Routes, root layout, global styles, design tokens
  page.tsx              Home page (portfolio sections)
  world/                Interactive knowledge world
  playground/           Permanent redirect to /world
components/
  layout/               Header, Footer
  sections/             Hero, About, TechStack, Projects, Experience, Contact
  ui/                   Button, Container, Section, Tag, Project/Experience items
  theme/                Theme toggle
  world/                World engine, HUD, panels, demos, exhibits
lib/
  content.ts            Editable portfolio content
  theme.ts              Theme initialization script
  knowledge/            World exhibit content and search index
  world/                Layout, movement, collision, pathfinding, journal logic
types/                  Shared TypeScript types
public/                 Static assets (portraits, icons)
```

## Editing Content

Most portfolio copy lives in [`lib/content.ts`](lib/content.ts): name, title, intro, about paragraphs, facts, tech groups, projects, experience, contact intro, and social links.

- Project entries are still placeholders — replace them with real names, descriptions, and technologies.
- Update the site metadata in [`app/layout.tsx`](app/layout.tsx).
- World exhibit content lives under [`lib/knowledge/`](lib/knowledge).

## Notes on Configuration

- `cacheComponents: true` and `partialPrefetching: true` are enabled in `next.config.ts`. Caching is opt-in with `use cache`, `cacheLife`, and `cacheTag`; route segment configs such as `dynamic`, `revalidate`, and `fetchCache` are unsupported.
- Route props use generated global types (for example `LayoutProps<"/">`). Regenerate `.next/types` by running `next dev` or `next build` after adding routes.
- There is no test framework configured.

## Deployment

The app is ready to deploy on [Vercel](https://vercel.com/new). Any Node.js host that supports Next.js works as well — build with `npm run build` and start with `npm run start`.

- Website link - [MyPortfolioLink](https://my-porfolio-rose-six.vercel.app/)
