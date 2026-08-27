# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing/informational site for **Corpo Bandistico di Castelcovati APS**, an
Italian community band and music school (non-profit / "terzo settore"). It started
from the open-source **Odyssey Theme** by Tree Farm Studio (hence `package.json`
name `odyssey-theme`, the barrel export `@components/odyssey-theme`, and leftover
`--theme-*` design tokens) and has been customized. Site content and copy are in
Italian.

## Commands

```bash
npm install        # install (npm, not pnpm — package-lock.json is committed)
npm run dev        # local dev server (astro dev), also `npm start`
npm run build      # static build -> dist/
npm run preview    # serve the built dist/
npm run format     # prettier -w . (tabs, single quotes, semicolons, prettier-plugin-astro)
```

The build needs `.env` (copy `.env.example`, fill in the WindDoc tokens) or it
fails fast — see the WindDoc section below.

There are no tests, no linter, and (currently) no CI. The previous deploy
workflows (GitHub Pages, Netlify, Deno Deploy) were removed; `npm run build`
produces a plain static `dist/` to host anywhere.

### Deploy (Vercel, static — no adapter, no `vercel.json`)

Build-time environment variables, all read during `astro build`:

| Variable | Required | Effect |
| --- | --- | --- |
| `WINDDOC_TOKEN_APP` | yes | build throws without it |
| `WINDDOC_TOKEN_KEY` | yes | build throws without it |
| `SITE_URL` | no | overrides the public domain |
| `SITE_INDEXABLE` | no | `"true"` allows search engines |

`site` resolves as `SITE_URL` → `https://$VERCEL_PROJECT_PRODUCTION_URL` →
`https://example.com`. The *production* domain is used even on preview builds so
previews don't declare themselves canonical. There is no `url` in `settings.js`
any more — the domain lives in one place.

`SITE_INDEXABLE` defaults to off: `src/pages/robots.txt.ts` emits `Disallow: /`
and `BaseHead.astro` adds `<meta name="robots" content="noindex, nofollow">` on
every page. Set it to `"true"` only once the placeholders are gone and the
contact form actually delivers. Both files read it as a **string** via
`import.meta.env.SITE_INDEXABLE === 'true'` — Astro exposes it without any
config. **Do not add a `vite.define` for `import.meta.env.*`**: Vite owns that
object and the define silently wins, which broke this flag once already.

## Architecture

**Stack:** Astro 6 (static output), Tailwind CSS 4 via `@tailwindcss/vite`,
daisyUI 5, Lit for web components (`@astrojs/lit`), MDX, `astro-icon` (Iconify
`ic` + `mdi` sets), `@astrojs/sitemap`.

**Layout nesting:** `Base.astro` (html shell, `<BaseHead>`, named slots for
announcement-bar / header / footer) → `Page.astro` (wires in `Header` with
`config/nav.js`, `Footer` with `config/footer.js`, the Logo, and the "Area soci"
button) → `Post.astro` (blog-post chrome: tags, title, featured image). Almost
every page imports `layouts/Page.astro`.

**Shared components** are re-exported from `src/components/odyssey-theme.js` and
imported as `import { Button, Container, ... } from '@components/odyssey-theme'`.
Page-specific / newer components (`BandaChart.astro`, `Logo.astro`,
`VerticalTimeline/`, the `sections/heros/*` variants, `RotatingCustomerQuotes`)
are imported by direct relative path instead.

**Path aliases** (`tsconfig.json`, `baseUrl: src`): `@components/*`, `@layouts/*`,
`@config` (→ `config/*`), `@lib/*`, `@utils/*`, `@icons/*`, `@styles/*`,
`@assets/*`, `@pages/*`.

**Site configuration** lives in `src/config/`: `settings.js`, `nav.js` (header
nav), `footer.js` (footer link lists + socials), `corsi.js` (music-school
courses), `suoni.js` (instrument audio). Edit these rather than hardcoding into
pages — several of them are consumed from more than one place.

`settings.js` also holds the organisation's official details — `codiceFiscale`
(which for this APS doubles as the VAT number, hence the
`codiceFiscaleAnchePartitaIva` flag that switches the label), `sedeLegale`,
`pec`, `email`, `runts`. They are read by the footer (every page), by
`/company/legal`, `/company/contact` and `/5-per-mille`. **Never re-type any of
them into a page**: a wrong codice fiscale on the 5-per-mille page sends
someone's contribution to a different organisation. Fields left empty render as
a declared "— da inserire" placeholder rather than disappearing; `runts` is
still empty.

