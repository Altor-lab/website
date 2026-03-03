# B2B SaaS Website

## Stack
- Next.js 15 (App Router), TypeScript strict, Tailwind CSS v4, shadcn/ui, Framer Motion
- pnpm for package management

## Commands
- `pnpm dev` -- Dev server at localhost:3000
- `pnpm build` -- Production build + type check
- `pnpm lint` -- ESLint + Prettier
- `pnpm test` -- Vitest

## Code Style
- Path alias: `@/` maps to `src/`
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- Components: TypeScript with explicit prop interfaces
- No inline styles. Tailwind utility classes only.
- Imports: grouped (react, next, third-party, @/ local)

## Design System
- See @src/styles/globals.css for CSS variables (colors, spacing, radii)
- Font smoothing: antialiased on all text
- `text-wrap: balance` on headings, `text-wrap: pretty` on body paragraphs
- Responsive: mobile-first. Test at 375px, 768px, 1024px, 1440px

## Architecture
- `app/` -- Routes (App Router)
- `src/components/ui/` -- Primitives (button, card, input via shadcn)
- `src/components/sections/` -- Page sections (hero, features, pricing)
- `src/components/layout/` -- Header, footer, nav
- `src/lib/` -- Utilities, hooks, constants

## CRITICAL DESIGN RULES -- Read Every Time
- NEVER produce generic AI-looking output. No purple-to-blue gradient heroes. No symmetrical 3-card grids for every section. No "Streamline your workflow" copy. No stock blob illustrations.
- Commit to ONE aesthetic direction and follow through. Do not hedge.
- Use color functionally and sparingly. ONE accent color. Everything else is neutral.
- Generous whitespace. Section gaps: 96-160px desktop, 64px mobile.
- Vary section layouts. Asymmetric grids, different densities, visual rhythm.
- Every animation must serve a purpose. No decoration-only motion.
- Earn every element. If removing it changes nothing, remove it.
- Copy must be specific and concrete. Use numbers, name what you do, cut adjectives by 80%.
- Show the actual product in screenshots, not abstract illustrations.
- Typography: tight letter-spacing on headings (-0.02em to -0.04em), balanced text wrapping.

## Animations
- Use Framer Motion `motion` components for all animations
- NEVER use CSS @keyframes (except for simple utility animations like shimmer/pulse)
- Scroll reveals: fade-up with y:24, duration 0.6s, ease [0.25, 0.4, 0.25, 1]
- Stagger children: 0.08s delay between items
- Hover: translateY(-1px) for buttons, border-color change for cards
- Tab indicators: layoutId animation with spring stiffness 500, damping 30

## Workflow
- Run `pnpm build` after a series of changes to verify types
- Every page must export metadata for SEO
- New sections: create as separate component in src/components/sections/
- YOU MUST test responsive behavior when building UI
