# Developer Portfolio Design and Implementation Plan

## Status

The initial portfolio implementation is complete, including the profile portrait and the redesigned Hero. This revision adds the design and implementation plan for a separate interactive playground route at `/playground`.

Current repository state:

- Next.js 16.4.3 App Router with React 19 and strict TypeScript.
- OpenCode-inspired portfolio implemented with IBM Plex Mono and CSS Modules.
- Tailwind CSS has been removed.
- `cacheComponents: true` and `partialPrefetching: true` are enabled.
- No test framework is configured.
- `public/profile.jpg` contains the approved theme-matched portrait used by the Hero.
- About copy, focus areas, location, and experience entries are populated with current portfolio content.
- Project entries, the email address, GitHub and LinkedIn links, and one Additional tech group still contain explicit placeholders.
- The shared Header currently uses hash-only anchors and must become route-safe before `/playground` ships.
- Playground work is planned only; no playground source files have been created yet.

### Content gaps before launch

The playground can render all existing sections, but it must not invent missing details. These values still need to be supplied:

- Real project entries, descriptions, and optional links.
- Real email address.
- Real GitHub and LinkedIn URLs.
- Any additional tech-stack items.
- Any remaining contact details currently shown as placeholders.

---

## 1. Reference Analysis

### Typography

The OpenCode website is monospace-first:

- Declared font stack: `"Berkeley Mono", "IBM Plex Mono", ui-monospace, ...`.
- Berkeley Mono is a commercial font and is not the font actually served by the site.
- The site self-hosts IBM Plex Mono as its practical webfont.
- Observed IBM Plex Mono weights: 400-450 (Regular/Text), 500 (Medium), 600 (SemiBold), and 700 (Bold).
- Its sans font is the same monospace stack: `--font-sans: var(--font-mono)`.
- Body line-height is approximately `1.5`.
- Observed type sizes include `13px`, `14px`, `15px`, `16px`, `22px`, and `38px`.
- The main page `h1` is `38px` on desktop and `22px` at narrow widths, weight `700`.
- Headings use `text-wrap: balance`.
- The visual identity comes from mono spacing, strong weight contrast, and restrained hierarchy rather than decorative fonts.

### Visual language

Verified characteristics from the reference CSS:

- Mostly flat surfaces.
- Thin `1px` borders with muted border colors.
- Small radii of approximately `3px`, `5px`, and `8px`.
- Compact spacing system with generous vertical section whitespace.
- Centered content, with key blocks capped around `60rem`.
- Short transitions, around `0.2s ease`.
- Accent blue: `#007aff`.
- Light background: near-white `hsl(0, 20%, 99%)`.
- Dark background: near-black `hsl(0, 9%, 7%)` / `#0c0c0e`.
- A subtle pale-yellow interactive highlight is used in light mode.
- Technical markers such as `[*]`, `Fig 1.`, and numbered labels contribute to the identity.

### Adaptation

Keep:

- Monospace-first typography.
- Flat, border-driven layout.
- Compact navigation and controls.
- Numbered section labels.
- Generous whitespace and precise alignment.

Avoid:

- Generic portfolio templates.
- Large rounded cards.
- Gradients.
- Glassmorphism.
- Heavy shadows.
- Excessive animation.
- Unnecessary decoration.

---

## 2. Typography Plan

### Font choice

Use IBM Plex Mono through `next/font/google`.

Reasons:

- It is the webfont actually served by OpenCode.
- It matches the reference aesthetic.
- It is open source under the SIL Open Font License.
- It avoids the commercial licensing requirement of Berkeley Mono.

Font configuration:

- Weights: `400`, `500`, `600`, `700`.
- Subset: `latin`.
- Variable: `--font-ibm-plex-mono`.
- Display strategy: `swap`.

Fallback stack:

```text
var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, Menlo, Monaco,
Consolas, "Liberation Mono", "Courier New", monospace
```

If the build environment cannot download Google Fonts, self-host IBM Plex Mono under `app/fonts/` using `next/font/local`.

### Type scale

| Role | Size | Weight | Notes |
| --- | --- | --- | --- |
| Hero name | `clamp(2rem, 6vw, 3.25rem)` | 600-700 | Tight line-height, balanced wrapping |
| Section heading | `clamp(1.25rem, 2vw, 1.375rem)` | 600 | Numbered label included |
| Body copy | `15-16px` | 400 | Line-height `1.6-1.7` |
| Project title | `16-18px` | 600 | |
| Navigation | `13px` | 400-500 | Compact |
| Metadata | `12-13px` | 400 | Muted |
| Section index | `12-13px` | 400 | Muted, e.g. `01 /` |
| Hero eyebrow | `12-13px` | 500 | Uppercase, slight letter-spacing |

---

## 3. Color Palettes

### Light mode (default)

| Token | Value | Usage |
| --- | --- | --- |
| `--color-bg` | `#fdfdfc` | Page background |
| `--color-surface` | `#f5f5f7` | Subtle panels and rows |
| `--color-surface-hover` | `#efeeec` | Hover states |
| `--color-text` | `#1d1d1f` | Primary text |
| `--color-text-strong` | `#1f1d1d` | Headings |
| `--color-text-secondary` | `#424245` | Secondary copy |
| `--color-text-muted` | `#6e6e73` | Metadata and captions |
| `--color-border` | `#d2d2d7` | Standard borders |
| `--color-border-soft` | `rgba(0, 0, 0, 0.08)` | Subtle dividers |
| `--color-accent` | `#007aff` | Links and focus rings |
| `--color-accent-hover` | `#0056b3` | Link hover |
| `--color-highlight` | `#f4f2c8` | Restrained highlight |
| `--color-button-bg` | `#1d1d1f` | Primary button |
| `--color-button-text` | `#fdfdfc` | Primary button text |

### Dark mode

| Token | Value | Usage |
| --- | --- | --- |
| `--color-bg` | `#0c0c0e` | Page background |
| `--color-surface` | `#161618` | Subtle panels |
| `--color-surface-hover` | `#1c1c1f` | Hover states |
| `--color-text` | `#f2f1f0` | Primary text |
| `--color-text-strong` | `#ffffff` | Headings |
| `--color-text-secondary` | `#c7c7cc` | Secondary copy |
| `--color-text-muted` | `#a1a1a6` | Metadata and captions |
| `--color-border` | `#38383a` | Standard borders |
| `--color-border-soft` | `rgba(255, 255, 255, 0.10)` | Subtle dividers |
| `--color-accent` | `#4da3ff` | Links and focus rings |
| `--color-accent-hover` | `#7ab8ff` | Link hover |
| `--color-highlight` | `#2a2a1f` | Restrained highlight |
| `--color-button-bg` | `#f2f1f0` | Primary button |
| `--color-button-text` | `#0c0c0e` | Primary button text |

