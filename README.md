# Khuluza Tshabalala — personal portfolio

A responsive portfolio built with Next.js 15, React, TypeScript, Motion for React and MapLibre. It presents current projects, a personal introduction and a 2026 event journal.

## Development

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Verification

```sh
npm run lint
npm run typecheck
npm run build
```

With the preview running (currently port 3002), run the browser smoke check:

```sh
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check open http://localhost:3002 --browser chrome
npx --yes --package @playwright/cli playwright-cli -s=portfolio-check run-code --filename=scripts/verify-browser.js
```

The check uses the open tab's localhost port. It verifies intro skip/replay/Escape, globe dragging and arrow keys, project switching, responsive overflow, mobile navigation, keyboard access, event dates, images, reduced motion and content without JavaScript.

## Updating content

Edit `lib/portfolio.ts` for project descriptions, statuses, journal entries and social links. The upcoming Dell feature and personal copy live in `app/page.tsx`. Place images in `public/events` and update the source record in `docs/content-sources.md`.

The site uses curated content rather than a live Notion connection. No Notion or Exa credentials are required at runtime.

See [design language](docs/design-language.md) for the visual system, motion behavior and module boundaries, and [content sources](docs/content-sources.md) for provenance.
