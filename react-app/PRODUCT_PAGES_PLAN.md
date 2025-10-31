# AltorLab Product Pages - Implementation Plan

## Overview
This document outlines the architecture and implementation plan for adding 5 product pages to the AltorLab website, inspired by Profound and Cube design patterns.

## Design Analysis

### Reference Websites Analysis

#### 1. **Profound (tryprofound.com)** - For GEO Page
**Key Design Elements:**
- **Dark theme** with near-black backgrounds (#08090A, #030303)
- **Large, bold typography** with gradient text effects
- **Grid-based layout** with subtle border separators
- **Feature sections** with icon + title + description cards
- **Metrics/Stats displays** with large numbers and labels
- **Case study sections** with testimonials
- **Sticky navigation** with blur effect on scroll
- **Animated elements** on scroll (fade-in, slide-up)
- **Two-column layouts** for content + visual
- **CTA buttons** with primary (white) and secondary (outlined) variants

#### 2. **Cube (cubehq.ai)** - For Other 4 Products
**Key Design Elements:**
- **Dark gradient backgrounds** with subtle patterns
- **Clean, minimal sections** with ample white space
- **Feature cards** in grid layouts (2-3 columns)
- **Icon-based feature lists** with checkmarks
- **Video/GIF demonstrations** of product features
- **Simple hero sections** with headline + subheadline + CTA
- **Benefit-focused copy** with short, punchy statements
- **Tabbed or accordion sections** for feature details
- **Customer logos** and social proof
- **Single-column mobile-first** responsive design

#### 3. **Current AltorLab (altorlab.com)**
**Existing Style:**
- **Minimalist dark theme**
- **Large typography** with generous spacing
- **Simple, clean layout**
- **"Made with ❤️ In Silicon Valley" branding
- **Focus on clarity** over complexity

## Core Value Proposition
**"See how your website compares to competitors in your category. We categorize websites and show you exactly where you stand against your competition."**

## Product Pages Structure

### 1. GEO (Generative Engine Optimization) - Full Page
**Inspired by:** Profound
**Route:** `/products/geo`

**Page Sections:**
1. **Hero Section**
   - Large headline: "Dominate AI Search Results"
   - Subheadline: Core value proposition
   - Two CTAs: "Get Started" + "See Demo"
   - Background: Subtle gradient with animated elements

2. **Stats/Metrics Section**
   - 3-4 key metrics in large cards
   - Examples: "85% Visibility Increase", "10x More AI Citations", "Top 3 Rankings"
   - Animated counters on scroll

3. **How It Works Section**
   - 3-step process with icons
   - Visual flow diagram
   - Each step: Icon + Title + Description

4. **Features Grid**
   - 6 feature cards in 2x3 grid
   - Each card: Icon + Title + Short description
   - Features:
     - AI Content Optimization
     - Competitor Analysis
     - Real-time Ranking Tracking
     - Citation Monitoring
     - Content Recommendations
     - Performance Analytics

5. **Comparison Tool Section**
   - Interactive demo showing competitor comparison
   - Visual chart/graph
   - "See where you stand" CTA

6. **Case Study/Results**
   - Before/After metrics
   - Customer testimonial
   - Visual proof (charts, screenshots)

7. **Platform Coverage**
   - Logos of AI platforms covered
   - ChatGPT, Perplexity, Claude, Gemini, etc.

8. **Pricing Teaser**
   - Simple pricing cards or "Contact Sales"
   - Feature comparison table

9. **Final CTA**
   - Large, prominent section
   - "Start Optimizing for AI Search Today"
   - Form or calendar booking link

### 2. SEO (Search Engine Optimization) - Cube Style
**Route:** `/products/seo`

**Page Sections:**
1. **Hero**
   - "Rank #1 on Google"
   - Subheadline about competitor comparison
   - Single CTA

2. **Features (6 cards)**
   - ✓ Keyword Research & Strategy
   - ✓ Technical SEO Audits
   - ✓ Content Optimization
   - ✓ Backlink Analysis
   - ✓ Competitor Tracking
   - ✓ Rank Monitoring

3. **How We Compare**
   - Your site vs. competitors in your category
   - Visual ranking chart
   - Category-based analysis

4. **Results Section**
   - Customer success metrics
   - Simple stats display

5. **CTA**
   - "See Your Competitive Position"

### 3. AI Services - Cube Style
**Route:** `/products/ai-services`

**Page Sections:**
1. **Hero**
   - "AI Adoption Made Simple"
   - Subheadline about workflow automation
   - Single CTA

2. **Services Grid (6 cards)**
   - ✓ AI Strategy Consulting
   - ✓ Workflow Automation
   - ✓ Custom AI Solutions
   - ✓ Team Training
   - ✓ Integration Support
   - ✓ Ongoing Optimization

3. **Use Cases**
   - 3-4 common scenarios
   - Before/After comparisons

4. **Technology Stack**
   - Logos of AI tools we work with
   - OpenAI, Anthropic, Google, etc.

5. **CTA**
   - "Start Your AI Journey"

### 4. Paid Marketing - Cube Style
**Route:** `/products/paid-marketing`

**Page Sections:**
1. **Hero**
   - "Maximize Your Ad ROI"
   - Subheadline about competitive analysis
   - Single CTA

2. **Features (6 cards)**
   - ✓ Google Ads Management
   - ✓ Facebook/Instagram Ads
   - ✓ LinkedIn Advertising
   - ✓ Competitor Ad Analysis
   - ✓ A/B Testing
   - ✓ Performance Tracking

3. **Platform Coverage**
   - Icons for ad platforms
   - Google, Meta, LinkedIn, TikTok, etc.

4. **Results Dashboard Preview**
   - Mock dashboard showing metrics
   - Comparison with competitors

5. **CTA**
   - "Outperform Your Competition"

### 5. Reviews Management - Cube Style
**Route:** `/products/reviews`

**Page Sections:**
1. **Hero**
   - "Build Trust, Beat Competitors"
   - Subheadline about reputation management
   - Single CTA

2. **Features (6 cards)**
   - ✓ Multi-Platform Monitoring
   - ✓ AI-Powered Responses
   - ✓ Sentiment Analysis
   - ✓ Competitor Review Tracking
   - ✓ Review Generation
   - ✓ Analytics Dashboard

3. **Platform Integration**
   - Google, Yelp, Trustpilot, etc.
   - Visual integration diagram

4. **Comparison View**
   - Your rating vs. competitors
   - Category benchmarks

5. **CTA**
   - "Improve Your Reputation"

## Component Architecture

### New Components to Create

#### 1. **ProductHero.jsx**
```jsx
Props:
- title (string)
- subtitle (string)
- ctaPrimary (object: { text, link })
- ctaSecondary (object: { text, link }) - optional
- backgroundVariant (string: 'gradient' | 'solid')
```

#### 2. **FeatureGrid.jsx**
```jsx
Props:
- features (array of objects: { icon, title, description })
- columns (number: 2 | 3)
- variant (string: 'card' | 'list')
```

#### 3. **StatsSection.jsx**
```jsx
Props:
- stats (array of objects: { value, label, suffix })
- animated (boolean)
```

#### 4. **ComparisonChart.jsx**
```jsx
Props:
- yourScore (number)
- competitors (array of objects: { name, score })
- category (string)
```

#### 5. **ProcessSteps.jsx**
```jsx
Props:
- steps (array of objects: { icon, title, description })
- layout (string: 'horizontal' | 'vertical')
```

#### 6. **PlatformLogos.jsx**
```jsx
Props:
- platforms (array of objects: { name, logo })
- title (string)
```

#### 7. **CTASection.jsx**
```jsx
Props:
- title (string)
- description (string)
- ctaText (string)
- ctaLink (string)
- variant (string: 'gradient' | 'solid')
```

#### 8. **FeatureShowcase.jsx**
```jsx
Props:
- title (string)
- description (string)
- image (string)
- imagePosition (string: 'left' | 'right')
- features (array of strings)
```

## Design System Updates

### Colors
```javascript
// Add to tailwind.config.js
colors: {
  primary: {
    blue: '#0ea5e9',
    purple: '#9b51e0',
  },
  dark: {
    900: '#030303',
    800: '#050507',
    700: '#09090b',
    600: '#0f0f12',
    500: '#18181b',
  },
  accent: {
    green: '#00d084',
    yellow: '#fcb900',
    red: '#cf2e2e',
  }
}
```

### Typography
```javascript
// Heading sizes for product pages
'h1-product': '3.5rem',    // 56px
'h2-product': '2.5rem',    // 40px
'h3-product': '1.75rem',   // 28px
'stat-large': '4rem',      // 64px
```

### Gradients
```javascript
backgroundImage: {
  'gradient-primary': 'linear-gradient(135deg, #0ea5e9 0%, #9b51e0 100%)',
  'gradient-dark': 'linear-gradient(180deg, #030303 0%, #09090b 100%)',
}
```

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Create base components (ProductHero, FeatureGrid, CTASection)
- [ ] Update design system (colors, typography, gradients)
- [ ] Set up routing for all 5 product pages
- [ ] Create page templates

### Phase 2: GEO Page (Week 2)
- [ ] Build GEO page with all sections
- [ ] Implement ComparisonChart component
- [ ] Add animations and interactions
- [ ] Create mock data for demos

### Phase 3: Other Product Pages (Week 3)
- [ ] Build SEO page
- [ ] Build AI Services page
- [ ] Build Paid Marketing page
- [ ] Build Reviews Management page

### Phase 4: Polish & Integration (Week 4)
- [ ] Add navigation menu updates
- [ ] Implement cross-linking between products
- [ ] Add analytics tracking
- [ ] Performance optimization
- [ ] Mobile responsiveness testing
- [ ] Content review and copywriting

## Navigation Updates

### Header Menu Structure
```
Products (Dropdown)
├── GEO
├── SEO
├── AI Services
├── Paid Marketing
└── Reviews Management

Resources
└── Blog

About
Contact
```

### Homepage Updates
- Add "Our Products" section with 5 product cards
- Each card links to respective product page
- Update hero CTA to link to products overview

## Content Guidelines

### Writing Style
- **Short, punchy headlines** (5-8 words)
- **Benefit-focused** copy (what customer gets, not what we do)
- **Active voice** throughout
- **Numbers and metrics** where possible
- **Competitive angle** in every section
- **Clear CTAs** with action verbs

### Example Headlines
- GEO: "Dominate AI Search. Outrank Everyone."
- SEO: "Rank #1. Beat Your Competition."
- AI Services: "AI Adoption Without the Headaches"
- Paid Marketing: "Spend Less. Get More. Win Faster."
- Reviews: "5-Star Reputation. Competitive Edge."

## Technical Considerations

### Performance
- Lazy load images and components
- Use React.lazy() for product pages
- Optimize images (WebP format)
- Implement skeleton loaders

### SEO
- Unique meta titles and descriptions per page
- Structured data (Product schema)
- Internal linking strategy
- Sitemap updates

### Analytics
- Track page views per product
- Monitor CTA click rates
- A/B test headlines and CTAs
- Heatmap analysis

## Next Steps

1. **Review and approve** this plan
2. **Gather content** (copy, images, metrics)
3. **Create wireframes** for each page
4. **Start Phase 1** implementation
5. **Iterate based on feedback**

---

**Questions to Answer:**
1. Do we have real metrics/data for each product?
2. What's the primary CTA action? (Form, Calendar, Demo request?)
3. Do we need pricing information on product pages?
4. Should we include customer testimonials/case studies?
5. What's the priority order for building these pages?