Both palettes will be checked for WCAG AA contrast on body text, muted text, links, and focus indicators.

---

## 4. Page Layout

```text
Root layout
├── Theme initialization script
├── Skip link
├── Header
│   ├── Wordmark / name
│   ├── Desktop navigation
│   ├── Mobile navigation
│   └── Theme toggle
├── Main
│   ├── Hero
│   │   ├── Hero content
│   │   └── Profile portrait
│   ├── About
│   ├── Tech Stack
│   ├── Projects
│   ├── Experience
│   └── Contact
└── Footer
```

### Navigation behavior

Navigation must work from any route, including `/playground`.

- The wordmark links to `/`.
- Portfolio anchors use route-safe URLs: `/#about`, `/#stack`, `/#projects`, `/#experience`, and `/#contact`.
- Add a `Playground` link to `/playground` in both desktop and mobile navigation.
- Use `next/link` for route links and cross-route hashes. Same-page controls may keep plain anchors when appropriate.
- When already on the homepage, clicking a route-safe hash must still scroll to the section without a full page reload.
- Close the mobile menu after a link is activated.
- Use `usePathname()` to mark the Playground link with `aria-current="page"` when active.
- The Header must not render `aria-current` on portfolio anchors while on `/playground`.
- The shared Footer "Back to top" link should target `#main` so it returns to the top of the current route.
- Preserve the skip link and make sure `#main` remains the primary content landmark on both routes.

### Hero

Desktop uses a two-column layout: content on the left and profile portrait on the right.

Left column:

- Technical eyebrow: `// software engineer`, sourced from `site.eyebrow`
- Name: `Jonathan Jinayon`, sourced from `site.name`
- Professional title: `Software Engineer`, sourced from `site.title`
- Introduction: the current portfolio introduction from `site.intro`
- Focus areas as compact tags: Java, Spring Boot, REST APIs, React, TypeScript, sourced from `site.focusAreas`
- Primary CTA: "View projects"
- Secondary CTA: "Get in touch"
- Compact metadata panel:
  - Location: `Metro Cebu, Philippines`, sourced from `site.location`
  - Focus: `Java, Spring Boot, and System Design`, sourced from `site.focus`
  - Availability: `Building and learning`, sourced from `site.availability`

Right column:

- Profile portrait sourced from `/profile.jpg`
- Displayed with `next/image` at a restrained `4:5` crop
- Maximum width around `18rem`
- Thin `1px` border using `var(--color-border)`
- Small `5px` radius using `var(--radius-md)`
- Subtle `var(--color-surface)` background while loading
- No circle crop, gradient, overlay, filter, or heavy shadow
- Muted caption below the portrait: `Fig. 1 / Jonathan Jinayon`

Desktop grid:

- Columns: `minmax(0, 1fr) 18rem`
- Gap: `clamp(2.5rem, 6vw, 5rem)`
- Vertically center the portrait against the content column

Mobile layout:

- Stack vertically into one column.
- Show the eyebrow, name, title, introduction, focus areas, and CTAs first.
- Place the portrait after the CTAs, centered with a maximum width around `16rem`.
- Preserve the section spacing and keep both columns visually balanced.

### Profile Picture Requirements

- Use the theme-matched portrait at `public/profile.jpg`, derived from `public/profilepic.png`.
- Import `Image` from `next/image`; do not use a raw `<img>` element.
- Use `fill` inside a positioned wrapper with `aspect-ratio: 4 / 5` and `object-fit: cover`.
- Set `alt="Portrait of Jonathan Jinayon"`.
- Set `sizes="(max-width: 768px) 70vw, 288px"`.
- Use `loading="eager"` and `fetchPriority="high"` because the portrait is above the fold.
- Do not use the deprecated `priority` prop. Next.js 16 deprecated it in favor of `preload` and, in most cases, `loading="eager"` or `fetchPriority="high"`.
- Omit `width` and `height` when using `fill`, and preserve the wrapper aspect ratio to prevent layout shift.
- Keep the image visually unchanged between light and dark modes.
- Do not substitute a different stock or generated image without approval.

### About Me

- Section label: `01 / About`
- Two-column layout on desktop:
  - Left: the current background and interests prose from `aboutParagraphs`
  - Right: the current compact facts list from `facts`
- Collapses to one column on tablet and mobile.
- Content remains editable only in `lib/content.ts`; the playground must reuse the same source.

### Tech Stack

- Section label: `02 / Stack`
- Grouped technical rows from `techGroups`:
  - Backend: Java, Spring Boot, REST APIs
  - Frontend: React, TypeScript
  - Database: MySQL
  - Additional: placeholder skills that must be completed before launch
- Rendered as compact bordered tags, not large cards.

### Projects

- Section label: `03 / Projects`
- Vertical list of bordered project entries.
- Each entry includes:
  - Placeholder project name
  - Placeholder description
  - Technology tags
  - Optional GitHub link
  - Optional live demo link
- Missing links render as muted "Link coming soon" text rather than fake URLs.
- No invented projects or achievements.

### Experience

- Section label: `04 / Experience`
- Timeline-style list populated from `experience`:
  - Software Engineer at Optum, 2026 – Present
  - Full Stack Bootcamp at Accenture, Oct 2025 – Jan 2026
  - BS Computer Science at BISU Candijay, 2025
  - OJT Intern at LGU Anda & Candijay, 2024
  - Hello World, Personal Learning, 2021
- No invented employers, dates, or achievements.

### Contact

- Section label: `05 / Contact`
- Current contact introduction from `contactIntro`
- Placeholder email; do not present the placeholder `mailto:` address as a working contact path
- Placeholder GitHub profile
- Placeholder LinkedIn profile
- Placeholder contact location; the Hero uses the separate populated `site.location`
- Primary email CTA only when a real email URL exists
- All links keyboard accessible and visibly focusable.
- Missing URLs render as muted placeholder text rather than fake links.

### Footer

