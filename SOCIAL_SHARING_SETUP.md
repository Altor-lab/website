# Social Sharing Setup for AltorLab Website

## Overview

Added comprehensive Open Graph (OG) and Twitter Card meta tags so that when you share https://altorlab.com on WhatsApp, Slack, Twitter, LinkedIn, Facebook, etc., it shows a beautiful preview with:

- ✅ **Title:** AltorLab - Building for AI-Native Teams
- ✅ **Description:** Next generation business tools and AI adoption products
- ✅ **Image:** Professional branded OG image (1200x630px)
- ✅ **URL:** https://altorlab.com

---

## What Was Added

### 1. **OG Image Created**
- **File:** `react-app/public/og-image.svg`
- **Size:** 1200x630px (optimal for all social platforms)
- **Design:** 
  - Dark background matching site theme
  - Gradient logo with "A" icon
  - AltorLab branding
  - Tagline and description
  - Professional, modern look

### 2. **Meta Tags Added to `index.html`**

Added comprehensive meta tags for:
- **Open Graph (Facebook, LinkedIn, WhatsApp)**
- **Twitter Cards**
- **General SEO**
- **Theme color for mobile browsers**

### 3. **Vite Config Updated**
- Added `publicDir: 'public'` to ensure the OG image is included in the build

### 4. **llms.txt File Created**
- **File:** `react-app/public/llms.txt`
- **Purpose:** AI-readable documentation file that helps AI assistants (ChatGPT, Claude, Perplexity, etc.) understand your website
- **Content:** Comprehensive information about AltorLab's products, services, and mission
- **Accessible at:** https://altorlab.com/llms.txt (after deployment)

---

## Files Created/Modified

1. ✅ `react-app/index.html` - Added all meta tags
2. ✅ `react-app/vite.config.js` - Added publicDir configuration
3. ✅ `react-app/public/og-image.svg` - Created OG image
4. ✅ `react-app/public/og-image.png.html` - Helper tool to convert SVG to PNG
5. ✅ `react-app/public/llms.txt` - AI-readable documentation file

---

## How to Deploy

### Option 1: Use the Deployment Script (Recommended)

```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Manual Deployment

```bash
cd react-app
npm run build
cd ..
cp -r react-app/dist/* .
echo "altorlab.com" > CNAME
git add .
git commit -m "Add social sharing meta tags and OG image"
git push origin master
```

---

## How to Test Social Sharing

### After Deployment (wait 5 minutes for GitHub Pages):

1. **WhatsApp:**
   - Open WhatsApp Web or mobile app
   - Send message: `https://altorlab.com`
   - You should see preview with image, title, description

2. **Facebook/LinkedIn:**
   - Use Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Enter URL: `https://altorlab.com`
   - Click "Scrape Again" to refresh cache
   - You should see the preview

3. **Twitter:**
   - Use Twitter Card Validator: https://cards-dev.twitter.com/validator
   - Enter URL: `https://altorlab.com`
   - You should see the preview

4. **Slack:**
   - Paste `https://altorlab.com` in any Slack channel
   - You should see the preview unfurl

5. **LinkedIn:**
   - Create a new post
   - Paste `https://altorlab.com`
   - You should see the preview

---

## Optional: Convert SVG to PNG

Some platforms work better with PNG images. To convert:

1. **Open the converter:**
   ```bash
   cd react-app/public
   # Open og-image.png.html in your browser
   ```

2. **Click "Convert SVG to PNG"** button

3. **Save the downloaded file** as `og-image.png` in `react-app/public/`

4. **Update `react-app/index.html`:**
   ```html
   <!-- Change this line: -->
   <meta property="og:image" content="https://altorlab.com/og-image.svg" />
   
   <!-- To this: -->
   <meta property="og:image" content="https://altorlab.com/og-image.png" />
   ```

5. **Rebuild and redeploy:**
   ```bash
   ./deploy.sh
   ```

---

## Troubleshooting

### Preview Not Showing

**Problem:** Shared link doesn't show preview

**Solutions:**

1. **Wait for deployment:** GitHub Pages takes 2-5 minutes to update
2. **Clear cache:** Use the debugging tools above to force refresh
3. **Check image URL:** Visit https://altorlab.com/og-image.svg directly - it should load
4. **Verify meta tags:** View page source and check meta tags are present

### Image Not Loading

**Problem:** Preview shows but no image

**Solutions:**

1. **Use PNG instead of SVG:** Some platforms don't support SVG OG images
   - Follow "Convert SVG to PNG" steps above
2. **Check file size:** OG images should be under 8MB (ours is ~5KB, so fine)
3. **Verify HTTPS:** Make sure you're using `https://altorlab.com` not `http://`

### Old Preview Showing

**Problem:** Preview shows old content after update

**Solutions:**

1. **Clear platform cache:**
   - Facebook: https://developers.facebook.com/tools/debug/ → "Scrape Again"
   - LinkedIn: https://www.linkedin.com/post-inspector/ → "Inspect"
   - Twitter: Wait 7 days or use Card Validator
2. **Add query parameter:** Share `https://altorlab.com?v=2` to bypass cache

---

## Meta Tags Reference

### What Each Platform Uses

| Platform | Uses | Image Size | Format |
|----------|------|------------|--------|
| WhatsApp | OG tags | 1200x630 | JPG/PNG preferred |
| Facebook | OG tags | 1200x630 | JPG/PNG/GIF |
| LinkedIn | OG tags | 1200x627 | JPG/PNG |
| Twitter | Twitter Card | 1200x628 | JPG/PNG/GIF |
| Slack | OG tags | 1200x630 | JPG/PNG |
| Telegram | OG tags | Any | JPG/PNG |
| Discord | OG tags | 1200x630 | JPG/PNG |

**Our image:** 1200x630 (works for all platforms)

---

## Current Meta Tags

```html
<!-- Primary Meta Tags -->
<title>AltorLab - Building for AI-Native Teams</title>
<meta name="title" content="AltorLab - Building for AI-Native Teams" />
<meta name="description" content="Next generation business tools and AI adoption products..." />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://altorlab.com/" />
<meta property="og:title" content="AltorLab - Building for AI-Native Teams" />
<meta property="og:description" content="Next generation business tools..." />
<meta property="og:image" content="https://altorlab.com/og-image.svg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="AltorLab - Building for AI-Native Teams" />
<meta name="twitter:description" content="Next generation business tools..." />
<meta name="twitter:image" content="https://altorlab.com/og-image.svg" />
```

---

## Next Steps

1. ✅ Deploy the changes: `./deploy.sh`
2. ✅ Wait 5 minutes for GitHub Pages to update
3. ✅ Test sharing on WhatsApp, Slack, or LinkedIn
4. ✅ If image doesn't show, convert SVG to PNG and redeploy
5. ✅ Use debugging tools to verify and clear cache if needed

---

**Last Updated:** 2025-10-31  
**Status:** Ready to deploy  
**Image Format:** SVG (can convert to PNG if needed)

