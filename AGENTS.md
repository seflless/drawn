# AGENTS.md

## Project Goals

Drawn is a prototype library and demo space for drawing-style effects on web content. The project should make ordinary HTML look like it has been marked up by hand, drawn live, or annotated on paper.

Core goals:

- Build a collection of reusable effects and components for drawing interactions.
- Make text and shapes look like they were drawn with a pen, pencil, or marker.
- Support editorial marks such as circles, underlines, highlights, boxes, strike-throughs, cross-outs, and margin-style brackets.
- Animate drawn objects so they appear to be sketched into place over time.
- Mix normal HTML content with drawn overlays, so headings, paragraphs, links, and layout remain semantic while drawings sit on top.
- Keep effects useful for realistic editorial scenarios: reviewing a draft, marking up a blog post, teaching from a text, studying an article, or showing feedback on a document.

The current prototype uses `rough-notation` for hand-drawn annotations over HTML elements. Future work may add custom drawing primitives, SVG/canvas effects, component wrappers, and richer sequencing controls.

## Repo Overview

- `src/main.ts`: Builds the current demo article and wires drawing annotations to DOM elements.
- `src/style.css`: Page layout, typography, and annotation presentation styles.
- `index.html`: Vite entry HTML, font loading, favicon, and root app element.
- `public/`: Static assets.
- `README.md`: Short project description.

## Running Locally

This project uses Vite and Bun-compatible package scripts.

Common commands:

```bash
bun install
bun run dev
bun run build
bun run preview
```

`bun run dev` starts the local development server. `bun run build` runs TypeScript checking and creates the production build.

## Implementation Notes

- Prefer semantic HTML content with drawing effects attached to spans, headings, paragraphs, or sections.
- Keep annotations visually organic: small variation, imperfect lines, and restrained timing are part of the product feel.
- Effects should be able to start when content scrolls into view, rather than all running on initial page load.
- Avoid making the demo only a technical test page. Use realistic content that shows why someone would use drawn annotations.
- Keep code small and direct while the project is still a prototype. Add abstractions only when repeated effect patterns become clear.

## Current Demo Direction

The demo should read like a marked-up blog post or study page. Good examples include:

- A paragraph where an editor circles the strongest phrase.
- A professor-style underline below a sentence that needs evidence.
- A highlighter pass over the thesis or key takeaway.
- A boxed phrase around a term that needs definition.
- A strike-through or cross-out on vague language.
- Brackets around a whole paragraph that needs revision.

As the reader scrolls, annotations should appear near the content being discussed, creating the feeling of someone marking up the document while reading it.