- Current copyright line: `© Jonathan Jinayon`
- "Next.js / TypeScript / Light and dark"
- Back-to-top link targeting `#main`
- Theme note

### Playground route

- `/playground` uses the shared root layout, skip link, Header, and Footer.
- Page intro uses the section label `06 / Playground` and the title "Jonathan's Developer World."
- Include one short instruction line explaining that destinations can be opened by clicking, keyboard activation, or the command bar.
- Desktop layout: two columns with the square world map on the left and the command/panel column on the right.
- Mobile layout: one column with the command bar and map first, followed by controls and the information panel.
- Keep the route inside the shared `--content-width`; do not create a fullscreen layout or horizontal scrolling.
- Use static route metadata with the title `Playground — Jonathan Jinayon` and a concise description.
- The page is a server component that renders a client-side `Playground` orchestrator.
- The route is static and client-interactive; do not add `dynamic`, `revalidate`, `fetchCache`, or `runtime` exports.
- The playground is an exploration layer for the portfolio, not a replacement for the homepage.

---

## 5. Component Hierarchy

### Layout components

- `Header`
  - Wordmark
  - Desktop navigation
  - Mobile navigation
  - `ThemeToggle`
- `Footer`

### Section components

- `Hero`
  - Hero content: eyebrow, name, title, introduction, focus areas, CTAs, metadata
  - Hero portrait: `next/image` profile image and `Fig. 1` caption
- `About`
- `TechStack`
- `Projects`
- `Experience`
- `Contact`

### Reusable UI components

- `Container`: centered max-width wrapper.
- `Section`: section wrapper with index, heading, and optional description.
- `Button`: primary and secondary link button variants.
- `Tag`: compact technology label.
- `ProjectItem`: project row.
- `ExperienceItem`: experience row.
- `ThemeToggle`: accessible light/dark switch.

### Playground components

- `Playground`: client-side orchestrator for movement, panel state, commands, and announcements.
- `WorldMap`: square map surface, walkable grid, destination markers, and character.
- `WorldCharacter`: decorative character positioned in world coordinates.
- `DestinationMarker`: focusable button for each destination.
- `CommandBar`: labelled text input and submit control for local commands.
- `InfoPanel`: destination content, close control, and placeholder handling.
- `PlaygroundControls`: reset, close, and help actions for pointer and touch users.
- `Playground.module.css` and focused CSS Modules for each visual region.

### Content model

All editable portfolio content lives in `lib/content.ts`:

- Name and title
- Hero copy, focus areas, and metadata
- Profile image source, alt text, and caption
- About paragraphs and facts
- Tech stack groups
- Projects
- Experience entries
- Contact and social links
- Navigation links

The Hero and homepage sections currently consume `site`, `aboutParagraphs`, `facts`, `techGroups`, `projects`, `experience`, `contactIntro`, `email`, and `socialLinks` from this module. Unresolved values remain explicit placeholders.

Playground geometry, destination definitions, movement constants, and command aliases live under `lib/playground/`. That data references portfolio content by destination ID; it must not duplicate prose from `lib/content.ts`.

Portfolio content types live in `types/content.ts`:

- `SiteContent`
- `ProfileImage`
- `Project`
- `ExperienceEntry`
- `SocialLink`
- `TechGroup`
- `NavLink`
- `Fact`

Playground types live in `types/playground.ts`:

- `DestinationId`
- `Point`
- `WorldRect`
- `Destination`
- `CommandResult`

---

## 6. Folder Structure

```text
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── not-found.tsx
├── playground/
│   ├── page.tsx
│   └── page.module.css
└── fonts/                       # only if self-hosting becomes necessary
components/
├── layout/
│   ├── Header.tsx
│   ├── Header.module.css
│   ├── Footer.tsx
│   └── Footer.module.css
├── theme/
│   ├── ThemeToggle.tsx
│   └── ThemeToggle.module.css
├── sections/
│   ├── Hero.tsx
│   ├── Hero.module.css
│   ├── About.tsx
│   ├── About.module.css
│   ├── TechStack.tsx
│   ├── TechStack.module.css
│   ├── Projects.tsx
│   ├── Projects.module.css
│   ├── Experience.tsx
│   ├── Experience.module.css
│   ├── Contact.tsx
│   └── Contact.module.css
├── playground/
│   ├── Playground.tsx
│   ├── Playground.module.css
│   ├── WorldMap.tsx
│   ├── WorldMap.module.css
│   ├── WorldCharacter.tsx
│   ├── DestinationMarker.tsx
│   ├── CommandBar.tsx
│   ├── CommandBar.module.css
│   ├── InfoPanel.tsx
│   ├── InfoPanel.module.css
│   ├── PlaygroundControls.tsx
│   └── PlaygroundControls.module.css
└── ui/
    ├── Container.tsx
    ├── Container.module.css
    ├── Section.tsx
    ├── Section.module.css
    ├── Button.tsx
    ├── Button.module.css
    ├── Tag.tsx
    ├── Tag.module.css
    ├── ProjectItem.tsx
    ├── ProjectItem.module.css
    ├── ExperienceItem.tsx
    └── ExperienceItem.module.css
lib/
├── content.ts
├── theme.ts
└── playground/
    ├── world.ts
    ├── pathfinding.ts
    ├── movement.ts
    └── commands.ts
types/
├── content.ts
└── playground.ts
public/
├── profile.jpg
└── profilepic.png
```

`app/globals.css` will contain only:

- CSS reset and normalization.
- Light and dark theme tokens.
- Base typography.
- Shared focus styles.
- Selection styles.
- Reduced-motion handling.

Component-specific styles will use CSS Modules.

---

## 7. Theme Implementation

### Default

Light mode is the default when no saved preference exists.

### Persistence

- Storage key: `portfolio-theme`.
- Allowed values: `"light"` and `"dark"`.
- The selected value is written to `localStorage`.

### Preventing theme flash

A blocking inline script runs in `<head>` before the page body is painted:

```ts
(function () {
  try {
    var saved = localStorage.getItem("portfolio-theme");
    var theme = saved === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  }
})();
```

The `<html>` element will use `suppressHydrationWarning` because the script intentionally changes its attributes before hydration.

### Toggle behavior

`ThemeToggle` will be a client component that:

