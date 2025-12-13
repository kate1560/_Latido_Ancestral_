# Latido Ancestral - Multi-Vendor E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

## 📖 Overview

**Latido Ancestral** (Ancestral Heartbeat) is a comprehensive multi-vendor e-commerce platform dedicated to promoting and selling authentic handmade Colombian handicrafts. The platform connects artisans and vendors with customers worldwide, offering traditional products such as vueltiao hats, Wayuu mochilas, hammock chairs, jewelry, textiles, and more—all crafted with ancestral techniques and natural materials.

### Key Features

- 🛍️ **Multi-vendor marketplace** with vendor dashboards and commission tracking
- 🎨 **Product catalog** with categories, collections, and dynamic filtering
- 🛒 **Shopping cart & checkout** with coupon support and multiple payment methods
- ❤️ **Wishlist** for registered users
- 📦 **Order tracking** and management system
- 👥 **User authentication** with role-based access (admin, vendor, customer, moderator)
- 📊 **Analytics dashboard** for vendors and administrators
- 🌐 **Multi-language support** (Spanish/English)
- 📱 **Fully responsive** design for all devices
- 🔒 **Secure authentication** with Supabase Auth

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** (App Router) - React framework with server-side rendering
- **React 19** - UI library with latest features
- **TypeScript 5.9** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first styling
- **Zustand** - L## 📁 Project Structure

```
Latido_Ancestral/
├── src/                        # Frontend application (Next.js)
│   ├── app/                    # App Router pages and layouts
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout process
│   │   ├── collections/       # Product collections
│   │   │   └── [id]/         # Dynamic category pages
│   │   ├── dashboard/         # User/vendor/admin dashboards
│   │   │   ├── admin/
│   │   │   ├── vendor/
│   │   │   └── user/
│   │   ├── products/          # Product pages
│   │   │   └── [id]/         # Product detail
│   │   ├── wishlist/          # User wishlist
│   │   ├── api/               # API routes (backend)
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   └── wishlist/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Cart/
│   │   └── Dashboard/
│   ├── lib/                   # Infrastructure code
│   │   ├── db.ts             # PostgreSQL connection
│   │   ├── auth.ts           # Auth helpers
│   │   ├── supabaseClient.ts # Supabase client
│   │   └── repositories/     # Data access layer
│   ├── store/                 # Zustand state stores
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── locales/               # i18n translations
│   └── middleware.ts          # Next.js middleware
│
├── backend/                    # Optional separate backend (Express)
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── middleware/
│   ├── package.json
│   └── README.md
│
├── database/                   # Database schema and migrations
│   ├── all.sql                # Complete schema with seed data
│   ├── powerbi_schema.sql     # Analytics schema
│   ├── INSTALACION.md         # Setup instructions (Spanish)
│   ├── db.ts                  # Database utilities
│   └── migrate.ts             # Migration scripts
│
├── analytics/                  # Analytics and reporting
├── public/                     # Static assets (images, fonts)
├── .gitignore                 # Git ignore patterns
├── package.json               # Dependencies and scripts
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── README.md                  # This file
```

## Main Features

- Clear and accessible navigation with header menu  
- Responsive design adapted for computers, tablets and mobile devices  
- Organized sections to display products with images, description, price and purchase links  
- Use of smooth animations to enhance visual experience  
- SEO-optimized metadata.

## Installation and Usage

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kate1560/Tienda_Virtual.git
cd Tienda_Virtual
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run dev
```

4. Open browser at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm start` - Starts the production server
- `npm run lint` - Runs the linter to check code

## Environment Variables

Create a `.env.local` file in the project root with at least:

```bash
# PostgreSQL connection (Supabase database)
DB_HOST=your-db-host                 # e.g. db.xxxxxx.supabase.co
DB_PORT=5432
DB_USER=your-db-user                 # e.g. postgres
DB_PASSWORD=your-db-password
DB_NAME=your-db-name                 # in Supabase usually: postgres
DB_POOL_MAX=10                       # optional

# Internal auth token (HMAC cookie used by the Next.js backend)
AUTH_SECRET=change_me_in_production  # secret for signing auth cookies

# Supabase project keys (Auth + SQL API)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-side only, NEVER expose publicly

NODE_ENV=development
```

