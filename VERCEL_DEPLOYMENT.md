# 🚀 How to Deploy Alazar Portfolio on Vercel

This repository is fully configured for seamless, zero-config deployment on **Vercel** with a unified Vite React frontend and Express serverless backend API.

---

## 📋 Prerequisites

1. A **Vercel Account** ([vercel.com](https://vercel.com))
2. (Optional but Recommended) A cloud PostgreSQL database like **[Neon](https://neon.tech)**, **[Supabase](https://supabase.com)**, or **[Render](https://render.com)**.
   * *Note: If no database is connected, the app runs automatically with resilient built-in memory storage.*

---

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub / GitLab / Bitbucket**:
   ```bash
   git add .
   git commit -m "Configure Vercel deployment"
   git push origin main
   ```

2. **Import Project into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your repository (`Alazar-Portfolio`).

3. **Configure Project Settings**:
   - **Framework Preset**: `Vite` (or `Other`)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/dist`

4. **Environment Variables**:
   In Vercel Project Settings -> **Environment Variables**, add:

   | Variable | Value / Description | Required? |
   | :--- | :--- | :--- |
   | `DATABASE_URL` | `postgresql://user:password@ep-xyz.neon.tech/alazar_portfolio?sslmode=require` | Optional (Uses Memory Fallback if omitted) |
   | `JWT_SECRET` | A secure random secret string (e.g. `your_super_secret_jwt_key`) | Required for Admin Login |
   | `CLIENT_URL` | Your deployment URL (e.g. `https://alazar-portfolio.vercel.app`) | Optional |
   | `NODE_ENV` | `production` | Recommended |

5. **Click Deploy** 🎉!
   - Vercel will build the frontend into `frontend/dist` and bundle `/api/index.js` as an Express serverless API.

---

## Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## 🛠️ Architecture & Verification Details

- **Frontend static files**: Built with Vite and served from `frontend/dist`.
- **Serverless API**: Handled by Express inside `api/index.js` via `/api/*` rewrites.
- **SPA Routing**: Non-API requests are redirected to `index.html` for React Router navigation.
- **Admin CMS Credentials**: Default admin username and password from seed script can be used to log into `/admin`.
