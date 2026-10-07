# Portfolio design language

## Purpose

Help a collaborator understand Khuluza's work, approach and interests, then start a conversation. The primary action is to explore the projects; the closing action is email.

## Direction

A personal portfolio closely following the context-con reference: a floating black pill navigation, centered bold headline, compact event badge, orange call to action, pale background and a large colorful map globe below the hero.

- Ground: light grey `#f7f7f7`, ink `#111111`, white detail surfaces.
- Signal: orange `#f04b00` for calls to action and map markers.
- Type: Inter for body and bold display, IBM Plex Mono for small metadata.
- Structure: open chapters, thin dividers, a project index with one focused detail panel, two journal entries, and an upcoming-event feature.
- Photography: the existing portrait, organizer event photography and promotional artwork. Each event links to the source and identifies the image's origin.

The three event assets are compressed local files and are served directly, along with the compact formal portrait (52 KB). The greeting photographs and user-supplied project screenshots use Next.js image optimization. Project screenshot cards follow their images' natural proportions, filling the frames without empty bands or cropping. The Google Cloud Summit brand artwork is shown in full within its event frame.

## Motion

Motion for React sequences the hero's headline, supporting copy, CTA and globe, then handles section entrances and interruptible project transitions. Content is visible in server HTML before animation initializes. MapLibre renders a globe while in view, with a local image fallback. Visitors rotate it by dragging or with arrow keys; touch uses two fingers so one-finger page scrolling remains available. It stays still between interactions. The locally maintained map style uses public OpenFreeMap tiles without an API key. Reduced-motion preferences disable positional entrances, animated project changes, keyboard camera easing and smooth anchor scrolling.

An opening greeting introduces Khuluza and brings the beach, heart-gesture and thumbs-up photographs forward in a polaroid stack. Two messages follow: “I love working with and building AI tools” and “It’s really fun and this is my portfolio.” It ends with “Welcome to my world” before the curtain lifts into the hero. It lasts about twelve seconds including its exit. Skip intro and Escape dismiss it, and the footer can replay it. Reduced motion and disabled JavaScript bypass the overlay. The intro owns focus and temporarily prevents background scrolling; the hero timeline waits for the greeting to finish.

## Ownership

- `app/page.tsx`: server-rendered content and page structure.
- `lib/portfolio.ts`: typed project descriptions, event information and social links.
- `components/project-showcase.tsx`: selected project and transition state.
- `components/site-nav.tsx`: active-section indication and mobile menu.
- `components/reveal.tsx`: progressively enhanced section motion.
- `components/hero-sequence.tsx`: opening animation choreography.
- `components/intro-experience.tsx`: greeting, skip/replay behavior and shared introduction state.
- `components/world-globe.tsx`: isolated WebGL lifecycle, resizing, visibility and manual navigation.
- `app/globals.css`: the responsive visual system.

Keep external API credentials and private planner content out of the site. Content is curated at build time; there is no runtime dependency on Notion or Exa.

The `predev` and `prebuild` scripts copy MapLibre's module worker and its shared module into a versioned public directory. This preserves their relative import and avoids relying on a bundler to discover the library's dynamic worker URL. The generated files are ignored by Git.

`PORTFOLIO_BUILD_DIR` can select a separate Next.js output directory for a preview or verification build. The default remains `.next`. Use `.next-preview` and `.next-build` when running development and build verification together; sharing generated files between server processes can cause missing-module and page-entry errors.

## Responsive and accessible behavior

The desktop composition becomes a stacked page below 600px. Project buttons form a compact two-column index on phones. Navigation uses an accessible disclosure with Escape support. Preserve native links, focus outlines, heading order, readable image descriptions, a skip link and keyboard globe navigation.

## Verification

Next.js remains on the 15.x release line, updated to 15.5.27. Its nested PostCSS is overridden to 8.5.29 to address the audited source-map and CSS output advisories without a major framework migration. Remove the override when the framework ships a patched PostCSS dependency. The project uses Node.js 22.

Run `npm run lint`, `npm run typecheck`, `npm run build` and `git diff --check`. In a browser, check project selection, mobile navigation, anchors, contact destinations, event dates, image loading, page overflow and reduced-motion behavior at desktop, tablet and phone sizes.