`DB_*` variables are used by `src/lib/db.ts` to create the PostgreSQL connection pool **pointing to your Supabase database** (this project no longer needs a local PostgreSQL instance).
`AUTH_SECRET` is used by `src/lib/auth.ts` to sign the `auth_token` cookie.
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are used by the browser client for Supabase Auth.
`SUPABASE_SERVICE_ROLE_KEY` is used **only on the server** (e.g. `/api/auth/register`, `/api/auth/login`) and must remain secret.

## Database Setup with Supabase (PostgreSQL only)

This project is designed to run **only** on a managed PostgreSQL provided by **Supabase**. You do **not** need any local PostgreSQL server.

### 1. Create a Supabase project

1. Go to the Supabase dashboard and create a new project.
2. Choose a strong database password.
3. Wait for the project to finish provisioning.

### 2. Get database connection details and API keys

In your project, go to **Settings → Database → Connection info** and copy:

- Host
- Port (default: 5432)
- Database name (usually `postgres`)
- User (usually `postgres`)
- Password

Then go to **Project Settings → API** and copy:

- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret)

Use these values to fill the environment variables shown above.

### 3. Configure `.env.local` to point to Supabase

Set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` and `DB_NAME` using the values from **Settings → Database**. This makes all calls that use `pg` (through `src/lib/db.ts`) talk directly to your Supabase PostgreSQL.

Make sure you do **not** leave the default `localhost` values in production.

### 4. Apply the schema (`database/all.sql`)

1. In Supabase, open **SQL Editor**.
2. Copy the contents of `database/all.sql` from this repository.
3. Make sure the target schema is `public`.
4. Run the script.

The script will:

- Create all enums, tables, indexes, functions and triggers needed by the app.
- Insert seed data for roles, configuration, categories, one demo vendor, some products and a welcome coupon (`BIENVENIDA10`).
- Insert three example users in the `usuarios` table (admin, vendor owner and customer) with fixed UUIDs and emails `admin@latidoancestral.com`, `vendor@latidoancestral.com` and `cliente@latidoancestral.com`.

You can safely edit or remove the seed data section at the bottom of `all.sql` if you prefer a clean database.

### 5. Create real users (Supabase Auth + `usuarios`)

User accounts are managed with **Supabase Auth** and mirrored in the `usuarios` table using the same UUID. The recommended flow is:

1. Start the app locally with `npm run dev`.
2. Open `http://localhost:3000/register`.
3. Register a new user (customer). This will:
   - Create a Supabase Auth user via `supabase.auth.admin.createUser`.
   - Insert a row in `public.usuarios` with the same `id`.
   - Issue the internal `auth_token` cookie for backend guards.
4. Log in via `http://localhost:3000/login`, which verifies credentials against Supabase Auth and then reads the profile from `usuarios`.

To promote an existing user to **admin** or **vendor**, edit the row in `usuarios` using the Supabase Table Editor or SQL, for example:

```sql
-- Promote a user to admin
UPDATE usuarios SET role = 'admin' WHERE email = 'your-admin-email@example.com';

-- Promote a user to vendor (and optionally link to an existing vendor row)
UPDATE usuarios SET role = 'vendor', vendor_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
WHERE email = 'your-vendor-email@example.com';
```

If you prefer to use the seeded demo users from `all.sql`, you must also create matching Supabase Auth users (same emails) in **Authentication → Users** and then ensure their `id` values match the `usuarios.id` values (or adjust the `usuarios` IDs to match Supabase). For most setups it is simpler to create new users via `/register` and ignore/remove the seeded ones.

### 6. (Optional) Row Level Security (RLS) in Supabase

The bottom of `database/all.sql` already contains example RLS policies for `usuarios`, `wishlist`, `pedidos`, `cupones_usuarios` and `direcciones`. They are designed to work when the app uses Supabase JWTs (for example from `supabase-js`).

The current backend uses a direct database connection (via `pg`) with a service-level role, so those queries are not blocked by RLS. If you enable these policies, make sure that:

