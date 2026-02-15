# Bookmark Manager

A professional, real-time Bookmark Manager built with **Next.js**, **Supabase**, and **Tailwind CSS**. This application allows users to securely save, organize, and manage their favorite links with instant updates and seamless Google authentication.

---

## 🚀 Live Demo

- **Vercel URL:** https://bookmark-manager-task.vercel.app/

---

## 🚀 Features
- **Google OAuth Login**: Secure authentication powered by Supabase Auth.
- **Real-time Synchronization**: Bookmarks update instantly across all open tabs.
- **Optimistic UI Updates**: Interactions feel lightning-fast.
- **Responsive Design**: Beautifully crafted with Tailwind CSS for mobile and desktop.
- **Protected Dashboard**: Personalized space for every user.

---

## 🛠️ Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase
- **Authentication**: Supabase Auth (Google Provider)

---

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/catherin-raichal-i/bookmark-manager.git
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**:
   Create a `.env.local` file with your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. **Database Setup**:
   Run the SQL code in `supabase/schema.sql` inside your Supabase SQL Editor.
5. **Run Locally**:
   ```bash
   npm run dev
   ```

---

## 🚧 Challenges & Solutions

### 🔐 1. Google OAuth Configuration

**Challenge:**  
Google authentication initially failed due to incorrect redirect URLs and incomplete provider setup in Supabase.

**Solution:**  
- Enabled Google provider in Supabase Auth  
- Added correct redirect URLs in both Supabase and Google Cloud Console  
- Stored Supabase keys securely in `.env.local`  
- Restarted the development server after env changes  
- Verified the OAuth flow using Supabase logs  

---

### 🔒 2. Ensuring User-Private Bookmarks (RLS)

**Challenge:**  
Bookmarks from different users were visible because Row Level Security (RLS) policies were not properly enforced.

**Solution:**  
- Enabled RLS on the `bookmarks` table  
- Created policies using `auth.uid()`  
- Restricted users to:
  - View only their bookmarks  
  - Insert their own bookmarks  
  - Delete their own bookmarks  
- Tested using multiple Google accounts  

---

### ⚡ 3. Realtime Updates Across Tabs

**Challenge:**  
New bookmarks were not appearing automatically in other open tabs.

**Solution:**  
- Enabled Supabase Realtime for the table  
- Subscribed to `postgres_changes` events  
- Updated React state on INSERT and DELETE  
- Properly cleaned up subscriptions to prevent duplicates  

---

### 🌐 4. Environment Variables Not Loading

**Challenge:**  
Supabase client failed because Next.js was not reading environment variables.

**Solution:**  
- Created `.env.local` in the root directory  
- Used `NEXT_PUBLIC_` prefix for public keys  
- Restarted the dev server after changes  
- Added `.env.local` to `.gitignore`  

---

### 🧭 5. Next.js App Router Confusion

**Challenge:**  
Mixing App Router with Pages Router examples caused routing and layout issues.

**Solution:**  
- Followed App Router structure strictly (`app/` directory)  
- Used `layout.tsx` and `page.tsx` correctly  
- Marked interactive components with `"use client"`  
- Referred to official documentation for App Router patterns  

---

### 🚀 6. Deployment Issues on Vercel

**Challenge:**  
Initial Vercel deployment failed due to missing environment variables and OAuth redirect mismatch.

**Solution:**  
- Added environment variables in Vercel dashboard  
- Updated Supabase redirect URL for production  
- Tested Google login in production  
- Fixed build errors and redeployed successfully  

---

### 🗑️ 7. UI Not Updating After Delete

**Challenge:**  
Deleted bookmarks were not immediately removed from the UI.

**Solution:**  
- Listened for DELETE events via realtime subscription  
- Implemented optimistic UI update  
- Synced local state after database change  

---

✅ **Result:**  
All features work correctly — secure auth, private bookmarks, realtime sync, delete functionality, and successful Vercel deployment.

---

## 📝 License
Created by **Catherin Raichal**.
