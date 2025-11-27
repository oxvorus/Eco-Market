# Panduan Deployment EcoMarket

Dokumen lengkap untuk deploy EcoMarket ke production dengan berbagai platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ dan npm/pnpm
- Git
- GitHub account (untuk Vercel)

### 1. Setup Lokal untuk Testing

\`\`\`bash
# Clone atau download project
git clone <your-repo-url>
cd ecomarket

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local dengan konfigurasi lokal Anda
# Minimal perlu:
# - SESSION_SECRET (generate: openssl rand -base64 32)
# - NODE_ENV=development

# Run development server
npm run dev

# Akses: http://localhost:3000
\`\`\`

### 2. Testing Sebelum Deploy

\`\`\`bash
# Test build production
npm run build
npm run start

# Test semua flow:
# - Register: http://localhost:3000/register
# - Login: http://localhost:3000/login (test@example.com / password123)
# - Marketplace: http://localhost:3000/marketplace
# - Admin: http://localhost:3000/admin/login (admin@ecomarket.com / admin123)
\`\`\`

## 🎯 Deploy ke Vercel (RECOMMENDED)

### Step 1: Push ke GitHub

\`\`\`bash
# Initialize git (jika belum)
git init
git add .
git commit -m "Initial commit: EcoMarket production ready"

# Add remote dan push
git remote add origin https://github.com/yourusername/ecomarket.git
git branch -M main
git push -u origin main
\`\`\`

### Step 2: Deploy di Vercel

1. Buka https://vercel.com
2. Klik "New Project"
3. Import repository GitHub Anda
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. Set Environment Variables:

\`\`\`env
# Production Environment Variables
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api
NODE_ENV=production
SESSION_SECRET=<generate-new-random-key>
ADMIN_EMAIL=admin@ecomarket.com
ADMIN_PASSWORD=admin123
\`\`\`

6. Klik "Deploy"
7. Tunggu build selesai (~3-5 menit)

### Step 3: Custom Domain (Optional)

1. Di Vercel Dashboard → Project Settings → Domains
2. Add custom domain (contoh: ecomarket.com)
3. Update DNS records sesuai instruksi Vercel

## 🐳 Deploy ke Docker + Cloud Platform

### Docker Build

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

\`\`\`bash
# Build image
docker build -t ecomarket:latest .

# Run container lokal
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e SESSION_SECRET=your-secret \
  ecomarket:latest
\`\`\`

### Deploy ke Railway.app

\`\`\`bash
# 1. Push ke GitHub (jika belum)
# 2. Buka https://railway.app
# 3. Klik "New Project" → "Deploy from GitHub repo"
# 4. Select repository
# 5. Railway auto-detect Next.js
# 6. Set environment variables di Railway dashboard
# 7. Deploy
\`\`\`

### Deploy ke Render

\`\`\`bash
# Pastikan ada .dockerignore dan dockerfile
# 1. Buka https://render.com
# 2. New → Web Service
# 3. Connect GitHub repository
# 4. Fill form:
#    - Name: ecomarket
#    - Environment: Node
#    - Build Command: npm run build
#    - Start Command: npm start
# 5. Add environment variables
# 6. Create Web Service
\`\`\`

## 🔒 Security Checklist

- [ ] Generate unique SESSION_SECRET (min 32 chars)
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS (auto di Vercel)
- [ ] Configure CORS headers (di vercel.json)
- [ ] Rotate admin credentials sebelum launch
- [ ] Setup monitoring/alerts
- [ ] Enable rate limiting di API routes
- [ ] Setup error tracking (Sentry/Rollbar)

## 📊 Post-Deployment Checklist

\`\`\`bash
# Verify deployment
curl https://your-domain.vercel.app

# Test API
curl https://your-domain.vercel.app/api/products

# Test auth flow
# - Register user baru
# - Login
# - Add to cart
# - Checkout

# Check logs
vercel logs [project-name]
\`\`\`

## 🛠️ Environment Variables Reference

### Required (Production)
\`\`\`env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api
SESSION_SECRET=your-random-secret-32-chars-minimum
\`\`\`

### Recommended
\`\`\`env
ADMIN_EMAIL=admin@ecomarket.com
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_MODERATION=true
NEXT_PUBLIC_ENABLE_REVIEWS=true
\`\`\`

### Optional (Future Features)
\`\`\`env
# Email service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=app-specific-password

# Payment gateway
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# Analytics
NEXT_PUBLIC_GA_ID=G-xxxxxx
\`\`\`

## 🐛 Troubleshooting

### Build fails
\`\`\`bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
\`\`\`

### API not working
- Check NEXT_PUBLIC_API_URL environment variable
- Verify API routes exist di /app/api
- Check middleware auth token logic

### Performance issues
- Enable caching di vercel.json (sudah konfigurasi)
- Analyze bundle: `npm run build --analyze`
- Check Database query performance

## 📈 Monitoring & Maintenance

### Setup monitoring
1. Vercel Analytics (built-in)
2. Sentry untuk error tracking
3. Datadog untuk APM

### Regular maintenance
- Update dependencies: `npm update`
- Check security vulnerabilities: `npm audit`
- Monitor disk usage & logs
- Backup critical data

## 🆘 Support

- Docs: https://nextjs.org
- Vercel Docs: https://vercel.com/docs
- Issue Tracker: GitHub Issues