- Reads the current value from `document.documentElement.dataset.theme`.
- Toggles between light and dark.
- Updates the `data-theme` attribute.
- Updates `document.documentElement.style.colorScheme`.
- Persists the new value to `localStorage`.
- Updates its accessible pressed state.

To avoid hydration mismatches:

- The button uses a stable accessible label such as "Toggle color theme".
- Sun/moon icon visibility is controlled by CSS using `[data-theme]`, not by React-only state.

### Accessibility

- Use a real `<button>` element.
- Support keyboard operation.
- Provide a visible `:focus-visible` ring.
- Use `aria-label` and `aria-pressed`.
- Maintain sufficient contrast in both themes.
- Respect `prefers-reduced-motion`.
- Do not rely on animation for the theme change.

### CSS token structure

```css
:root,
[data-theme="light"] {
  color-scheme: light;
  --color-bg: #fdfdfc;
  /* light tokens */
}

[data-theme="dark"] {
  color-scheme: dark;
  --color-bg: #0c0c0e;
  /* dark tokens */
}
```

No external theme library is required.

---

## 8. Dependencies and Configuration Changes

### Add

None.

The implementation will use:

- Next.js built-in `next/font/google` for IBM Plex Mono.
- Next.js built-in `next/image` for the Hero portrait.
- React.
- Plain CSS and CSS Modules.
- Inline SVG icons.
- Browser DOM APIs, `requestAnimationFrame`, and a local A* pathfinder for the playground.
- No Canvas library, game engine, animation package, icon package, state library, AI SDK, or mapping package.

### Remove

- `tailwindcss`
- `@tailwindcss/turbopack`

### Configuration changes

- Remove the Tailwind CSS loader rule from `next.config.ts`.
- Keep `cacheComponents`, `partialPrefetching`, and `experimental.agentFeedback` unchanged.
- Remove Tailwind imports and `@theme` tokens from `app/globals.css`.
- Remove Geist font imports from `app/layout.tsx`.
- Keep the generated Next.js agent block in `AGENTS.md`.

---

## 9. Implementation Steps

1. **Remove the Tailwind setup**
   - Uninstall Tailwind packages.
   - Remove the Tailwind Turbopack rule.
   - Replace `globals.css` with the plain CSS reset and theme tokens.

2. **Set up fonts and document metadata**
   - Load IBM Plex Mono with `next/font/google`.
   - Apply the font variable in the root layout.
   - Use the current portfolio title and an approved description.
   - Add the theme initialization script and `suppressHydrationWarning`.

3. **Build theme infrastructure**
   - Add shared theme constants.
   - Implement `ThemeToggle`.
   - Add light/dark tokens, focus styles, selection styles, and reduced-motion handling.

4. **Create the content model**
   - Populate `lib/content.ts` with current content and explicit bracket placeholders for missing values.
   - Define TypeScript types for projects, experience, and links.
   - Do not invent personal details or working profile URLs.

5. **Build layout primitives**
   - `Container`, `Section`, `Button`, and `Tag`.
   - Establish max-width, gutters, section spacing, and divider styles.

6. **Build header and footer**
   - Wordmark, route-safe navigation, and theme toggle.
   - Accessible mobile navigation with `aria-expanded` and `aria-controls`.
   - Skip link and focus management.
   - Keep route-safe navigation aligned with the Playground route plan.

7. **Build page sections**
   - Hero.
   - About.
   - Tech Stack.
   - Projects.
   - Experience.
   - Contact.
   - Pull all content from `lib/content.ts`.

8. **Responsive and accessibility pass**
   - Verify desktop, tablet, and mobile layouts.
   - Check keyboard navigation and visible focus.
   - Check contrast in both themes.
   - Confirm theme persistence and no flash on reload.
   - Confirm no links point to fabricated profiles or projects.

9. **Verification**
   - `npm run lint`
   - `npx tsc --noEmit`
   - `npm run build`
   - Manual checks:
     - Light mode is the initial default.
     - Toggle persists after reload.
     - No theme flash on reload.
     - Route-safe navigation works from the homepage and Playground.
     - Mobile menu works with keyboard.
     - Layout holds at narrow and wide viewports.

### Hero Portrait Revision

1. **Confirm the image asset**
   - Verify `public/profile.jpg` contains the approved theme-matched portrait.
   - Do not substitute a different stock or generated image without approval.

2. **Update the content model**
   - Set `site.name` to `"Jonathan Jinayon"`.
   - Add `site.profileImage` with source, alt text, and caption.
   - Add `site.focusAreas` using the confirmed stack.
   - Keep all unprovided personal details as placeholders.

3. **Update the Hero component**
   - Import `Image` from `next/image`.
   - Add the portrait wrapper with a `4:5` aspect ratio.
   - Use `fill`, `sizes`, `loading="eager"`, and `fetchPriority="high"`.
   - Add the `Fig. 1 / Jonathan Jinayon` caption below the portrait.
   - Add the focus-area tags above the CTAs.

4. **Update the Hero styles**
   - Use the two-column desktop grid.
   - Collapse to one column on mobile with content and CTAs before the portrait.
   - Center the portrait on narrow screens with a reduced maximum width.
   - Apply the restrained border, radius, and loading background.
   - Verify there is no layout shift or excessive decoration.

5. **Re-run verification**
   - `npm run lint`
   - `npx tsc --noEmit`
   - `npm run build`
   - Check the portrait and layout at desktop, tablet, and mobile widths.
   - Confirm the image renders correctly in light and dark modes.

### Playground Route

1. **Make navigation route-safe**
   - Change portfolio nav targets to `/#about`, `/#stack`, etc.
   - Add the Playground link and use `next/link` where routing is involved.
   - Update the wordmark and Footer back-to-top behavior.
   - Verify navigation from both `/` and `/playground`.

2. **Add playground types and world data**
   - Define destination geometry, arrival points, and movement constants.
   - Implement the local A* pathfinder and collision checks.
   - Keep all content reads pointed at `lib/content.ts`.

3. **Build the static map**
   - Render the square map, grid, paths, destination markers, and character.
   - Match the existing border, radius, typography, and theme tokens.
   - Ensure markers are real focusable buttons.

4. **Implement movement and interaction**
   - Route pointer and keyboard activation through the same movement command.
   - Animate the character with RAF; use an immediate arrival for reduced motion.
   - Open the destination panel only after arrival.
   - Cancel stale movement when a new destination is selected.

