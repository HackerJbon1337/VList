# VList - Campus Marketplace 🎓

A modern, feature-rich marketplace platform built for college students to buy, sell, and trade items within their campus community.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **🛒 Marketplace** - Browse and discover products from fellow students
- **📦 Product Listings** - Create and manage your own listings
- **🔍 Smart Search** - Find exactly what you're looking for
- **🎨 Modern UI** - Beautiful, responsive design with smooth animations
- **🌙 Dark Mode** - Easy on the eyes, day or night
- **🔐 Authentication** - Secure user authentication with Supabase
- **🛍️ Shopping Cart** - Add items and checkout seamlessly

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **State Management** | Zustand |
| **Data Fetching** | TanStack React Query |
| **Authentication** | Supabase Auth |
| **Database** | Supabase (PostgreSQL) |
| **Icons** | Lucide React |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (protected)/        # Protected routes (auth required)
│   └── ...                 # Public pages
├── components/
│   ├── animations/         # Animation components (FadeIn, Stagger)
│   ├── auth/               # Authentication components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── listing/            # Listing-related components
│   ├── marketplace/        # Marketplace UI components
│   ├── product/            # Product display components
│   ├── providers/          # React context providers
│   ├── react-bits/         # Reusable UI components
│   └── skeletons/          # Loading skeleton components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions & configurations
│   └── supabase/           # Supabase client configuration
└── store/                  # Zustand state stores
    ├── auth.ts             # Authentication state
    └── cart.ts             # Shopping cart state
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HackerJbon1337/VList.git
   cd VList/vlist
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎨 UI Components

VList includes a rich set of custom UI components:

- **BlurText** - Text with blur animation effects
- **GradientText** - Animated gradient text
- **SpotlightCard** - Cards with spotlight hover effect
- **FadeIn / Stagger** - Animation wrappers
- **Skeletons** - Loading placeholder components
- And many more...

## 🔗 Links

- **Repository**: [github.com/HackerJbon1337/VList](https://github.com/HackerJbon1337/VList)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

## 📄 License

This project is private and not licensed for public use.

---

Made with ❤️ for campus communities
