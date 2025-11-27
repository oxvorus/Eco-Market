# EcoMarket Quick Start Guide

Panduan cepat untuk memulai development atau deployment EcoMarket.

## 🚀 Development Setup (5 menit)

### 1. Prerequisites
- Node.js 18+
- npm atau pnpm
- Git

### 2. Installation

\`\`\`bash
# Clone repository
git clone https://github.com/yourusername/ecomarket.git
cd ecomarket

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Akses aplikasi di: **http://localhost:3000**

## 🧪 Default Test Credentials

### User Account
- Email: `test@example.com`
- Password: `password123`

### Admin Account
- Email: `admin@ecomarket.com`
- Password: `admin123`

## 📍 Quick Navigation

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/register` | Daftar user baru |
| `/login` | Login user |
| `/marketplace` | Lihat produk & cari |
| `/user/home` | Dashboard user (protected) |
| `/user/cart` | Keranjang belanja (protected) |
| `/user/checkout` | Checkout order (protected) |
| `/admin/login` | Login admin |
| `/admin/dashboard` | Admin dashboard (protected) |

## 🔧 Available Commands

\`\`\`bash
npm run dev       # Run development server
npm run build     # Build untuk production
npm run start     # Run production build
npm run lint      # Check linting errors
\`\`\`

## 🌐 Deploy ke Vercel (3 menit)

### Step 1: Push ke GitHub
\`\`\`bash
git add .
git commit -m "Deploy EcoMarket"
git push origin main
\`\`\`

### Step 2: Deploy
1. Buka https://vercel.com
2. Click "New Project"
3. Select repository
4. Click "Deploy"

### Step 3: Set Environment Variables
Di Vercel Dashboard → Settings → Environment Variables, tambahkan:

\`\`\`env
NODE_ENV=production
SESSION_SECRET=generate-new-random-key
\`\`\`

✅ Done! Aplikasi Anda live!

## 📝 File Structure

\`\`\`
ecomarket/
├── app/
│   ├── api/              # Backend API routes
│   ├── admin/            # Admin dashboard
│   ├── user/             # User dashboard
│   ├── marketplace/      # Marketplace pages
│   └── layout.tsx        # Root layout
├── components/           # React components
├── lib/                  # Utilities & hooks
├── public/               # Static assets
├── middleware.ts         # Auth middleware
└── package.json          # Dependencies
\`\`\`

## 🐛 Troubleshooting

### Port 3000 sudah digunakan
\`\`\`bash
npm run dev -- -p 3001  # Use different port
\`\`\`

### Module not found error
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Build failed
\`\`\`bash
npm run build -- --debug  # Show detailed errors
\`\`\`

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT-GUIDE.md)
- [API Documentation](docs/API.md)
- [Development Guide](docs/DEVELOPMENT.md)

## 💡 Tips

- Use `.env.local` untuk development, jangan commit ke git
- Pastikan NODE_ENV=development saat development
- Test build production: \`npm run build && npm run start\`

## 🆘 Need Help?

- Check issues di GitHub
- Read Next.js docs: https://nextjs.org
- Ask community: GitHub Discussions
