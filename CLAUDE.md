# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

**Development:**
- `pnpm dev` or `npm run dev` - Start development server on port 1977 with host binding
- `pnpm build` or `npm run build` - Build the project for production
- `pnpm preview` or `npm run preview` - Preview the built site locally

**Code Formatting:**
- `pnpm format` or `npm run format` - Format all files using Prettier

## Architecture Overview

This is an **Astro-based blog** with React components, deployed on Vercel with serverless rendering (hybrid mode).

### Key Technologies:
- **Framework**: Astro 4.x with React integration
- **Styling**: Tailwind CSS with custom design system and shadcn/ui components
- **Content**: MDX for blog posts with Mermaid diagram support
- **Deployment**: Vercel with analytics and speed insights
- **State**: React hooks for theme management and window scroll behavior

### Project Structure:

**Content Management:**
- `/src/content/blog/` - Blog posts organized by year (2024/, 2025/)
- `/src/content/config.ts` - Content collection schemas with frontmatter validation
- Content supports: title, description, date, image, draft status, language, tags

**Components & UI:**
- `/src/components/` - React components (Header, ThemeToggle, ScrollToTop, etc.)
- `/src/components/ui/` - Reusable UI components (button, animations, icon-cloud, etc.)
- `/src/layouts/` - Astro layout components (BaseLayout, FullPageLayout)

**Pages & Routing:**
- `/src/pages/` - Astro pages with dynamic routing for blog posts
- `/src/pages/blog/` - Blog-specific routing (`[...slug].astro` for posts)
- Supports both static pages (index, 404) and dynamic content

**Utilities & Configuration:**
- `/src/site-config.ts` - Global site configuration (author, social links, skills, navigation)
- `/src/utils/posts.ts` - Post filtering and sorting utilities
- `/src/hooks/` - React hooks for theme and scroll management
- `/src/plugins/mermaid.ts` - Custom Mermaid integration for diagrams

### Development Notes:

**Content Creation:**
- Blog posts use MDX format with frontmatter schema validation
- Images stored in `/public/[year]/[post-slug]/` structure
- Draft posts are filtered out in production but visible in development

**Styling System:**
- Uses custom Tailwind configuration with CSS variables for theming
- Dark mode support via class-based switching
- Custom dot background pattern (bg-dot class)
- shadcn/ui component system integration

**Performance Features:**
- View transitions for smooth page navigation
- Image service passthrough for optimized loading
- Compression via @playform/compress
- Vercel Speed Insights and Analytics integration