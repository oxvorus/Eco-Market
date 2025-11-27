# Troubleshooting Guide

## Common Issues & Solutions

### 🔴 Build Issues

#### "npm ERR! code ERESOLVE"

\`\`\`bash
# Solution: Use legacy peer dependencies
npm install --legacy-peer-deps

# Or delete lock file and reinstall
rm -rf package-lock.json node_modules
npm install
\`\`\`

#### "Build failed: Module not found"

\`\`\`bash
# Clear Next.js cache
rm -rf .next

# Reinstall and rebuild
npm install
npm run build
\`\`\`

### 🔴 Runtime Issues

#### "Cannot find module '@/lib/...'

Check:
1. File path is correct
2. Path alias in \`tsconfig.json\` matches import
3. File actually exists

\`\`\`typescript
// tsconfig.json
"paths": {
  "@/*": ["./*"]
}
\`\`\`

#### "auth_token not set / Login always redirects"

Check:
1. \`SESSION_SECRET\` is set in \`.env.local\`
2. Cookies are enabled in browser
3. Middleware is configured in \`middleware.ts\`
4. Login API response includes Set-Cookie header

\`\`\`bash
# Debug: Check cookies
# In browser DevTools > Application > Cookies
\`\`\`

#### "API endpoints return 404"

Check:
1. Route file exists at correct path
2. Method (GET/POST/DELETE) is correct
3. File is named \`route.ts\` (not \`route.js\`)
4. No typos in URL

### 🔴 Styling Issues

#### Tailwind styles not applying

\`\`\`bash
# Rebuild Tailwind
npm run dev

# Clear PostCSS cache
rm -rf .next
npm run dev
\`\`\`

#### Dark mode not working

Check:
1. \`ThemeProvider\` is in layout.tsx
2. \`dark\` class is applied to html element
3. Color tokens defined in globals.css

### 🔴 Database Issues

#### "Cannot connect to database"

Check:
1. \`DATABASE_URL\` is set
2. Database server is running
3. Credentials are correct

\`\`\`bash
# Test connection
npx ts-node lib/db/seed.ts
\`\``

### 🔴 Deployment Issues

#### "Deployment fails on Vercel"

Check logs:
1. \`vercel logs [project-name]\`
2. All environment variables are set
3. No build warnings/errors
4. Node version compatibility

\`\`\`bash
# Test build locally
npm run build
npm run start
\`\`\`

#### "404 Not Found after deploy"

Check:
1. Routes are correct
2. API endpoints are accessible
3. Middleware config is correct

## 🔧 Quick Debug Commands

\`\`\`bash
# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list

# Show hidden files (including .env)
ls -la

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Check environment variables
echo $NODE_ENV
\`\``

## 📞 Getting Help

1. **Check logs**: \`npm run dev\` output or browser console
2. **Search issues**: GitHub Issues page
3. **Ask community**: GitHub Discussions
4. **Read docs**: Next.js documentation
\`\`\`
