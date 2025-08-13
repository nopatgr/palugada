# Company Profile – Next.js 15 Starter  
Modern, lightning-fast company profile & admin dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **Supabase PostgreSQL**.

## ⚡ Features  
| Feature | Status |
|---------|--------|
| Public services listing | ✅ |
| Admin login & dashboard | ✅ |
| Full CRUD services (add, edit, delete) | ✅ |
| Real-time UI refresh (no reload) | ✅ |
| Responsive design (Tailwind) | ✅ |
| Image upload for services | 🚧 |
| Gallery admin | 🚧 |
| SEO & meta tags | 🚧 |

## 🛠️ Tech Stack  
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS  
- **Backend:** Next.js API Routes (App Router)  
- **ORM/DB:** Prisma + Supabase PostgreSQL  
- **Auth:** NextAuth.js (admin only)  
- **Deployment:** Vercel (ready)

## 🚀 Quick Start
```bash
git clone <repo>
cd <repo>
npm install
cp .env.example .env.local   # isi DATABASE_URL & NEXTAUTH_SECRET
npx prisma db push
npx prisma db seed
npm run dev