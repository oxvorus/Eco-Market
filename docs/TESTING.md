# Testing Guide

## 🧪 Testing Strategy

### Manual Testing Checklist

#### Auth Flow
- [ ] Register with new email
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Logout redirects to login page
- [ ] Protected routes redirect to login when logged out

#### Marketplace
- [ ] List all products
- [ ] Search products by keyword
- [ ] Filter by category
- [ ] Filter by price range
- [ ] Sort by price/rating/newest
- [ ] View product detail page
- [ ] Product images load correctly

#### Shopping Flow
- [ ] Add product to cart
- [ ] Update cart quantity
- [ ] Remove from cart
- [ ] View cart total calculation
- [ ] Proceed to checkout
- [ ] Select payment method
- [ ] Complete order
- [ ] Order appears in order history

#### User Dashboard
- [ ] View profile
- [ ] Edit profile
- [ ] View order history
- [ ] View favorites
- [ ] Add/remove favorites
- [ ] View notifications

#### Admin Dashboard
- [ ] Login as admin
- [ ] View dashboard stats
- [ ] View products pending approval
- [ ] Approve product
- [ ] Reject product
- [ ] View user list
- [ ] View analytics

### Testing Tools Setup

#### Playwright (Recommended)

\`\`\`bash
npm install --save-dev @playwright/test

# Create test file
mkdir -p tests/e2e
\`\`\`

\`\`\`typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('user can register and login', async ({ page }) => {
  // Register
  await page.goto('http://localhost:3000/register')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  // Should redirect to login
  await expect(page).toHaveURL('http://localhost:3000/login')
  
  // Login
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  // Should redirect to home
  await expect(page).toHaveURL('http://localhost:3000/user/home')
})
\`\`\`

#### Vitest (Unit Testing)

\`\`\`bash
npm install --save-dev vitest @testing-library/react
\`\`\`

\`\`\`typescript
// lib/__tests__/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatPrice } from '@/lib/utils'

describe('formatPrice', () => {
  it('formats price correctly', () => {
    expect(formatPrice(25000)).toBe('Rp 25.000')
  })
})
\`\`\`

## 🔍 Testing Commands

\`\`\`bash
# Run all tests
npm run test

# Watch mode
npm run test -- --watch

# With coverage
npm run test -- --coverage

# E2E tests
npx playwright test
\`\`\`

## 🐛 Debugging

### Browser DevTools
1. Press F12 to open DevTools
2. Check Console tab for errors
3. Use Sources tab to set breakpoints
4. Use Network tab to inspect API calls

### VS Code Debugger

\`\`\`json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "program": "\${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal"
    }
  ]
}
\`\`\`

## 📋 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Module not found" | Clear node_modules: \`rm -rf node_modules && npm install\` |
| "Port 3000 in use" | Kill process: \`lsof -ti:3000 \| xargs kill -9\` |
| "Build fails" | Check console for errors, ensure all imports exist |
| "Auth not working" | Verify cookies enabled, check SESSION_SECRET |
\`\`\`
