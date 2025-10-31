# Deployment Guide for AltorLab Website

This guide provides step-by-step instructions for deploying the new React-based AltorLab website to GitHub Pages.

## Prerequisites

- Git installed on your system
- GitHub account with access to the Altor-lab/website repository
- Node.js 16+ installed (Node 18+ recommended for best compatibility)

## Deployment Steps

### Option 1: Automatic Deployment with GitHub Actions (Recommended)

This is the easiest method and will automatically deploy your site whenever you push to the main branch.

#### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/Altor-lab/website
2. Click on **Settings** (top navigation)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions** from the dropdown

#### Step 2: Move React App to Root (Important!)

The GitHub Actions workflow expects the React app to be in the root of the repository. You need to move all files from `react-app/` to the root:

```bash
# From the repository root
cd C:/Users/siddh/Desktop/code/website

# Move all files from react-app to root
Move-Item -Path react-app/* -Destination . -Force

# Remove the now-empty react-app directory
Remove-Item -Recurse react-app

# Archive the old static website
New-Item -ItemType Directory -Force -Path old-static
Move-Item -Path index.html -Destination old-static/
Move-Item -Path CNAME -Destination old-static/
```

#### Step 3: Update Configuration

After moving files, update the base path in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/',  // Change from '/website/' to '/'
  build: {
    outDir: 'dist',
  },
})
```

And update `src/main.jsx`:

```javascript
<BrowserRouter basename="/">  {/* Change from '/website' to '/' */}
  <App />
</BrowserRouter>
```

#### Step 4: Commit and Push

```bash
git add .
git commit -m "Deploy new React-based website"
git push origin master
```

The GitHub Actions workflow will automatically:
1. Install dependencies
2. Build the React app
3. Deploy to GitHub Pages

You can monitor the deployment progress in the **Actions** tab of your repository.

#### Step 5: Configure Custom Domain (Optional)

If you want to use the custom domain altorlab.com:

1. Create a `public/CNAME` file with the content:
   ```
   altorlab.com
   ```

2. In your domain registrar (where you bought altorlab.com):
   - Add a CNAME record pointing to `altor-lab.github.io`
   - Or add A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

3. In GitHub repository settings > Pages:
   - Enter `altorlab.com` in the Custom domain field
   - Enable "Enforce HTTPS"

### Option 2: Manual Deployment with gh-pages

If you prefer manual deployment or want to test before setting up automatic deployment:

```bash
# Make sure you're in the project directory
cd C:/Users/siddh/Desktop/code/website/react-app

# Build and deploy
npm run deploy
```

This will:
1. Build the production version
2. Push the built files to the `gh-pages` branch
3. GitHub Pages will serve from that branch

**Note:** For manual deployment, you need to configure GitHub Pages to use the `gh-pages` branch:
1. Go to Settings > Pages
2. Under Source, select "Deploy from a branch"
3. Select `gh-pages` branch and `/ (root)` folder

## Verification

After deployment, your site should be available at:
- **With GitHub Actions**: https://altor-lab.github.io/ (or https://altorlab.com if custom domain is configured)
- **With gh-pages**: https://altor-lab.github.io/website/

### Troubleshooting

#### Build Fails in GitHub Actions

1. Check the Actions tab for error logs
2. Ensure all dependencies are listed in package.json
3. Verify Node version compatibility (the workflow uses Node 20)

#### 404 Errors on Page Refresh

This happens because GitHub Pages doesn't support client-side routing by default. Solutions:

1. **Use Hash Router** (Quick fix):
   Change `BrowserRouter` to `HashRouter` in `src/main.jsx`:
   ```javascript
   import { HashRouter } from 'react-router-dom'
   
   <HashRouter>
     <App />
   </HashRouter>
   ```

2. **Add 404.html** (Better UX):
   Create `public/404.html` that redirects to index.html:
   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8">
       <script>
         sessionStorage.redirect = location.href;
       </script>
       <meta http-equiv="refresh" content="0;URL='/'">
     </head>
   </html>
   ```

#### Blank Page After Deployment

1. Check browser console for errors
2. Verify the `base` path in `vite.config.js` matches your deployment URL
3. Ensure `basename` in `BrowserRouter` matches the base path

#### Assets Not Loading

1. Verify all asset paths are relative or use the PUBLIC_URL
2. Check that assets are in the `public/` folder or imported in components
3. Ensure the base path is correctly configured

## Rollback Procedure

If you need to rollback to the old static website:

```bash
# Restore old files from the old-static directory
Move-Item -Path old-static/* -Destination . -Force

# Commit and push
git add .
git commit -m "Rollback to static website"
git push origin master
```

## Monitoring

After deployment, monitor:
1. **GitHub Actions**: Check the Actions tab for build status
2. **Analytics**: Set up Google Analytics or similar to track traffic
3. **Error Tracking**: Consider adding Sentry or similar for error monitoring

## Next Steps

1. Test all pages and features on the live site
2. Set up custom domain if needed
3. Configure SSL/HTTPS (automatic with GitHub Pages)
4. Add analytics tracking
5. Set up monitoring and error tracking
6. Create a backup of the old website

## Support

For issues or questions:
- Check GitHub Actions logs for deployment errors
- Review the README.md for development setup
- Contact the development team

---

**Last Updated**: 2025-10-31

