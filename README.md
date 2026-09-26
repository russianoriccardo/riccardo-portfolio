# riccardo-portfolio

Portfolio site for Riccardo Russiano, built with Next.js (App Router). It replaces the Framer site at riccardorussiano.com.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # type check
```

## Structure

- `content/site.ts`: all copy, navigation, social links and project case studies. Edit this file to change content.
- `app/page.tsx`: home (hero, selected work, testimonial)
- `app/about/page.tsx`: about page
- `app/work/[slug]/page.tsx`: case study page, generated for each project in `content/site.ts`
- `components/`: header (with mobile menu), footer/contact, project card
- `app/globals.css`: all styles. Breakpoints match Framer's: desktop ≥ 1200px, tablet 810–1199px, phone < 810px.
- `public/images/`: images. Replace the placeholder SVGs with real images (and update paths in `content/site.ts` if the extension changes).

## Adding a project

Add an entry to `projects` in `content/site.ts` and put its images in `public/images/`. The card on the home page and the case study page are created from it.
