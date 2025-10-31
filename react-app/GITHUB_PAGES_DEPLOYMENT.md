# GitHub Pages Deployment Guide for AltorLab Website

## Overview

This guide provides step-by-step instructions for deploying the AltorLab React website to GitHub Pages with your custom domain (altorlab.com).

---

## Prerequisites

✅ **Already Configured:**
- `vite.config.js` → `base: '/'`
- `main.jsx` → `basename="/"`
- Custom domain CNAME file exists
- GitHub Pages enabled on repository

---

## Quick Deployment Steps

### Step 1: Build the React Application

```bash
cd react-app
npm run build
```

This creates an optimized production build in `react-app/dist/` with:
- Minified JavaScript bundles
- Optimized CSS
- Compressed assets

**Build Output:**
```
react-app/dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other-assets]
```

---

### Step 2: Backup Existing Root Files (Optional)

If you want to keep a backup of the old website:

```bash
# From repository root (c:\Users\siddh\Desktop\code\website)
cd ..
mkdir -p old-website-backup-$(date +%Y%m%d)
mv index.html old-website-backup-*/
mv assets old-website-backup-*/
# Keep CNAME, README.md, and react-app/
```

**Note:** The `old` and `old-website-backup` folders already exist, so this is optional.

---

### Step 3: Copy Build Files to Repository Root

```bash
# From repository root
cp -r react-app/dist/* .
```

This copies:
- `index.html` → Root directory
- `assets/` folder → Root directory
- Any other build files → Root directory

---

### Step 4: Ensure CNAME File Exists

The CNAME file must be in the repository root for the custom domain to work:

```bash
# Verify CNAME exists
cat CNAME
# Should output: altorlab.com
```

If it doesn't exist, create it:

```bash
echo "altorlab.com" > CNAME
```

---

### Step 5: Commit and Push to GitHub

```bash
git add .
git commit -m "Deploy React app to GitHub Pages"
git push origin master
```

---

### Step 6: Verify GitHub Pages Settings

1. Go to: `https://github.com/Altor-lab/website/settings/pages`
2. Verify settings:
   - **Source:** Deploy from a branch
   - **Branch:** `master`
   - **Folder:** `/ (root)`
   - **Custom domain:** `altorlab.com`
   - **Enforce HTTPS:** ✅ Enabled

---

### Step 7: Wait and Verify Deployment

1. **Wait 2-5 minutes** for GitHub Pages to rebuild
2. **Visit:** https://altorlab.com
3. **Test:**
   - ✅ Homepage loads
   - ✅ Click "AI Insights" in navigation
   - ✅ All assets load (check browser console for errors)
   - ✅ Routing works (browser back/forward buttons)

---

## Asset Path Reference

With `base: '/'` and custom domain:

| Asset Type | Build Output | Deployed URL |
|------------|--------------|--------------|
| JavaScript | `/assets/index-abc123.js` | `https://altorlab.com/assets/index-abc123.js` |
| CSS | `/assets/index-def456.css` | `https://altorlab.com/assets/index-def456.css` |
| Images | `/assets/logo-ghi789.png` | `https://altorlab.com/assets/logo-ghi789.png` |

---

## One-Command Deployment (Optional)

You can create a deployment script to automate the process.

### Option 1: PowerShell Script (Windows)

Create `deploy.ps1` in repository root:

```powershell
# Build the React app
Write-Host "Building React app..." -ForegroundColor Cyan
Set-Location react-app
npm run build
Set-Location ..

# Copy build files to root
Write-Host "Copying build files to root..." -ForegroundColor Cyan
Copy-Item -Path "react-app/dist/*" -Destination "." -Recurse -Force

# Ensure CNAME exists
Write-Host "Ensuring CNAME file exists..." -ForegroundColor Cyan
"altorlab.com" | Out-File -FilePath "CNAME" -Encoding ASCII -NoNewline

# Commit and push
Write-Host "Committing and pushing to GitHub..." -ForegroundColor Cyan
git add .
git commit -m "Deploy React app to GitHub Pages"
git push origin master

Write-Host "Deployment complete! Visit https://altorlab.com in 2-5 minutes." -ForegroundColor Green
```

Run with:
```powershell
.\deploy.ps1
```

### Option 2: Bash Script (Mac/Linux/Git Bash)

Create `deploy.sh` in repository root:

```bash
#!/bin/bash

# Build the React app
echo "Building React app..."
cd react-app
npm run build
cd ..

# Copy build files to root
echo "Copying build files to root..."
cp -r react-app/dist/* .

# Ensure CNAME exists
echo "Ensuring CNAME file exists..."
echo "altorlab.com" > CNAME

# Commit and push
echo "Committing and pushing to GitHub..."
git add .
git commit -m "Deploy React app to GitHub Pages"
git push origin master

echo "Deployment complete! Visit https://altorlab.com in 2-5 minutes."
```

Make executable and run:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Troubleshooting

### Issue: 404 on Page Refresh

**Problem:** Refreshing `/ai-insights` shows 404 error

**Solution:** Create a `404.html` file in the repository root:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>AltorLab</title>
    <script>
      // Single Page Apps for GitHub Pages
      // Redirect to index.html with path preserved
      var pathSegmentsToKeep = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

Then add this script to `react-app/index.html` in the `<head>` section:

```html
<script>
  // Single Page Apps for GitHub Pages
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) {
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

**After adding this, rebuild and redeploy.**

### Issue: Assets Not Loading (404 errors)

**Checklist:**
1. ✅ `vite.config.js` has `base: '/'`
2. ✅ `main.jsx` has `basename="/"`
3. ✅ Build was run after changing config
4. ✅ Files were copied to repository root
5. ✅ CNAME file exists in root
6. ✅ Wait 5 minutes for deployment to complete

### Issue: Custom Domain Not Working

**Solution:**
1. Verify CNAME file exists: `cat CNAME` → should show `altorlab.com`
2. Check GitHub Pages settings show custom domain
3. Wait up to 10 minutes for DNS propagation
4. Enable "Enforce HTTPS" in GitHub Pages settings

---

## Quick Reference

### Build Commands
```bash
# Build for production
cd react-app
npm run build

# Preview production build locally
npm run preview

# Clean and rebuild
rm -rf dist
npm run build
```

### Deployment Commands
```bash
# From repository root
cp -r react-app/dist/* .
git add .
git commit -m "Deploy React app"
git push origin master
```

---

## Deployment Checklist

- [x] `vite.config.js` has `base: '/'`
- [x] `main.jsx` has `basename="/"`
- [ ] Run `npm run build` successfully
- [ ] Copy build files to repository root
- [ ] Verify CNAME file exists
- [ ] Commit and push to GitHub
- [ ] Wait 5 minutes for deployment
- [ ] Test live site at https://altorlab.com
- [ ] Verify routing works
- [ ] Check browser console for errors

---

**Last Updated:** 2025-10-31
**Deployment Target:** https://altorlab.com
**Repository:** https://github.com/Altor-lab/website