5. **Build the command bar and panel**
   - Add safe local command parsing with help and error responses.
   - Render destination content from the shared content model.
   - Preserve placeholder handling for missing links and skills.
   - Add close, Escape, reset, and focus-return behavior.

6. **Responsive and accessibility pass**
   - Verify the map and panel at 320px, tablet, and desktop widths.
   - Check keyboard order, focus visibility, announcements, and contrast in both themes.
   - Verify reduced-motion behavior and no horizontal overflow.

7. **Verification**
   - `npm run lint`
   - `npx tsc --noEmit`
   - `npm run build`
   - Manually test every destination by pointer, keyboard, and command.
   - Confirm no network requests or fabricated content are introduced by the playground.

---

## 10. Acceptance Criteria

- Next.js App Router and TypeScript are used.
- No Tailwind CSS is used.
- Plain CSS and CSS Modules only.
- Reusable, maintainable React components.
- Light mode is the default.
- A working light/dark toggle exists.
- Theme choice persists across reloads.
- No theme flash on initial load.
- Responsive on desktop, tablet, and mobile.
- Accessible controls and keyboard navigation.
- All sections from the brief are present.
- Hero displays the name Jonathan Jinayon, professional title, introduction, focus areas, and both CTAs.
- Hero uses a two-column desktop layout and stacks content before the portrait on mobile.
- The portrait uses `next/image` with `public/profile.jpg`, descriptive alt text, a stable `4:5` aspect ratio, and responsive `sizes`.
- The portrait uses a restrained border and radius with no excessive decoration.
- Navigation works from both `/` and `/playground` without resolving to `/playground#section`.
- A separate `/playground` route renders inside the shared layout.
- The playground contains five destinations and a visible character.
- Destination activation moves the character to a valid arrival point before opening the matching panel.
- The local command bar supports help, destination navigation, close, and reset without `eval`, shell access, or network calls.
- Playground content comes from `lib/content.ts`; missing values remain explicit placeholders.
- The playground works by pointer, keyboard, and touch, respects reduced motion, and has no horizontal overflow.
- No new runtime dependency, Canvas library, game engine, or remote service is added.
- No invented personal details, projects, achievements, or contact information.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.

---

# Part II — Jonathan's Developer World

## 11. Concept and Goals

`/playground` is an optional interactive layer over the same portfolio. Visitors can move a small character around a developer-themed map and open the five portfolio destinations: About, Skills, Projects, Experience, and Contact.

The experience should feel like an extension of the portfolio's terminal-inspired identity, not a separate game product.

### Goals

- Make portfolio exploration feel intentional and memorable without hiding content behind the interaction.
- Keep the homepage complete and usable on its own.
- Reuse the existing typography, theme tokens, spacing, and content model.
- Support pointer, touch, and keyboard input.
- Keep the implementation deterministic, private, and dependency-free.
- Respect `prefers-reduced-motion`.
- Keep the page lightweight and responsive down to narrow mobile widths.
- Never invent projects, achievements, contact details, or skills.

### Non-goals

- Backend services, accounts, multiplayer, or saved progress.
- An LLM, chat API, remote search, or natural-language service.
- Canvas rendering, WebGL, a game engine, sprite sheets, or audio.
- Free-roaming physics or joystick controls.
- A fullscreen experience that hides site navigation.
- A replacement for conventional portfolio sections.
- New color palettes, gradients, shadows, or decorative illustration assets.

### Design principles

- The map is a navigation surface, not a puzzle.
- Every destination remains reachable without the map.
- Movement is visible but never blocks access to content.
- Placeholder content stays visibly identified as placeholder content.
- The command bar is a convenience, not the only input method.

---

## 12. Route and Page Layout

```text
/playground
└── shared root layout
    ├── Header
    ├── main
    │   ├── page intro
    │   │   ├── 06 / Playground
    │   │   ├── Jonathan's Developer World
    │   │   └── short instruction line
    │   └── Playground (client component)
    │       ├── CommandBar
    │       ├── WorldMap
    │       │   ├── SVG grid, paths, and destination buildings
    │       │   ├── DestinationMarker × 5
    │       │   └── WorldCharacter
    │       ├── status region
    │       ├── InfoPanel
    │       └── PlaygroundControls
    └── Footer
```

### Page responsibilities

- `app/playground/page.tsx` is a server component.
- It exports static metadata with the title `Playground — Jonathan Jinayon` and a concise description.
- It renders the page intro and the client-side `Playground` component.
- It uses the shared `Container` for width and gutters.
- It does not add route segment configuration; the route is static and interactive only in the browser.
- The page uses the existing global theme and requires no additional theme provider.

### Desktop layout

- Command bar spans the content width above the main playground grid.
- The grid has two columns: map on the left and information panel on the right.
- Suggested columns: `minmax(0, 1.4fr) minmax(18rem, 0.8fr)`.
- Gap: `clamp(1.25rem, 3vw, 2rem)`.
- The map keeps a `1 / 1` aspect ratio and scales with its column.
- The panel aligns to the top of the map and has its own border and surface.
- Controls sit below the map and remain reachable by keyboard.

### Mobile layout

- Stack into one column: intro, command bar, map, controls, information panel.
- Keep the map square and full width within the container.
- Avoid fixed heights that clip the map or panel.
- Do not introduce horizontal scrolling at `320px`.
- When a destination opens, scroll the panel into view only after arrival.
- Disable smooth scrolling for that action when reduced motion is requested.

### Command bar placement

- The command bar appears before the map at all widths so it is discoverable without scrolling past the world.
- The label, help text, and status message must be visible, not tooltip-only.
- The command bar must not be the only way to open a destination.

---

## 13. World Map and Destinations

### Coordinate system

The map uses a fixed logical world of `800 × 800` units regardless of rendered size.

- World bounds: `0,0` to `800,800`.
- Safe margin: `24` units.
- Character radius: `24` units.
- Start point: `{ x: 400, y: 460 }`.
- Pathfinding grid: `40 × 40` cells with `20`-unit cells.
- Movement is four-directional to avoid corner clipping.
- The rendered map preserves the logical coordinates through SVG `viewBox="0 0 800 800"` and percentage-based DOM positioning.

### Destinations

