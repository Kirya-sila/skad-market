# SKAD Market - Next.js Migration

This is the migrated version of the SKAD Market application from Vite to Next.js with SSR enabled.

## Migration Status

### ✅ Completed
- Basic Next.js project setup
- TypeScript configuration
- ESLint and Prettier configuration
- Basic routing structure
- Error handling pages (404, error, loading)
- Navigation utilities for migration
- App Router structure

### 🔄 In Progress
- Component migration from react-router-dom to Next.js
- BuyerCabinet pages (client-side rendering)
- Manager pages (client-side rendering)
- API integration with Next.js

### 📋 TODO
- Migrate all pages from react-router-dom to Next.js App Router
- Replace NavLink components with Next.js Link
- Update all navigation calls to use Next.js router
- Migrate API calls to use Next.js API routes or external API
- Update environment variables
- Test all functionality
- Optimize for production

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading component
│   ├── not-found.tsx      # 404 page
│   ├── rims/              # Rims pages
│   ├── buyer/             # Buyer cabinet (client-side)
│   ├── manager/           # Manager pages (client-side)
│   └── ...
├── components/            # Shared components
│   └── NavLink.tsx        # Next.js NavLink wrapper
├── lib/                   # Utilities
│   └── navigation.ts      # Navigation utilities
├── pages/                 # Original page components (to be migrated)
├── features/              # Feature-based components
├── entities/              # Entity components
├── shared/                # Shared UI components
├── widgets/               # Widget components
└── styles/                # Global styles
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Migration Guidelines

### Navigation Migration
- Replace `useNavigate` from react-router-dom with the custom `useNavigate` from `@/lib/navigation`
- Replace `NavLink` components with the custom `NavLink` from `@/components/NavLink`
- Update route parameters from `:param` to `[param]` format

### Component Migration
- BuyerCabinet and Manager components should use client-side rendering (`'use client'`)
- Other components can use server-side rendering where appropriate
- Update imports to use Next.js patterns

### API Integration
- Use Next.js API routes for internal APIs
- For external APIs, use the existing API structure with proper error handling
- Implement proper caching strategies

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_ROUTING_BASE_PATH=
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## Notes

- The original Vite project structure has been preserved in the `src/pages`, `src/features`, etc. directories
- Components are being migrated gradually to maintain functionality
- Client-side rendering is used for BuyerCabinet and Manager components as specified
- The migration maintains the existing business logic while adapting to Next.js patterns