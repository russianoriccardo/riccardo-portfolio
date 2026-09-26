# riccardo-portfolio

Portfolio site for Riccardo Russiano, built with Next.js (App Router) and plain CSS. It reproduces the Framer site at riccardorussiano.com, including its URLs (`/`, `/venato`, `/social-bonding`, `/greenmatch`).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # type check
```

## Structure

- `content/site.ts`: all copy, links, testimonials and the case studies. Edit this file to change content.
- `app/page.tsx`: home page (hero, companies strip, featured projects, testimonials, contact)
- `app/[slug]/page.tsx`: case study page, generated for each project in `content/site.ts`
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