| Destination | ID | Building rect `(x, y, width, height)` | Arrival point | Content source |
| --- | --- | --- | --- | --- |
| About | `about` | `100, 100, 200, 130` | `200, 270` | `aboutParagraphs`, `facts` |
| Skills | `skills` | `500, 100, 200, 130` | `600, 270` | `techGroups` |
| Projects | `projects` | `90, 480, 220, 140` | `200, 440` | `projects` |
| Experience | `experience` | `490, 480, 220, 140` | `600, 440` | `experience` |
| Contact | `contact` | `300, 660, 200, 100` | `400, 620` | `contactIntro`, `email`, `socialLinks` |

Each destination defines:

- Stable ID.
- Display label.
- Section index used in the panel heading.
- Building rectangle.
- Arrival point.
- Accessible action label.
- Destination-specific content key.

### Map composition

- SVG is used for the grid pattern, walkable paths, plaza markings, and building outlines.
- HTML elements are overlaid for destination buttons and the character so focus, text, and animation stay accessible.
- The center plaza connects to each arrival pad with visually distinct dashed paths.
- Building blocks use a restrained fill, `1px` borders, small radii, and existing theme tokens.
- Destination labels use compact monospace text and an index marker such as `[*]`.
- Decorative SVG and map furniture use `aria-hidden="true"`.
- No new image assets are required.
- No gradients, glow effects, heavy shadows, or faux-3D perspective.

### Destination interaction

- Each destination is a real `<button>` layered over its building or arrival area.
- The whole practical hit area opens the destination, not only the text label.
- Button text or accessible label follows the pattern `Go to Projects`.
- Focus and hover use the existing focus ring or an equivalent high-contrast border change.
- Clicking a destination:
  1. Sets the active destination.
  2. Routes the character to its arrival point.
  3. Opens the panel after movement completes.
- Clicking an empty walkable area closes any open panel and moves the character to the nearest walkable point.
- Clicking inside a blocked area routes to the nearest walkable point rather than allowing clipping.
- The start plaza is walkable and visually marked.

### Map labels

- Use the same labels as the homepage sections: About, Skills, Projects, Experience, Contact.
- Use `Skills` in the playground even though the homepage section is labeled `Stack`; destination copy should explain that they are the same content.
- Keep labels readable at narrow widths; do not rely on a hover tooltip.
- Do not place essential content only inside the SVG.

---

## 14. Character Movement and Pathfinding

### Movement constants

```ts
const WORLD_SIZE = 800;
const CELL_SIZE = 20;
const GRID_SIZE = WORLD_SIZE / CELL_SIZE;
const CHARACTER_RADIUS = 24;
const SAFE_MARGIN = 24;
const MOVE_SPEED = 220; // world units per second
const START_POINT = { x: 400, y: 460 };
```

These values may be adjusted during implementation, but the logical map and destination rectangles must remain consistent with this plan.

### Collision model

- Inflate every destination rectangle by `CHARACTER_RADIUS`.
- Mark a grid cell blocked when its center falls inside an inflated rectangle.
- Mark cells outside the safe margin blocked.
- Keep the start point and every arrival point walkable.
- Validate arrival points against the inflated rectangles before rendering.
- The character may move close to a building but must not overlap it.
- Do not use diagonal shortcuts through corners.

### Pathfinding

- Implement A* locally in `lib/playground/pathfinding.ts`.
- Use a `40 × 40` occupancy grid.
- Use four-directional neighbors.
- Use Manhattan distance as the heuristic.
- Return an ordered list of cell centers plus the exact final arrival point.
- Snap the requested destination to the nearest walkable cell.
- Reject a route when no path exists.
- Keep pathfinding pure and independent from React.

### Movement behavior

- The character visibly travels along the path; it does not teleport, except for reduced motion.
- Use `requestAnimationFrame` and refs for the animated position.
- Do not trigger a React state update on every animation frame.
- Use the frame delta, clamped to a small maximum, to keep speed stable across refresh rates.
- Update the DOM transform through a ref during movement.
- Commit the final position once when movement completes.
- Increment a movement token for each request; ignore callbacks from stale tokens.
- Cancel the current animation when a new destination is selected or the component unmounts.
- On completion:
  - Set the exact arrival position.
  - Update the active panel.
  - Announce arrival through the status region.
- On failure:
  - Keep the current position.
  - Announce that no path is available.
  - Do not open the destination panel.
- When `prefers-reduced-motion: reduce` matches:
  - Skip the RAF animation.
  - Set the character to the arrival point immediately.
  - Open the panel immediately.
  - Still preserve the same success and failure messages.
- Movement must not block keyboard access to the command bar, panel, or header.
- Do not animate on initial page load.

### Keyboard behavior

- Tab reaches every destination button and the command bar.
- Activating a destination button with Enter or Space uses the same travel flow as a pointer click.
- Do not require arrow-key movement.
- Escape closes the panel or help state.
- Do not trap focus inside the map.

### Status announcements

Use one polite status region for movement and command feedback:

- `Walking to Projects.`
- `Arrived at Projects. Panel updated.`
- `Path unavailable. Choose another destination.`
- Command success and error messages.

Keep the message concise and avoid announcing every animation frame.

---

## 15. Destination Panels and Content

The information panel is a persistent region, not a modal dialog.

- Closed state shows a short instruction and a compact list of available destinations.
- Open state shows the active destination heading, section index, close button, and content.
- The panel has `aria-labelledby` pointing to its heading.
- The panel is reachable by keyboard and does not trap focus.
- The close button is always available.
- Escape closes the panel.
- Closing returns focus to the destination marker that opened it, or to the command input when the panel was opened by command.
- Opening a panel should not steal focus during movement; focus moves to the panel heading after arrival.
- On mobile, the panel scrolls into view after arrival. Use immediate scrolling for reduced motion.
- The map remains available while the panel is open.

### Content mapping

#### About

- Heading: `01 / About`
- Body: `aboutParagraphs`
- Facts: `facts`
- Reuse the current prose hierarchy and fact-list styling where practical.

#### Skills

- Heading: `02 / Skills`
- Body: `techGroups`
- Render groups and tags using the existing compact tag treatment.
- Preserve the placeholder Additional group until real values are supplied.

#### Projects

- Heading: `03 / Projects`
- Body: `projects`
- Reuse `ProjectItem` when its layout can fit the panel.
- Preserve explicit placeholder names and descriptions.
- Missing links render as muted "Link coming soon" text, never fake URLs.

#### Experience

