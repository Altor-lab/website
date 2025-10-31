# AltorLab Website

A modern, React-based website for AltorLab - Building tools for AI-native teams.

## 🚀 Features

- **Homepage**: Marketing content about building for AI-native teams
- **llms.txt Generator**: Interactive tool to create AI-readable documentation files
- **AI Insights Dashboard**: Website ranking analysis using AI
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion
- **Dark Theme**: Modern, clean aesthetic inspired by Lapis

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **GitHub Pages** - Static site hosting

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Altor-lab/website.git
cd website/react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 🏗️ Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚢 Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"

2. **Push to main branch**:
```bash
git add .
git commit -m "Deploy website"
git push origin main
```

The workflow will automatically build and deploy your site.

### Option 2: Manual Deployment

You can also deploy manually using the gh-pages package:

```bash
npm run deploy
```

## 📁 Project Structure

```
react-app/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── FAQ.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── LLMSTxtGenerator.jsx
│   │   └── AIInsights.jsx
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Dark Background**: Multiple shades of near-black
- **Accent**: Purple for gradients

### Typography
- **Font Family**: Inter (sans-serif), Geist Mono (monospace)
- **Headings**: Bold, large sizes with gradient effects
- **Body**: Regular weight, good line-height for readability

### Components
- **Buttons**: Primary (white bg) and Secondary (outline) variants
- **Cards**: Dark background with subtle borders and hover effects
- **Animations**: Fade-in, slide-up effects on scroll

## 🔧 Configuration

### Base URL
The site is configured to work with GitHub Pages. The base URL is set in `vite.config.js`:

```javascript
base: '/website/'
```

Update this if your repository name is different.

### Router
The React Router is configured with the same base path in `src/main.jsx`:

```javascript
<BrowserRouter basename="/website">
```

## 📝 Customization

### Update Content
- Edit page content in `src/pages/`
- Modify navigation links in `src/components/Header.jsx`
- Update footer links in `src/components/Footer.jsx`

### Styling
- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Component-specific styles: Use Tailwind utility classes

### Add New Pages
1. Create a new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/Header.jsx`

## 🌐 Environment Variables

No environment variables are required for basic functionality. If you add API integrations, create a `.env` file:

```
VITE_API_URL=your_api_url
```

Access in code: `import.meta.env.VITE_API_URL`

## 🐛 Troubleshooting

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node version: Requires Node 16+

### Deployment Issues
- Ensure GitHub Pages is enabled in repository settings
- Check that the base URL matches your repository name
- Verify GitHub Actions has proper permissions

### Routing Issues
- Make sure basename in BrowserRouter matches the base in vite.config.js
- Use `<Link>` from react-router-dom for internal navigation

## 📄 License

Copyright © 2025 AltorLab Inc. All rights reserved.

## 🤝 Contributing

This is a private project for AltorLab. For questions or suggestions, contact the development team.

## 📧 Contact

- Website: https://altorlab.com
- Email: contact@altorlab.com
- Schedule: https://calendar.app.google/Xh3jbxtMPotCz2pXA

