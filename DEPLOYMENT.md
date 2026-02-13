# Deployment Instructions

This project is built with **Next.js (App Router)** and **Supabase**.

## Prerequisites
1. A [Supabase](https://supabase.com) account.
2. A [Vercel](https://vercel.com) account (for deployment).
3. [Node.js](https://nodejs.org/) installed locally.

## 1. Supabase Setup

1. Create a new Supabase project.
2. Go to the **SQL Editor** in the Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` and run it. This will create the `bookmarks` table and enable Row Level Security (RLS) & Realtime.
4. Go to **Project Settings > API**.
   - Copy the `Project URL` and `anon public` key.
5. Go to **Authentication > Providers > Google**.
   - Enable "Google".
   - You will need a Google Cloud Project with OAuth credentials.
   - Set the **Authorized Request URI** (callback URL) in Google Cloud Console to:
     - Local: `http://localhost:3000/auth/callback`
     - Production: `https://your-vercel-project.vercel.app/auth/callback`
   - Copy the `Client ID` and `Client Secret` from Google into Supabase.
   - **Important**: In Supabase (Auth > URL Configuration), add your production URL to "Redirect URLs".

## 2. Local Development

1. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000).

## 3. Deployment to Vercel

1. Push your code to a GitHub repository.
2. Log in to Vercel and "Add New Project".
3. Import your repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**.
6. Once deployed, get the production URL (e.g., `https://bookmark-manager-xyz.vercel.app`).
7. **Update Supabase Auth Settings**:
   - Go back to Supabase > Authentication > URL Configuration.
   - Add your new Vercel URL to the "Site URL" and "Redirect URLs".
   - Update the Google Cloud Console "Authorized redirect URIs" to include `https://your-vercel-domain/auth/callback`.

## Verification

- **Login**: Use the "Continue with Google" button.
- **Add Bookmark**: Enter a title and URL. It should appear instantly.
- **Delete Bookmark**: Click delete. It should disappear globally (checking realtime).
- **Security Check**: Open a specialized browser or incognito window. You should be redirected to login if you try to access `/dashboard`.
