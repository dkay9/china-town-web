# DEVLOG — CTOWN Web

## 2026-06-14: Initial Build

### Dependency Resolutions
- **Prisma**: Downgraded from v7 to v6 (`prisma@^6`, `@prisma/client@^6`). Prisma 7 removed `url` from the datasource block in `schema.prisma` and requires a `prisma.config.ts` file with adapter pattern. v6 retains the traditional `env("DATABASE_URL")` approach which is simpler for development.
- **Lenis**: `@studio-freight/lenis` is deprecated — using `lenis` package directly.

### Implementation Status

| Step | Component | Status |
|------|-----------|--------|
| 1 | Prisma schema + seed | Done |
| 2 | NextAuth credentials provider | Done |
| 3 | Lenis + GSAP bootstrap | Done |
| 4 | Navbar (transparent → opaque) | Done |
| 5 | HeroSection (pinned scroll) | Done |
| 6 | CategoryGrid (stagger entrance) | Done |
| 7 | FeaturedProducts (API-fetched) | Done |
| 8 | TechBanner + PromoBanner | Done |
| 9 | Footer | Done |
| 10 | CursorTracker | Done |
| 11 | Admin dashboard | Done |
| 12 | Product CRUD | Done |
| 13 | Hero editor | Done |
| 14 | Media manager | Done |
| 15 | Polish pass | Partial — needs real images, mobile fine-tuning |

### Setup Instructions
1. Ensure PostgreSQL is running locally
2. Copy `.env` and set `DATABASE_URL` to your PostgreSQL connection string
3. Run `npx prisma migrate dev --name init` to create tables
4. Run `npm run seed` to seed admin user + sample products
5. Run `npm run dev` to start the dev server
6. Admin login: `admin@ctown.dev` / `admin123`

### Known Gaps
- Placeholder images in `/public/assets/` are empty — replace with real drone/vehicle imagery
- `@dnd-kit/sortable` not installed for hero slide drag-reorder (using manual move buttons instead)
- No cloud storage integration yet — uploads go to `/public/uploads/`
