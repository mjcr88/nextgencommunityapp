# Performance Considerations

## Overview

**Philosophy**: Speed is a feature. Performance directly impacts user experience, especially in a mobile-first platform used in rural Costa Rica where internet connectivity may be limited. Every millisecond of delay reduces engagement and trust.

**Target**: The app should feel instant, even on 3G connections and low-end devices.

---

## Performance Goals & Budgets

### Core Web Vitals Targets

**Largest Contentful Paint (LCP)** - ⭐ Primary metric for loading performance
- **Target**: < 2.5 seconds
- **Acceptable**: 2.5 - 4.0 seconds
- **Poor**: > 4.0 seconds
- **Measure**: Time until main content is visible

**First Input Delay (FID)** - Interactivity
- **Target**: < 100ms
- **Acceptable**: 100 - 300ms
- **Poor**: > 300ms
- **Measure**: Time until app responds to first interaction

**Cumulative Layout Shift (CLS)** - Visual stability
- **Target**: < 0.1
- **Acceptable**: 0.1 - 0.25
- **Poor**: > 0.25
- **Measure**: How much content shifts during loading

**Interaction to Next Paint (INP)** - Responsiveness
- **Target**: < 200ms
- **Acceptable**: 200 - 500ms
- **Poor**: > 500ms
- **Measure**: All user interactions throughout session

### Additional Performance Metrics

**Time to Interactive (TTI)**:
- **Target**: < 3.5 seconds (on 3G)
- **Target**: < 2.0 seconds (on 4G/WiFi)

**Total Blocking Time (TBT)**:
- **Target**: < 200ms

**Speed Index**:
- **Target**: < 3.0 seconds

**Bundle Size Budgets**:
- **Initial JS**: < 200 KB (gzipped)
- **Initial CSS**: < 50 KB (gzipped)
- **Total initial load**: < 350 KB (gzipped)
- **Per route JS**: < 100 KB (gzipped)

**Image Budgets**:
- **Hero images**: < 150 KB
- **Thumbnail images**: < 20 KB
- **Avatar images**: < 10 KB
- **Total images per page**: < 500 KB

### Page-Specific Performance Targets

| Page | LCP Target | TTI Target | Bundle Size |
|------|-----------|-----------|-------------|
| Login | < 1.5s | < 2.0s | < 100 KB |
| Home Feed | < 2.0s | < 2.5s | < 150 KB |
| Map | < 2.5s | < 3.0s | < 200 KB (maps are heavy) |
| Calendar | < 2.0s | < 2.5s | < 150 KB |
| Exchange | < 2.0s | < 2.5s | < 150 KB |
| Profile | < 1.8s | < 2.3s | < 120 KB |

---

## Loading Strategies

### 1. Skeleton Screens (Primary Strategy)

**Principle**: Show layout immediately while content loads. Morphs into real content when ready.

**Implementation**:
```tsx
// Home Feed
{isLoading ? (
  <>
    <Skeleton className="h-32 w-full mb-4" /> {/* Action card */}
    <Skeleton className="h-24 w-full mb-4" /> {/* Update */}
    <Skeleton className="h-40 w-full mb-4" /> {/* Feed item */}
    <Skeleton className="h-40 w-full mb-4" />
  </>
) : (
  <FadeIn duration={200}>
    <HomeFeedContent data={feedData} />
  </FadeIn>
)}
```

**Where to use**:
- Home feed items
- Calendar events
- Exchange listings
- Profile cards
- Map location details
- Any content > 500ms load time