- Client-side calls that use `supabase-js` respect the policies.
- Server-side calls that must bypass RLS use the service role connection (as they do now).

## Project Overview and Architecture

This project is a complete **multi-vendor e‑commerce platform** for *Latido Ancestral / Ancestral Heartbeat*, built only with **Next.js 16 (App Router)** and **Supabase PostgreSQL**.

Key goals:

- Sell Colombian handmade products (sombreros vueltiaos, mochilas Wayuu, textiles, etc.).
- Support multiple vendors (marketplace) with their own store dashboards.
- Provide a professional shopping experience: catalog, cart, checkout, coupons, wishlist, orders, tracking.
- Keep all backend logic inside **Next.js API routes** (no separate Express server).

### Main Modules

- **Public Storefront**
  - Home with highlighted collections and products.
  - Category and collection pages.
  - Product detail pages with gallery, description, price, stock, vendor info and reviews.
  - Style / inspiration content pages.
  - Language support (ES/EN) and visual theme consistent with the brand.

- **Shopping Experience**
  - Persistent cart (client side + API).
  - Checkout page: addresses, shipping method, payment method (extensible).
  - Coupons and discounts.
  - Wishlist for registered users.

- **User Account / Dashboard**
  - Profile and address management.
  - Wishlist and order history.
  - For vendors: list of products, orders and basic analytics.
  - For admins: global orders / users / vendors overview.

- **Admin & Multi‑Vendor**
  - Vendors (`vendors` table) with commission, contact info and branding.
  - Vendor applications and approval flow.
  - Vendor payouts and basic reporting tables.

### Tech Stack

- **Frontend / Backend**: Next.js 16 (App Router), React 19, TypeScript.
- **Styles**: Tailwind CSS.
- **Database**: Supabase PostgreSQL using the schema in `database/all.sql`.
- **Backend access to DB**: `pg` pool (`src/lib/db.ts`).
- **Authentication**:
  - Supabase Auth (email + password).
  - Internal `auth_token` cookie signed with `AUTH_SECRET` for server‑side guards.
- **State / Hooks**: React hooks and simple stores for cart, language, user session.

### Roles and Example Users

User roles are defined in the enum `user_role`:

- `admin` – global administrator of the platform.
- `vendor` – owner or manager of a specific store/vendor.
- `customer` – regular customer.
- `moderator` – content / reviews moderation.
- `provider` – reserved for future integrations.

Typical example users you can configure in Supabase (see `README_SUPABASE.md` for the exact SQL):

- **Global Admin** → `katemartinez1507@gmail.com` (`role = 'admin'`).
- **Example Store Owner** → `admin@latido.com` (`role = 'vendor'`, linked to a row in `vendors`).
- **Store Manager** → `manager@latido.com` (vendor/manager of the same store).
- **Demo Customer** → `user@latido.com` (`role = 'customer'`).

These users live in **Supabase Auth** and are mirrored in the `usuarios` table with the same `id` (UUID).

### Directory Structure (high level)

- `src/app/` – Next.js App Router pages, layouts and API routes.
  - `page.tsx` – public homepage.
  - `cart/`, `checkout/`, `wishlist/` – shopping flows.
  - `login/`, `register/`, `forgot-password/`, `reset-password/` – auth flows.
  - `dashboard/` – user, vendor and admin dashboards.
  - `api/` – backend endpoints (auth, products, cart, orders, wishlist, etc.).
- `src/components/` – shared UI components (headers, footers, product cards, etc.).
- `src/lib/` – infrastructure code:
  - `db.ts` – PostgreSQL pool and helpers.
  - `auth.ts` – auth token cookie helpers.
  - `supabaseClient.ts` – Supabase browser & service clients.
  - `repositories/` – data access for users, products, orders, wishlist, etc.
- `database/all.sql` – full PostgreSQL schema and seed data, ready for Supabase.

### Development Workflow