- Heading: `04 / Experience`
- Body: `experience`
- Reuse `ExperienceItem` where practical.
- Preserve the current real entries and do not invent additional history.

#### Contact

- Heading: `05 / Contact`
- Body: `contactIntro`
- Links: `email`, then `socialLinks`
- Render the email CTA only when a real email URL exists.
- Render URLs as links only when an actual URL exists.
- Preserve placeholder values as muted text.
- Do not fabricate a clickable `mailto:` link from the placeholder address.

### Content rules

- Import all portfolio prose from `lib/content.ts`.
- Do not duplicate content in playground data or components.
- Do not add project cards, employers, facts, or links that are not in the content model.
- If a content array is empty, render a neutral `Nothing added yet.` message.
- Keep the panel usable if the content grows beyond the viewport; allow it to expand naturally.

---

## 16. Command Bar

The command bar is a compact, terminal-style form above the map.

```text
> [ open projects________________ ] [Run]
```

- Use a real `<form>` with a visible `Command` label.
- Include a visually hidden description such as `Try: open projects, help, close, or reset.`
- Use a text input with `autocomplete="off"`, `spellCheck={false}`, and a maximum length of `80`.
- Submit with Enter or the Run button.
- Keep the input focus after submission unless the panel intentionally takes focus after arrival.
- Escape closes the panel or help state; it does not clear unrelated input.
- Do not persist commands or command history.

### Supported commands

| Input | Behavior |
| --- | --- |
| `help` or `?` | Show the command help list. |
| `open <destination>` | Travel to the destination and open its panel. |
| `go to <destination>` | Same as `open`. |
| `<destination>` | Treat a bare destination name as `open`. |
| `close` or `dismiss` | Close the active panel. |
| `reset`, `home`, or `plaza` | Close the panel and walk to the start point. |
| Anything else | Show a concise error and the help hint. |

### Destination aliases

- About: `about`, `me`
- Skills: `skills`, `stack`
- Projects: `projects`, `work`
- Experience: `experience`, `career`
- Contact: `contact`, `email`

### Parsing rules

- Trim input, lowercase it, and collapse repeated whitespace.
- Match against a fixed local alias map.
- Implement parsing in `lib/playground/commands.ts` and keep it pure.
- Return a typed `CommandResult`; do not execute UI actions inside the parser.
- Do not use `eval`, `new Function`, dynamic code generation, `innerHTML`, or HTML injection.
- Do not use `fetch`, XHR, WebSocket, or remote APIs.
- Do not read or write storage.
- Render all command output as React text.
- An empty command is a no-op.
- Unknown commands must not throw.

### Help and feedback

- Help lists the accepted command patterns and destination aliases.
- Help can render below the command bar or inside the panel; it must be text-accessible.
- Command errors appear in the status region and visibly in the help area.
- Keep feedback messages short and avoid terminal-output role-play that obscures the result.
- Commands are optional; all actions remain available through visible buttons.

---

## 17. State and Component Architecture

### Types

```ts
export type DestinationId =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "contact";

export interface Point {
  x: number;
  y: number;
}

export interface WorldRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Destination {
  id: DestinationId;
  label: string;
  index: string;
  rect: WorldRect;
  arrival: Point;
}

export type CommandResult =
  | { kind: "none" }
  | { kind: "help" }
  | { kind: "travel"; destinationId: DestinationId }
  | { kind: "reset" }
  | { kind: "close" }
  | { kind: "error"; message: string };
```

### Component responsibilities

- `Playground`
  - Owns active panel, help state, walking state, announcements, and movement orchestration.
  - Stores animation state and current position in refs.
  - Wires destination buttons, command results, reset, and close.
  - Cleans up RAF and timers on unmount.
- `CommandBar`
  - Owns only the input value and form submission.
  - Calls `onCommand(text)` without parsing the action itself.
- `WorldMap`
  - Renders the SVG world, walkable surface, markers, and character.
  - Receives destination buttons and character position.
  - Handles empty-map pointer selection.
- `WorldCharacter`
  - Renders the decorative character.
  - Receives a ref or transform target from the orchestrator.
- `DestinationMarker`
  - Renders an accessible button for one destination.
  - Exposes active, walking, and focus styling.
- `InfoPanel`
  - Renders closed and open states.
  - Maps destination IDs to portfolio content.
  - Handles optional close action and heading focus target.
- `PlaygroundControls`
  - Offers reset, close, and help actions.
  - Never duplicates state owned by `Playground`.

### Pure modules

- `lib/playground/world.ts`
  - World constants, destination definitions, alias metadata, destination lookup.
- `lib/playground/pathfinding.ts`
  - Grid creation, collision inflation, A* search, nearest-walkable lookup.
- `lib/playground/movement.ts`
  - Path-following interpolation helpers and cancellation token helpers.
- `lib/playground/commands.ts`
  - Input normalization and fixed command matching.

### State rules

- The source of truth for portfolio content stays `lib/content.ts`.
- The source of truth for geometry stays `lib/playground/world.ts`.
- Character position during motion is imperative ref state, not React state.
- React state is limited to user-visible mode changes and settled results.
- Do not use a global store, context provider, or new state library.
- Do not introduce random start positions or nondeterministic content.
- Do not read viewport size in render; CSS handles scaling.

---

## 18. Styling, Responsive Behavior, and Accessibility

### Visual styling

- Use only tokens from `app/globals.css`; do not add a playground-specific color palette.
- Map surface: `--color-surface` or `--color-bg`.
- Borders: `1px solid var(--color-border)`.
- Grid and paths: `--color-border-soft` and `--color-border`.
- Active destination: `--color-accent` plus a visible border or marker change.
- Character: simple CSS/SVG shape using `--color-accent` and `--color-bg`.
- Focus controls: existing `:focus-visible` ring.
- Radii: `--radius-sm`, `--radius-md`, or `--radius-lg`.
- No gradients, glow, glassmorphism, skeuomorphism, or heavy shadows.
- No external map, icon, or game asset.
- Keep transitions short and limited to hover, focus, and panel state.

### Responsive rules

- Map maintains a square aspect ratio at all widths.
- Desktop breakpoint: approximately `56rem`; below it, stack the panel under the map.
- The command bar and input must shrink without overflowing.
- Destination labels remain readable at `320px`; the entire building area is the hit target.
- Buttons and markers must meet a minimum practical touch target of `44 × 44` CSS pixels where layout allows.
- The panel must not be given a fixed height that hides content.
- No horizontal overflow at any tested width.
- Test at `320px`, `375px`, `768px`, `1024px`, and `1440px`.

