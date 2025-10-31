# Quick Start Guide

Get the AltorLab website up and running in 5 minutes!

## Prerequisites

- Node.js 16+ installed (check with `node --version`)
- Git installed
- A code editor (VS Code recommended)

## Installation

```bash
# Navigate to the project directory
cd C:/Users/siddh/Desktop/code/website/react-app

# Install dependencies (if not already done)
npm install
```

## Development

```bash
# Start the development server
npm run dev
```

The site will be available at: **http://localhost:5173/website/**

The development server includes:
- ⚡ Hot Module Replacement (HMR) - changes appear instantly
- 🔍 Error overlay - see errors directly in the browser
- 📱 Mobile testing - access from your phone using the network URL

## Making Changes

### Edit Content

1. **Homepage**: Edit `src/pages/Home.jsx`
2. **llms.txt Generator**: Edit `src/pages/LLMSTxtGenerator.jsx`
3. **AI Insights**: Edit `src/pages/AIInsights.jsx`

### Edit Navigation

- **Header/Menu**: Edit `src/components/Header.jsx`
- **Footer**: Edit `src/components/Footer.jsx`

### Edit Styles

- **Global styles**: Edit `src/index.css`
- **Colors/Theme**: Edit `tailwind.config.js`
- **Component styles**: Use Tailwind classes directly in JSX

### Add New Page

1. Create new file in `src/pages/`, e.g., `src/pages/About.jsx`
2. Add route in `src/App.jsx`:
   ```jsx
   import About from './pages/About'
   
   <Route path="/about" element={<About />} />
   ```
3. Add link in `src/components/Header.jsx`:
   ```jsx
   { name: 'About', path: '/about' }
   ```

## Building for Production

```bash
# Create production build
npm run build
```

Built files will be in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## Deployment

### Quick Deploy to GitHub Pages

```bash
npm run deploy
```

This will build and deploy to GitHub Pages automatically.

### Full Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

## Common Tasks

### Update Dependencies

```bash
npm update
```

### Check for Security Issues

```bash
npm audit
npm audit fix
```

### Add New Package

```bash
npm install package-name
```

### Remove Package

```bash
npm uninstall package-name
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:
```bash
# Kill the process or use a different port
npm run dev -- --port 3000
```

### Build Errors

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Try building again with `npm run build`

### Changes Not Appearing

1. Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Restart the dev server

### Styling Issues

1. Make sure Tailwind classes are spelled correctly
2. Check `tailwind.config.js` for custom classes
3. Verify PostCSS is processing correctly

## Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
npm run deploy       # Deploy to GitHub Pages

# Maintenance
npm install          # Install dependencies
npm update           # Update dependencies
npm audit            # Check for vulnerabilities
npm outdated         # Check for outdated packages
```

## File Structure Quick Reference

```
src/
├── components/      # Reusable UI components
│   ├── Layout.jsx   # Page wrapper
│   ├── Header.jsx   # Navigation
│   ├── Footer.jsx   # Footer
│   ├── Button.jsx   # Button component
│   ├── Card.jsx     # Card component
│   └── FAQ.jsx      # FAQ accordion
├── pages/          # Page components
│   ├── Home.jsx    # Homepage
│   ├── LLMSTxtGenerator.jsx
│   └── AIInsights.jsx
├── App.jsx         # Main app with routes
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Resources

- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **React Router**: https://reactrouter.com/

## Getting Help

1. Check the [README.md](./README.md) for detailed documentation
2. Review [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for architecture overview
3. See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
4. Check browser console for error messages
5. Review GitHub Actions logs for deployment errors

## Next Steps

1. ✅ Get the dev server running
2. ✅ Make a small change to see HMR in action
3. ✅ Explore the codebase
4. ✅ Read the full README.md
5. ✅ Plan your first feature or content update

---

Happy coding! 🚀

