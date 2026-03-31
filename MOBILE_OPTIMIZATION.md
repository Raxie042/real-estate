# Mobile Optimization Guide

## Responsive Design Improvements

### ComparisonBar Mobile Enhancement

Update [ComparisonBar.tsx](frontend/components/ComparisonBar.tsx) for better mobile experience:

```tsx
// Show collapsible on mobile, fixed on desktop
{/* Mobile: Collapsible */}
<div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
  {properties.length > 0 && (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="w-full bg-white rounded-lg shadow-lg p-4 flex items-center justify-between"
    >
      <span className="font-semibold">{properties.length} properties selected</span>
      <ChevronUp className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
    </button>
  )}
  {isExpanded && <ComparisonList />}
</div>

{/* Desktop: Fixed bottom bar */}
<div className="hidden md:fixed md:bottom-0 md:left-0 md:right-0 md:z-40">
  <ComparisonList />
</div>
```

### Touch-Friendly Interactions

1. **Minimum Touch Target Size**: 48x48px
2. **Increased Padding**: Add more space around clickable elements on mobile
3. **Swipe Gestures**: Support for property card carousel on mobile

```tsx
// Example: Swipeable property carousel
'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TouchPosition {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export function SwipeableCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState<TouchPosition | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchPosition({
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchPosition) return;
    const touch = e.touches[0];
    setTouchPosition((prev) => ({
      ...prev!,
      currentX: touch.clientX,
      currentY: touch.clientY,
    }));
  };

  const handleTouchEnd = () => {
    if (!touchPosition) return;
    
    const deltaX = touchPosition.currentX - touchPosition.startX;
    const minSwipeDistance = 50;
    
    if (Math.abs(deltaX) < minSwipeDistance) return;
    
    if (deltaX > 0) {
      // Swiped right - go to previous
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else {
      // Swiped left - go to next
      setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
    }
    
    setTouchPosition(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="overflow-hidden"
    >
      {/* Carousel content */}
    </div>
  );
}
```

### Mobile-First Breakpoints

```css
/* Use these breakpoints in Tailwind */
sm: 640px   (mobile)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)

/* Examples */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  /* 1 col mobile, 2 tablet, 4 desktop */
px-4 md:px-8                                 /* 16px mobile, 32px desktop */
text-lg md:text-2xl                          /* Larger text on desktop */
```

## Performance Optimization

### Image Optimization

1. **Use Next.js Image Component**
```tsx
import Image from 'next/image';

<Image
  src="/property.jpg"
  alt="Property"
  width={400}
  height={300}
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={75}  // Lower quality on mobile
/>
```

2. **Responsive Image Sizes**
```tsx
sizes="(max-width: 640px) 100vw,
       (max-width: 1024px) 50vw,
       33vw"
```

3. **WebP Format**
```tsx
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="Property" />
</picture>
```

### Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const ChatInterface = dynamic(
  () => import('@/components/ChatBox'),
  { loading: () => <LoadingSpinner /> }
);
```

### Bundle Size Reduction

Run bundle analysis:
```bash
cd frontend
npm install --save-dev @next/bundle-analyzer
npm run analyze
```

## Mobile Navigation Improvements

### Simplified Navigation Menu

```tsx
// Mobile-optimized header
<header className="md:hidden">
  <div className="flex items-center justify-between p-4">
    <Logo />
    <MobileMenu />
  </div>
</header>
```

### Bottom Tab Navigation

```tsx
// Bottom navigation for mobile
<div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
  <nav className="flex justify-around">
    <NavLink href="/" icon={Home} label="Home" />
    <NavLink href="/search" icon={Search} label="Search" />
    <NavLink href="/profile" icon={User} label="Profile" />
  </nav>
</div>
```

## Touch Optimization Checklist

- [ ] Buttons/links minimum 48x48px tap target
- [ ] 16px minimum font size to prevent zoom on iOS
- [ ] Proper viewport meta tag set
- [ ] No hover-only interactions
- [ ] Double-tap to zoom disabled where appropriate
- [ ] Touch feedback/ripple effects
- [ ] Swipe gesture support for carousels
- [ ] Bottom sheet modals instead of center modals
- [ ] Sticky headers for easy navigation
- [ ] Loading skeletons while content loads

## Testing on Mobile Devices

### Chrome DevTools
```bash
# Open Chrome DevTools (F12)
1. Click device toolbar icon
2. Select "Responsive" or specific device
3. Test all breakpoints and orientations
```

### Real Device Testing Devices
- iPhone 12/13/14 (iOS)
- Samsung Galaxy S22 (Android)
- iPad Pro (tablet)

### Performance Testing
```bash
# Google Lighthouse
lighthouse https://yourdomain.com --view

# WebPageTest
# https://www.webpagetest.org/
```

### Mobile-Specific Issues to Check

1. **Viewport Meta Tag**
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

2. **Font Sizes**
- Body: 16px minimum
- Headings: 20px+ on mobile

3. **Form Fields**
```tsx
// Ensure proper input types for mobile keyboards
<input
  type="email"
  inputMode="email"
  className="md:text-lg text-base"
/>
```

4. **Loading States**
```tsx
// Show loading skeleton for network latency
{isLoading ? <PropertySkeleton /> : <PropertyCard />}
```

## Accessibility for Mobile

1. **Touch Feedback**
   - Visual feedback on tap
   - :active states work properly
   - Sufficient color contrast

2. **Screen Reader Support**
   - Semantic HTML
   - ARIA labels for mobile elements
   - Touch-friendly screen reader navigation

3. **Text Zoom**
   - Responsive font sizing
   - No fixed widths that break at 200% zoom

## Testing Checklist

### Orientation Changes
- [ ] App works in portrait
- [ ] App works in landscape
- [ ] Layout doesn't break
- [ ] Modals/forms are usable

### Network Conditions
- [ ] Works on 4G
- [ ] Works on 3G
- [ ] Graceful handling of offline
- [ ] Skeleton loaders while fetching

### Input Methods
- [ ] Works with touch
- [ ] Works with keyboard navigation
- [ ] Deep links work
- [ ] Back button works

### Battery & Data
- [ ] Images are optimized
- [ ] Unnecessary API calls prevented
- [ ] Background sync when possible
- [ ] No unnecessary animations on low-power devices

## Performance Targets for Mobile

| Metric | Target |
|--------|--------|
| Time to Interactive (TTI) | < 5s |
| First Contentful Paint (FCP) | < 1.8s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| First Input Delay (FID) | < 100ms |

## Common Mobile Issues & Solutions

### Issue: Text too small on mobile
```tsx
// Solution: Use responsive text
<h1 className="text-2xl md:text-4xl">
```

### Issue: Images not loading on slow connection
```tsx
// Solution: Use placeholder/skeleton
<Image
  placeholder="blur"
  blurDataURL={blurredImageUrl}
/>
```

### Issue: Modals not fullscreen on mobile
```tsx
// Solution: Make modals responsive
<dialog className="w-full md:w-96 h-screen md:h-auto">
```

### Issue: Form inputs hard to use
```tsx
// Solution: Use appropriate input types
<input
  type="tel"              // for phone numbers
  inputMode="numeric"     // for numbers
  autoComplete="off"      // prevent autocomplete
/>
```
