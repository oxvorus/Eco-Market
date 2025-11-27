# Performance Optimization Guide

## 📊 Current Performance Metrics

- **Lighthouse Score**: Target 90+
- **First Contentful Paint (FCP)**: < 2s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

## 🚀 Optimization Techniques

### 1. Image Optimization

\`\`\`typescript
// ✅ Good: Use Next.js Image component
import Image from 'next/image'

<Image 
  src="/product.jpg" 
  alt="Product" 
  width={400} 
  height={300}
  priority // For LCP images
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// ❌ Bad: Use HTML img tag
<img src="/product.jpg" alt="Product" />
\`\`\`

### 2. Code Splitting

\`\`\`typescript
// ✅ Good: Dynamic import for heavy components
import dynamic from 'next/dynamic'
const AdminChart = dynamic(() => import('@/components/admin-chart'), {
  loading: () => <Skeleton />,
  ssr: false
})

// ❌ Bad: Import large component at top
import AdminChart from '@/components/admin-chart'
\`\`\`

### 3. API Caching

\`\`\`typescript
// ✅ Good: Use SWR with cache revalidation
import useSWR from 'swr'

export function useProducts() {
  const { data, isLoading } = useSWR('/api/products', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000 // 1 minute
  })
  return { data, isLoading }
}

// ❌ Bad: Fetch without caching
useEffect(() => {
  fetch('/api/products')
}, [])
\`\`\`

### 4. Minimize JavaScript

\`\`\`typescript
// ✅ Good: Use server components when possible
export default function ProductList() {
  // Data fetching on server
}

// Use client only for interactivity
'use client'
export function AddToCart() {
  return <button>Add</button>
}

// ❌ Bad: All components as client components
'use client'
export default function App() {
  // Everything runs on client
}
\`\`\`

### 5. CSS Optimization

\`\`\`tailwind
/* ✅ Good: Use Tailwind classes */
<div className="p-4 bg-white rounded-lg shadow-md">

/* ❌ Bad: Use inline styles */
<div style={{padding: '16px', backgroundColor: 'white'}}>
\`\`\`

## 🔍 Monitoring Tools

### Vercel Analytics
- Built-in Web Vitals tracking
- Real user monitoring

### Lighthouse CI
\`\`\`bash
npm install -g @lhci/cli@latest

lhci autorun
\`\`\`

### Bundle Analyzer
\`\`\`bash
npm install --save-dev @next/bundle-analyzer

# Update next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# Run
ANALYZE=true npm run build
\`\`\`

## 🎯 Performance Checklist

- [ ] Images optimized (WebP, appropriate sizes)
- [ ] Unused CSS removed
- [ ] JavaScript minified
- [ ] API calls cached
- [ ] Database queries optimized
- [ ] CDN configured
- [ ] Gzip compression enabled
- [ ] Third-party scripts deferred
- [ ] Critical CSS inlined

## 📈 Loading Strategy

| Priority | Strategy | Example |
|----------|----------|---------|
| Critical | Inline/Preload | Fonts, hero image |
| High | Eager | Main content |
| Medium | Lazy | Below-fold images |
| Low | Defer | Analytics, ads |

## 🔗 Resources

- [Web.dev: Performance](https://web.dev/performance/)
- [Next.js: Optimization](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Lighthouse: Best Practices](https://developers.google.com/web/tools/lighthouse)
\`\`\`
