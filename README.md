# CTOWN — AI-Powered Vehicle Technology Platform

A cinematic marketing website and content management platform for CTOWN, showcasing AI-powered performance systems engineered for high-end vehicles and drones. The project includes a public-facing marketing site with immersive animations and a secure admin dashboard for managing all site content.

---

## Overview

| | |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, custom CSS design tokens |
| **Animations** | GSAP 3, Lenis smooth scroll |
| **Database** | PostgreSQL via Prisma ORM 6 |
| **Auth** | NextAuth 5 (credentials provider, bcrypt hashing) |
| **Fonts** | Outfit · DM Sans · Space Mono · Great Vibes (Google Fonts) |

---

## Features

### Marketing Site (Public)
- Pinned hero section with scroll-triggered GSAP animations
- Product and drone showcase grids with entrance animations
- Video showcase and promotional banner sections
- Custom cursor tracker and full-screen menu overlay
- Lenis-powered smooth scrolling throughout

### Admin Dashboard (Authenticated)
- Product CRUD — create, edit, delete products with category, pricing, features, and images
- Hero slide manager — control homepage hero content and ordering
- Media library — upload and manage images and videos
- Role-based access (Admin / Editor)

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally (or a remote connection string)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ctown_web"
NEXTAUTH_SECRET="replace-with-a-strong-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Set up the database

```bash
npx prisma migrate dev --name init
```

### 4. Seed the database

Populates the database with a default admin account and sample products.

```bash
npm run seed
```

Default admin credentials (change after first login):

| Field | Value |
|---|---|
| Email | `admin@ctown.dev` |
| Password | `admin123` |

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
ctown_web/
├── app/
│   ├── (marketing)/          # Public-facing pages
│   │   ├── page.tsx          # Homepage
│   │   ├── products/         # Product listing and detail pages
│   │   └── drones/           # Drone showcase page
│   ├── (admin)/              # Password-protected admin area
│   │   ├── login/            # Login page
│   │   └── admin/
│   │       ├── dashboard/
│   │       ├── products/     # Product management (list, new, edit)
│   │       ├── hero/         # Hero slide management
│   │       └── media/        # File upload and media library
│   ├── api/                  # REST API routes (products, hero, media, upload, auth)
│   └── layout.tsx            # Root layout (fonts, metadata)
├── components/
│   ├── marketing/            # All public-facing UI components
│   └── admin/                # Admin panel UI components
├── lib/                      # Auth, Prisma client, GSAP/Lenis helpers, utilities
├── hooks/                    # useGSAP, useLenis
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seeding script
└── public/
    ├── assets/               # Static images (replace with production assets)
    └── uploads/              # User-uploaded media (local storage)
```

---

## Available Scripts

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Run ESLint
npm run seed     # Seed database with admin user and sample products
```

---

## Routes

### Public
| Route | Description |
|---|---|
| `/` | Homepage |
| `/products` | All products |
| `/products/[id]` | Product detail page |
| `/drones` | Drone showcase |

### Admin (requires login)
| Route | Description |
|---|---|
| `/admin/login` | Login page |
| `/admin/dashboard` | Overview dashboard |
| `/admin/products` | Product list |
| `/admin/products/new` | Create a product |
| `/admin/products/[id]` | Edit a product |
| `/admin/hero` | Manage hero slides |
| `/admin/media` | Media library and uploads |

---

## Database Schema

**Product** — Name, slug, category (`DRONE` | `VEHICLE` | `AI_SYSTEM`), price, description, features, image, featured flag, display order.

**HeroSlide** — Headline, subheadline, CTA text/link, image/video URL, order, active flag.

**User** — Email, hashed password, role (`ADMIN` | `EDITOR`).

**SiteMeta** — Key-value store for global site configuration.

---

## Notes for Developers

- **Assets** — The `/public/assets/` directory contains placeholder images. Replace with production-quality drone and vehicle photography before launch.
- **File uploads** — Currently stored locally in `/public/uploads/`. For production, integrate a cloud storage provider (e.g. AWS S3, Cloudflare R2).
- **NEXTAUTH_SECRET** — Must be a strong, unique random string in production. Generate one with `openssl rand -base64 32`.
- **Admin password** — Change the seeded `admin123` password immediately after first login.