**Design Requirements**:
- Match actual content dimensions
- Use Cloud (#F8F6F3) background
- Subtle shimmer animation (2s loop)
- Smooth morph to real content (200ms crossfade)

### 2. Progressive Loading

**Strategy**: Load critical content first, defer non-critical.

**Priority Levels**:

**Critical (Load immediately)**:
- Navigation (bottom tabs)
- Screen header
- Primary content area skeleton
- Core authentication check

**High Priority (Load in first 1s)**:
- First 3-5 feed items
- User's own data (check-ins, events, listings)
- Immediate viewport content

**Medium Priority (Load in first 2s)**:
- Below-the-fold content
- Images (lazy load)
- Secondary features
- Analytics

**Low Priority (Load when idle)**:
- Prefetch next routes
- Image preloading
- Background data sync
- Non-critical tracking

**Implementation**:
```tsx
// Use React.lazy for route splitting
const Calendar = lazy(() => import('./pages/Calendar'))
const Exchange = lazy(() => import('./pages/Exchange'))

// Wrap in Suspense
<Suspense fallback={<PageSkeleton />}>
  <Calendar />
</Suspense>
```

### 3. Code Splitting

**By Route**:
```
/login        → 80 KB
/home         → 120 KB
/map          → 180 KB (includes map library)
/calendar     → 100 KB
/exchange     → 110 KB
/ai-assistant → 90 KB
/admin/*      → 150 KB (admin-only code)
```

**By Feature**:
- Auth flow: Separate bundle
- Map components: Lazy load when Map tab accessed
- Rich text editor: Load on demand (event creation)
- Image cropper: Load on demand (profile photo)
- Chart libraries: Load only in admin

**Shared Chunks**:
- Common components (buttons, inputs, cards)
- Utility functions (date formatting, validation)
- shadcn/ui components used across routes
- Icon library (Lucide) - tree-shaken to used icons only

### 4. Lazy Loading

**Images**:
```tsx
<img
  src={imageUrl}
  loading="lazy"
  decoding="async"
  alt={description}
  width={width}
  height={height} // Prevent layout shift
/>
```

**Components**:
```tsx
// Heavy components loaded on interaction
const PhotoGallery = lazy(() => import('./PhotoGallery'))

// Render only when needed
{showGallery && (
  <Suspense fallback={<Spinner />}>
    <PhotoGallery images={images} />
  </Suspense>
)}
```

**Data**:
```tsx
// Infinite scroll with pagination
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['feed'],
  queryFn: ({ pageParam = 0 }) => fetchFeed(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
})

// Load more when scrolling near bottom
useEffect(() => {
  if (inView && hasNextPage) {
    fetchNextPage()
  }
}, [inView])
```

---

## Image Optimization

### Format Strategy

**Modern Formats (Primary)**:
- **WebP**: 25-35% smaller than JPEG
- **AVIF**: 50% smaller than JPEG (if supported)
- **Fallback**: JPEG/PNG for older browsers

**Implementation**:
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### Size Breakpoints

**Responsive Images**:
```tsx
<img
  srcset="
    image-400w.webp 400w,
    image-800w.webp 800w,
    image-1200w.webp 1200w
  "
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  src="image-800w.webp"
  alt="Description"
/>
```

**Standard Sizes**:
- **Thumbnail**: 100x100px, < 10 KB
- **Avatar**: 120x120px, < 10 KB
- **Card image**: 400x300px, < 50 KB
- **Detail image**: 800x600px, < 100 KB
- **Hero image**: 1200x675px, < 150 KB

### Compression

**Targets**:
- JPEG: 80% quality (good balance)
- WebP: 75% quality (visually lossless)
- PNG: TinyPNG or pngquant compression
- SVG: SVGO optimization

**Tools**:
- ImageOptim (Mac)
- Squoosh (web-based)
- Sharp (server-side Node.js)
- Next.js Image Optimization (automatic)

### Image Loading Techniques

**Blur Placeholder**:
```tsx
<Image
  src={highResImage}
  placeholder="blur"
  blurDataURL={base64TinyImage} // 10px width preview
  alt="Description"
/>
```

**Progressive JPEG**:
- Show low-quality version immediately
- Progressive enhancement as data loads
- Better perceived performance

**Lazy Loading with Intersection Observer**:
```tsx
const { ref, inView } = useInView({
  triggerOnce: true,
  threshold: 0.1,
})

<div ref={ref}>
  {inView ? (
    <img src={image} alt="Description" />
  ) : (
    <Skeleton className="h-40 w-full" />
  )}
</div>
```

---

## Caching Strategies

### Service Worker Caching

**Cache-First Strategy** (Static assets):
```javascript
// Cache CSS, JS, fonts immediately
workbox.routing.registerRoute(
  /\.(?:js|css|woff2)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'static-assets',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
)
```

**Network-First Strategy** (Dynamic content):
```javascript
// API calls - network first, fallback to cache
workbox.routing.registerRoute(
  /\/api\/.*/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  })
)
```

**Stale-While-Revalidate** (Images):
```javascript
// Show cached image, update in background
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|webp|avif|svg)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
)
```

### Browser Caching (Cache-Control Headers)

**Static Assets** (immutable):
```
Cache-Control: public, max-age=31536000, immutable
```

**HTML**:
```
Cache-Control: no-cache, must-revalidate
```

**API Responses**:
```
Cache-Control: private, max-age=300 // 5 minutes
```

**User-Generated Content**:
```
Cache-Control: private, max-age=3600 // 1 hour
```

### Application-Level Caching

**React Query (TanStack Query)** - Primary data caching:
```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Example query
const { data } = useQuery({
  queryKey: ['events'],
  queryFn: fetchEvents,
  staleTime: 2 * 60 * 1000, // 2 minutes for events
})
```

**Cache Invalidation Strategy**:
```tsx
// Invalidate after mutation
const mutation = useMutation({
  mutationFn: createEvent,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['events'] })
  },
})
```

**Optimistic Updates**:
```tsx
// Update UI immediately, rollback on error
const mutation = useMutation({
  mutationFn: updateProfile,
  onMutate: async (newProfile) => {
    await queryClient.cancelQueries({ queryKey: ['profile'] })
    const previousProfile = queryClient.getQueryData(['profile'])
    queryClient.setQueryData(['profile'], newProfile)
    return { previousProfile }
  },
  onError: (err, newProfile, context) => {
    queryClient.setQueryData(['profile'], context.previousProfile)
  },
})
```

---

## Offline Capabilities

### What Works Offline

**✅ Available Offline**:
- View cached feed items (last 20 items)
- View cached calendar events (next 7 days)
- View cached exchange listings
- View own profile
- Browse cached map data
- Read previous AI chat conversations
- View cached notifications

**📝 Queue for Sync** (when reconnected):
- Create check-in
- RSVP to events
- Create exchange request
- Edit profile
- Post comments (future feature)

**❌ Requires Connection**:
- Real-time check-ins on map
- New feed items
- Search (API required)
- Image uploads
- AI chat (new queries)
- Admin functions

### Offline Detection & UI

**Connection Status**:
```tsx
const [isOnline, setIsOnline] = useState(navigator.onLine)

useEffect(() => {
  const handleOnline = () => setIsOnline(true)
  const handleOffline = () => setIsOnline(false)
  
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
  
  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}, [])
```

**Offline Banner**:
```tsx
{!isOnline && (
  <OfflineBanner>
    Offline - Showing cached content from {lastSync}
  </OfflineBanner>
)}
```

**Offline Indicators**:
- Gray WiFi icon in top bar
- "Offline" badge on affected features
- Disabled state for online-only actions
- Helpful messages: "Connect to refresh"

### Background Sync

**Queue Failed Requests**:
```javascript
// Register background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-queue') {
    event.waitUntil(syncQueuedRequests())
  }
})

// Queue request when offline
if (!navigator.onLine) {
  await queueRequest(url, method, data)
  await registration.sync.register('sync-queue')
}
```

**User Feedback**:
```
Toast: "You're offline. This will post when you reconnect."
Status: "Queued for sync"
Icon: Cloud with arrow (syncing)
```

---

## Performance Monitoring

### Real User Monitoring (RUM)

**Metrics to Track**:
- Core Web Vitals (LCP, FID, CLS, INP)
- Time to First Byte (TTFB)
- Route transition times
- API response times
- Error rates
- JavaScript errors

**Tools**:
- **Web Vitals Library**: Measure Core Web Vitals
- **Vercel Analytics**: Automatic RUM (if using Vercel)
- **Google Analytics 4**: Custom events + metrics
- **Sentry**: Error tracking + performance

**Implementation**:
```tsx
import { getCLS, getFID, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics({ name, value, id }) {
  analytics.track('Web Vital', {
    metric: name,
    value: Math.round(value),
    id,
  })
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

### Performance Budgets in CI/CD

**Lighthouse CI**:
```yaml
# lighthouse-ci.yml
ci:
  collect:
    numberOfRuns: 3
  assert:
    assertions:
      first-contentful-paint: ['error', { maxNumericValue: 2000 }]
      largest-contentful-paint: ['error', { maxNumericValue: 2500 }]
      cumulative-layout-shift: ['error', { maxNumericValue: 0.1 }]
      total-blocking-time: ['error', { maxNumericValue: 200 }]
  upload:
    target: 'temporary-public-storage'
```

**Bundle Size Monitoring**:
```json
// bundlesize.json
{
  "files": [
    {
      "path": "dist/main-*.js",
      "maxSize": "200 KB"
    },
    {
      "path": "dist/vendor-*.js",
      "maxSize": "150 KB"
    }
  ]
}
```

**Fail builds if budgets exceeded**:
- Block deployment if bundle > target
- Alert team in Slack/Discord
- Require manual override with justification

### Field Monitoring Dashboards

**Key Metrics Dashboard**:
```
┌─────────────────────────────────────┐
│ Performance Overview (Last 24h)     │
├─────────────────────────────────────┤
│ LCP:       2.1s  ✅ (target: <2.5s) │
│ FID:       85ms  ✅ (target: <100ms)│
│ CLS:       0.05  ✅ (target: <0.1)  │
│ INP:       180ms ✅ (target: <200ms)│
├─────────────────────────────────────┤
│ Page Load Times                     │
│ Home:      1.8s                     │
│ Map:       2.3s                     │
│ Calendar:  1.9s                     │
├─────────────────────────────────────┤
│ Errors (Last Hour)                  │
│ JS Errors: 3                        │
│ API Fails: 12                       │
└─────────────────────────────────────┘
```

---

## Mobile-First Optimization

### Network Conditions

**Test on Real Conditions**:
- **Fast 3G**: 1.6 Mbps down, 750 Kbps up, 150ms RTT
- **Slow 3G**: 400 Kbps down, 400 Kbps up, 400ms RTT
- **4G**: 4 Mbps down, 3 Mbps up, 20ms RTT

**Chrome DevTools Network Throttling**:
- Use "Slow 3G" preset for testing
- Test every feature on throttled connection
- Ensure skeleton screens appear < 500ms
- No timeouts before 10 seconds

### Device Considerations

**Low-End Devices**:
- Reduce animations (fewer particles, simpler transitions)
- Limit concurrent animations (max 3 at once)
- Debounce scroll handlers (16ms minimum)
- Reduce image quality on low memory devices

**Battery Optimization**:
- Pause animations when battery < 20%
- Reduce refresh frequency on low battery
- Disable background sync when battery saver enabled
- Stop ambient animations (breathing buttons) on low battery

**Memory Management**:
```tsx
// Cleanup on unmount
useEffect(() => {
  const subscription = dataStream.subscribe(handleData)
  
  return () => {
    subscription.unsubscribe()
  }
}, [])

// Cancel requests on unmount
useEffect(() => {
  const controller = new AbortController()
  
  fetch(url, { signal: controller.signal })
  
  return () => controller.abort()
}, [])
```

---

## Quick Wins - Immediate Optimizations

**Easy Performance Improvements**:

1. **Enable Brotli/Gzip Compression**
   - Reduces bundle size 70-80%
   - Configure on server/CDN

2. **Add `rel="preconnect"` for External Resources**:
   ```html
   <link rel="preconnect" href="https://api.ecovilla.app">
   <link rel="dns-prefetch" href="https://cdn.ecovilla.app">
   ```

3. **Lazy Load Images**:
   ```html
   <img loading="lazy" src="..." alt="...">
   ```

4. **Add Width/Height to Images**:
   ```html
   <img width="400" height="300" src="..." alt="...">
   ```
   Prevents layout shift

5. **Preload Critical Assets**:
   ```html
   <link rel="preload" href="/fonts/inter.woff2" as="font" crossorigin>
   ```

6. **Use CDN for Static Assets**:
   - Images, fonts, CSS, JS
   - Geographic distribution
   - Edge caching

7. **Minify CSS/JS**:
   - Automatic with Vite/Next.js
   - Remove comments, whitespace
   - Tree-shake unused code

8. **Defer Non-Critical JavaScript**:
   ```html
   <script src="analytics.js" defer></script>
   ```

9. **Remove Unused CSS**:
   - PurgeCSS with Tailwind
   - Only ship used utility classes

10. **Optimize Third-Party Scripts**:
    - Load analytics async
    - Defer social widgets
    - Self-host Google Fonts

---

## Performance Testing Workflow

**Before Every Release**:

1. **Run Lighthouse Audit** (Desktop + Mobile)
   - Target: All scores > 90
   - Review recommendations

2. **Test on Real Devices**:
   - Mid-range Android (Samsung Galaxy A series)
   - iPhone SE (older, slower iOS device)
   - Slow 3G network simulation

3. **Check Bundle Sizes**:
   - Run `npm run analyze`
   - Review source map analyzer
   - Identify large dependencies

4. **Validate Core User Flows**:
   - Time each critical path
   - Home → Check-in: < 5 seconds total
   - Login → Home: < 3 seconds total
   - Search → Results: < 2 seconds total

5. **Monitor for Regressions**:
   - Compare to previous release
   - Alert if metrics degrade > 10%
   - Investigate and fix before deploying

---

## Performance Checklist

Before considering a feature "done":

- [ ] Lighthouse score > 90 (mobile)
- [ ] LCP < 2.5 seconds
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Skeleton screens for loading states
- [ ] Images lazy loaded and optimized
- [ ] Code split by route
- [ ] Tested on slow 3G
- [ ] Tested on low-end device
- [ ] No memory leaks (cleanup on unmount)
- [ ] Caching strategy implemented
- [ ] Error boundaries in place
- [ ] Offline behavior defined
- [ ] Bundle size within budget
- [ ] Animations respect reduced motion

---
