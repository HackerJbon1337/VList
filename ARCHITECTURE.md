# VList - Technical Architecture & Workflow 🏗️

This document explains how VList works under the hood, covering the Frontend (what users see) and Backend (logic & data).

## 🌍 1. High-Level Overview

VList is a **Full-Stack Web Application** built with **Next.js**. It serves as a marketplace for university students.
*   **Users** can browse products, search by category/location, and contact sellers.
*   **Authentic Students** can sign in via email to list items for sale.
*   **Data** is stored securely in **Supabase** (a cloud Postgres database).

---

## 🎨 2. Frontend (The "Client")

The frontend is the user interface running in the browser. It handles user interactions, animations, and displaying data.

### **Tech Stack:**
*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router) - Handles routing and rendering.
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first styling for beautiful UI.
*   **Animations**: Framer Motion & Custom components (React Bits) for smooth transitions.
*   **Icons**: Lucide React.

### **Key Workflows:**

#### **A. Viewing the Marketplace (`/marketplace`)**
1.  **Page Load**: The page mounts and triggers a `useEffect` hook.
2.  **Product Fetching**: It calls `fetchProducts()` in `src/lib/products.ts`.
3.  **API Request**: This function sends a `GET` request to `/api/products` with optional search filters (page, category, location).
4.  **Display**:
    *   **Loading State**: Shows skeleton loaders while fetching.
    *   **Success**: Displays grid of `ProductCard` components.
    *   **Demo Mode Check**: If no real products exist, it falls back to mock data and shows a Disclaimer Popup (`MockDataDisclaimer.tsx`).

#### **B. Product Detail Page (`/product/[id]`)**
1.  **Server-Side Rendering (SSR)**: This page (`src/app/(public)/product/[id]/page.tsx`) queries Supabase **directly on the server** for speed and SEO.
2.  **Data Lookup**: It finds the product by ID. If not found in DB, it checks the Mock Data / Featured Products fallback.
3.  **Seller Info**: Fetches the Seller's Profile (Name, Rating, Grad Year) to display on the page.

#### **C. Selling an Item (`/sell`)**
1.  **Form**: User fills out the `CreateListingForm` (Title, Price in ₹, Location, Category).
2.  **Image Upload**: Users can select from Gallery or use Camera (handled by standard HTML file input).
3.  **Submission**:
    *   The form sends a `POST` request to `/api/products` with the JSON data.
    *   If successful, redirects the user to the Marketplace.

---

## ⚙️ 3. Backend (The "server")

The backend handles security, database operations, and API endpoints. It runs on **Vercel's Edge/Serverless Functions**.

### **Tech Stack:**
*   **Database**: [Supabase](https://supabase.com/) (PostgreSQL).
*   **Auth**: Supabase Auth (Email Magic Links/Passwords).
*   **API**: Next.js API Routes (Serverless).

### **Storage Structure (Database):**
*   **`profiles` Table**:
    *   Stores `name`, `rating`, `major`, `grad_year`.
    *   Linked to user account ID.
*   **`products` Table**:
    *   Stores `title`, `price` (in ₹), `description`, `image_url`.
    *   **`seller_id`**: Foreign Key linking to `profiles` (so we know who sold it).
    *   **`location`**: Stores campus spots (e.g., "MH1", "Food Street").

### **Key API Routes:**

#### **1. Products API (`/api/products`)**
*   **GET**: Fetches public product list. Supports filtering (`?search=book`, `?category=Electronics`).
*   **POST** (Protected):
    1.  Checks if user is logged in using `supabase.auth.getUser()`.
    2.  If yes, inserts a new row into the `products` table.
    3.  Automatically links usage of `user.id` as the `seller_id`.

#### **2. User Profile API (`/api/profile`)**
*   **GET**: Returns the logged-in user's profile.
*   **PUT**: Updates profile details (Name, Major, Grad Year).

---

## 🔒 4. Security & Middleware

*   **Middleware (`middleware.ts`)**:
    *   Runs on *every* request.
    *   Refreshes Supabase Auth tokens to keep users logged in.
    *   Protecting routes: Ensures `/sell` and `/profile` are only accessible to logged-in users.
*   **Row Level Security (RLS)**:
    *   Database policies in Supabase ensure:
        *   *Anyone* can **view** products.
        *   *Only the creator* can **edit/delete** their own product.

---

## 🚀 5. Deployment

*   **GitHub**: Stores the code version history.
*   **Vercel**:
    1.  Listens for updates on GitHub.
    2.  Pulls the new code.
    3.  Builds the Next.js app.
    4.  Deploys it to a global CDN (Content Delivery Network) so it's fast everywhere.