### Accessibility rules

- The map grid, paths, and character are decorative and hidden from assistive technology.
- Destination markers are buttons with explicit accessible names.
- The status region uses `role="status"` and polite live updates.
- The panel is a labelled region, not a modal, and never traps focus.
- Provide a visible close control and support Escape.
- Preserve visible focus in both themes.
- Do not use color alone to communicate active, walking, or blocked states.
- The command bar has a real label and an associated hint.
- Command errors are readable text, not sound or color-only feedback.
- Respect reduced motion for movement, panel scrolling, and transitions.
- Verify contrast for text, borders, focus rings, and active markers in light and dark themes.
- Keyboard users must be able to reach and activate all five destinations without using the command bar.
- The existing skip link must continue to target `#main`.

---

## 19. Implementation Phases

### Phase 1 — Navigation and route shell

- Add `/playground` route metadata and page shell.
- Make Header and Footer navigation route-safe.
- Add Playground to desktop and mobile navigation.
- Verify all links from `/` and `/playground`.

Exit condition: the route loads inside the shared layout and no navigation target resolves to the wrong route.

### Phase 2 — Types, world data, and pathfinding

- Add `types/playground.ts`.
- Add destination geometry and movement constants.
- Implement collision inflation and A*.
- Validate start and arrival points.
- Verify unreachable routes fail safely.

Exit condition: every destination has a valid route from the start, and building collisions are respected.

### Phase 3 — Static world rendering

- Build `WorldMap`, `WorldCharacter`, and `DestinationMarker`.
- Render grid, paths, buildings, labels, and start pad.
- Match the existing design system.
- Add responsive scaling.

Exit condition: the static map is visually complete, keyboard focusable, and readable in both themes.

### Phase 4 — Movement and destination opening

- Implement click, touch, and keyboard travel.
- Animate along the A* path with RAF.
- Add reduced-motion immediate arrival.
- Cancel stale movement.
- Open the panel only after arrival.

Exit condition: every destination opens the correct panel after a visible, collision-safe route.

### Phase 5 — Content panel and command bar

- Build destination content rendering.
- Reuse existing portfolio item components where practical.
- Implement local command parsing, aliases, help, close, and reset.
- Preserve all placeholders and missing-link handling.

Exit condition: pointer, keyboard, and command inputs reach equivalent content without unsafe behavior.

### Phase 6 — Accessibility and responsive polish

- Add status announcements, focus return, Escape handling, and mobile panel scrolling.
- Check touch target sizes and keyboard order.
- Verify reduced motion and both themes.
- Remove any horizontal overflow or clipped labels.

Exit condition: the playground is usable at all target widths and with keyboard-only and reduced-motion settings.

### Phase 7 — Verification

- Run `npm run lint`.
- Run `npx tsc --noEmit`.
- Run `npm run build`.
- Test all destinations by pointer, touch, keyboard, and command.
- Confirm no new package dependency, network request, or fabricated content was added.

Exit condition: all acceptance criteria below pass.

---

## 20. Acceptance Criteria and Verification

### Functional acceptance

- `/playground` exists and uses the shared Header, skip link, main landmark, and Footer.
- The route title and description are defined.
- Header navigation works from both `/` and `/playground`.
- The Playground link works on desktop and mobile.
- The page renders exactly five destinations: About, Skills, Projects, Experience, and Contact.
- The character starts at the defined plaza point.
- Activating a destination moves the character along a valid path.
- The character never overlaps a building rectangle.
- The panel opens for the correct destination after arrival.
- Clicking empty walkable space does not open a destination.
- Clicking a blocked point routes to the nearest walkable point.
- The command bar supports `help`, `open <destination>`, `go to <destination>`, bare destination names, `close`, and `reset`.
- Unknown commands produce a visible, non-throwing error response.
- No command uses `eval`, dynamic code generation, remote APIs, or storage.
- Closing the panel and pressing Escape behave consistently.
- Reset returns the character to the start point and closes the panel.

### Content acceptance

- All destination content comes from `lib/content.ts`.
- Projects remain explicit placeholders until real entries are supplied.
- The Additional skills group remains visibly placeholder content.
- Email, GitHub, LinkedIn, and contact-location placeholders are not presented as working links.
- No new biographical details, achievements, employers, or projects are invented.
- The panel handles missing optional links without rendering broken anchors.

### Accessibility acceptance

- Every destination is reachable and activatable by keyboard.
- The command bar has a programmatic label and help text.
- Focus is visible in both themes.
- Arrival and command results are announced in a polite status region.
- The panel has an accessible heading and close control.
- Focus does not become trapped.
- Reduced motion skips the visible walk and still opens the correct panel.
- The mobile panel scrolls into view without smooth motion when reduced motion is requested.
- Text, borders, focus indicators, and active markers meet contrast expectations in both themes.

### Responsive acceptance

- No horizontal scrolling at `320px`, `375px`, `768px`, `1024px`, or `1440px`.
- The map remains square and usable at every target width.
- The command bar and controls do not overflow.
- Destination labels remain readable or are supplemented by accessible names.
- The panel expands naturally and does not hide its content.

### Technical acceptance

- No Tailwind or CSS-in-JS is introduced.
- No new runtime dependency is added.
- No Canvas, WebGL, game engine, or external map service is used.
- No route segment configs are added.
- CSS Modules and existing design tokens are used.
- The character animation uses RAF and avoids per-frame React renders.
- The pathfinder is local, deterministic, and typed.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.

### Manual verification checklist

1. Load `/`, open Playground, and confirm the route and metadata.
2. Use the mobile menu to move between Playground and each homepage section.
3. Activate all five markers with pointer input and confirm correct panels.
4. Repeat all destinations using keyboard-only navigation.
5. Run `help`, each destination alias, `close`, and `reset` from the command bar.
6. Submit an unknown command and confirm the error is visible and safe.
7. Confirm the character does not clip buildings or leave world bounds.
8. Select a new destination mid-walk and confirm the old animation cancels.
9. Enable reduced motion and confirm immediate arrival with the correct panel.
10. Check both themes, all target widths, and visible focus states.
11. Confirm missing links remain placeholders and never become fake URLs.
12. Confirm no playground-originated network requests occur.