1. Configure `.env.local` (see section **Environment Variables**).
2. Create a Supabase project and run `database/all.sql` (see **README_SUPABASE.md**).
3. Install dependencies (`npm install`).
4. Start development server: `npm run dev`.
5. Visit `http://localhost:3000` to explore the storefront and dashboards.

### Next Steps / Ideas

Some ideas that can be added on top of the current implementation:

- Real payment gateway integration (e.g. Stripe, PayPal, Wompi).
- Advanced vendor analytics and reports.
- More granular permissions per role.
- Full RLS adoption using Supabase Auth on both client and server.

## 👥 Team Structure

This project is developed collaboratively by three specialized teams:

### Database Team (@clevervi)
**Lead**: Adrian Villegas (adriandariov@gmail.com)
**Responsibilities**:
- PostgreSQL database schema design and management
- Supabase configuration and setup
- Database migrations and seed data
- SQL optimization and query performance
- Data integrity and security policies

**Key Files**: `database/all.sql`, `database/powerbi_schema.sql`, `database/INSTALACION.md`

### Frontend Team (@kate1560)
**Lead**: Kateryn Martinez (katemartinez1507@gmail.com)
**Responsibilities**:
- Next.js application development
- React components and UI/UX design
- State management with Zustand
- Responsive design with Tailwind CSS
- Client-side routing and navigation
- Multi-language support (i18n)

**Key Files**: `src/app/`, `src/components/`, `src/store/`, `src/hooks/`, `public/`

### Backend Team (@reyes-coder)
**Lead**: Samuel Reyes (samuelreyescastro.456@gmail.com)
**Responsibilities**:
- Next.js API routes development
- Authentication and authorization logic
- Business logic and data validation
- Integration with Supabase Auth
- Repository pattern implementation
- Optional Express.js backend service

**Key Files**: `src/app/api/`, `src/lib/`, `backend/`

## 🌱 Development Workflow

### Branch Strategy

This project uses a feature-branch workflow:

```
main                    # Production-ready code
  └─ dev/main           # Integration branch
      ├─ dev/database   # Database team branch
      ├─ dev/frontend   # Frontend team branch
      └─ dev/backend    # Backend team branch
```

### Contribution Guidelines

1. **Clone the repository**:
   ```bash
   git clone https://github.com/clevervi/Latido_Ancestral.git
   cd Latido_Ancestral
   ```

2. **Work on your team's branch**:
   ```bash
   # Database team
   git checkout dev/database
   
   # Frontend team
   git checkout dev/frontend
   
   # Backend team
   git checkout dev/backend
   ```

3. **Make your changes** and commit regularly:
   ```bash
   git add .
   git commit -m "feat: descriptive message about your changes"
   ```

4. **Push to your team's branch**:
   ```bash
   git push origin dev/database  # or dev/frontend or dev/backend
   ```

5. **Create a Pull Request** to `dev/main` for integration

### Commit Message Convention

Use conventional commits for clear history:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 📦 Deployment

### Production Deployment

Recommended platforms:
- **Frontend**: Vercel, Netlify, or AWS Amplify
- **Database**: Supabase (managed PostgreSQL)
- **Backend**: Vercel Serverless Functions or Railway

### Environment Setup

1. Set up environment variables in your deployment platform
2. Configure Supabase production instance
3. Run database migrations on production database
4. Build and deploy the Next.js application

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📝 License

This project is proprietary software developed for Latido Ancestral.

## ✉️ Contact & Support

For questions, issues, or contributions:
- **Project Lead**: Kateryn Martinez (katemartinez1507@gmail.com)
- **Database Team**: Adrian Villegas (adriandariov@gmail.com)
- **Backend Team**: Samuel Reyes (samuelreyescastro.456@gmail.com)

## 🚀 Future Enhancements

- [ ] Real payment gateway integration (Stripe, PayPal, Wompi)
- [ ] Advanced vendor analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Social media integration
- [ ] Advanced product recommendation engine
- [ ] Multi-currency support
- [ ] Automated email marketing
- [ ] Customer reviews and ratings system
- [ ] Live chat support
- [ ] Inventory management system

---

**Built with ❤️ by the Latido Ancestral Team**

*Preserving Colombian ancestral traditions through technology*