**Styling / theming:** the single CSS entrypoint is `src/styles/index.css`, which
`@import`s `reset.css`, `theme.css`, `typography.css`, `global.css` and is pulled
in once by `BaseHead.astro`. Everything is driven by CSS custom properties
defined on `:root` in `theme.css` — component `<style>` blocks must reference the
tokens rather than hardcode values. The multi-theme `data-theme` switcher is
disabled and its palettes are commented out in `theme.css`.

The design direction is "programma di sala": warm paper base, the band's historic
forest green as the primary, and brass (`--theme-accent`) used only in micro-doses
— the active-nav rule, the quote mark, section rules, required-field asterisks.
Do not introduce a second accent colour.

Token groups in `theme.css`, all of which have a scale — don't invent one-off
values: `--paper-*`/`--ink-*`/`--green-*` (raw palette), the `--theme-*` semantic
aliases (historic names, other components depend on them, don't rename),
`--radius-xs…xl` (containers softer, inner elements tighter),
`--theme-elevation-1…3` (green-tinted shadows, light always from above),
`--space-3xs…2xl`, `--z-base…modal` (never a literal z-index), and
`--ease-out`/`--ease-spring`.

Type is two variable fonts subset to latin and self-hosted in
`public/assets/fonts/`: **Fraunces** for display (`--theme-font-family-serif`,
one file covers 400–700 plus the optical-size axis) and **Geist** for body text
(`--theme-font-family-sans`). `typography.css` sets a fluid scale, tracking
tokens, and caps `p`/`li` at `--measure` (65ch) — components that need full-width
text override with `max-width: none`. The old Lato / Roboto Serif files are still
in `public/assets/fonts/` but nothing references them.

**Pages** (`src/pages/`, file-based routing): `/` (home), `/blog` +
`/blog/eventi/[id]` (events), `/company/{about,legal,contact}`, `/scuola` +
`/scuola/corsi`, `/area_soci` (links out to the WindDoc member portal),
`/trasparenza`, `404`.

### WindDoc integration (the blog / events data source)

There is **no content collection**. Blog/event content is fetched at build time
from the WindDoc JSON API. `src/lib/winddoc.ts` holds the endpoint
(`WINDDOC_URL`), the two auth tokens, and `toFormUrlEncoded()` (WindDoc expects
`application/x-www-form-urlencoded` bodies containing a nested `request` object,
not JSON).

- `src/pages/blog/index.astro` — frontmatter `fetch`es `associazioni_eventi_lista`,
  splits into upcoming / past events, renders cards.
- `src/pages/blog/eventi/[id].astro` — `getStaticPaths()` calls the same list
  method to enumerate event IDs, then frontmatter fetches
  `associazioni_eventi_dettaglio` per page. Event descriptions are injected with
  `set:html`.

Because these run at build time, **new events only appear after a rebuild**, and
a WindDoc outage will fail the build (the list calls `throw` on non-200).

`TOKEN_APP` / `TOKEN_KEY` are read from `WINDDOC_TOKEN_APP` /
`WINDDOC_TOKEN_KEY` in `.env` (gitignored; template in `.env.example`) and throw
at build time if missing. They are only touched in page frontmatter, so they stay
build-side and never reach the browser bundle — do **not** rename them with a
`PUBLIC_` prefix, which would expose them to the client. In CI, set them as build
secrets.

Note: earlier commits contain these tokens hardcoded, so they remain in git
history and should be rotated in WindDoc.

## Conventions

- Prettier is the only formatter; run `npm run format` before committing. Config:
  tabs, single quotes, semicolons, `arrowParens: avoid`.
- Commit messages in this repo are short and in Italian.
- `.astro/` is generated but partly tracked; changes there are usually noise.

## Known issues

- Four images under `public/assets/images/` are unreadable to any process here
  (macOS `com.apple.macl`, which `xattr -d` cannot remove from a sandboxed
  process): `hero-event-list.jpeg`, `hero-school-1.jpeg`, `hero-school-2.jpeg`,
  `hero-trasp.jpeg`. Consequences:
  - `npm run build` fails: `EPERM ... copyfile ... hero-event-list.jpeg`.
  - **`npm run dev` crashes the whole process** the first time a page requests
    one of them (unhandled ReadStream `error` event) — `/scuola`, `/scuola/corsi`
    and `/blog` all trip it. This is the bigger symptom: the server dies, it
    doesn't just 404.

  The user must clear the attribute from their own terminal, where the grant
  differs: `xattr -c public/assets/images/*.jpeg`. CI is unaffected (fresh clone).
  To verify a build without touching those files, build with `publicDir` pointed
  at an empty directory via a throwaway config.
