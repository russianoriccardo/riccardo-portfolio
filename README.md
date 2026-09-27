# riccardo-portfolio

Portfolio site for Riccardo Russiano, built with Next.js (App Router) and plain CSS. It reproduces the Framer site at riccardorussiano.com, including its URLs (`/`, `/venato`, `/social-bonding`, `/greenmatch`).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # type check + check:explanations
```

## Structure

- `content/site.ts`: all copy, links, testimonials and the case studies. Edit this file to change content.
- `app/page.tsx`: home page (hero, companies strip, featured projects, testimonials, contact)
- `app/[slug]/page.tsx`: case study page, generated for each project in `content/site.ts`
- `app/api/explain/route.ts`: answers "Explain this" for highlighted text (see below)
- `components/`: header with mobile menu, project card, before/after slider, "Let's connect" box, footer
- `app/globals.css`: all styles. Breakpoints match Framer's: desktop ≥ 1200px, tablet 810–1199px, phone < 810px.
- `public/images/`: images and icons, downloaded from the Framer site.

## Editing a case study

Each project in `content/site.ts` has a list of `blocks` rendered in order:

- `heading`: section title in capitals
- `text`: full-width rich text (HTML)
- `columns`: two columns of rich text side by side
- `image`: a full-width image (put the file in `public/images/`)
- `caption`: the grey italic note under an image
- `compare`: a before/after slider

`related` sets which projects appear under "Other projects I worked on".

## "Explain this decision"

On case study pages, key phrases have a dotted underline. Clicking one opens a popover explaining the decision, using only what the page says plus a clearly labelled general UX principle.

- Mark a phrase in `content/site.ts` with `<span data-explain="ID">…</span>` (don't change the wording).
- Add its entry, with the same ID, to `content/explanations.ts`. `quote` must be copied verbatim from the page, and `sourceId` names the section it's in (a block `id`, or `"intro"`).
- Run `npm run check:explanations` (also part of `npm run lint`). It fails if a quote isn't found verbatim in its section, or if a phrase and an entry don't match.

Highlighting any other text shows an "Explain this" button. If the selection touches an underlined phrase, that explanation opens. Otherwise `app/api/explain/route.ts` asks Claude (Haiku 4.5) to explain it from that case study's text only. The route re-checks that the returned quote really is on the page, and shows "Not covered on this page" when the page doesn't explain it. Social Bonding (under NDA) never generates answers.

Abuse protection: selections of 3–300 characters that appear on the page, 10 model requests per IP per 10 minutes, and cached answers per case study and selection. The limits and cache are in memory, so each server instance keeps its own.

Environment variable (see `.env.example`): `ANTHROPIC_API_KEY`. Without it, the "Explain this" button shows "Explanations are not available right now"; underlined phrases still work.
