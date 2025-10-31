#!/bin/bash

# AltorLab Website Deployment Script
# Deploys React app to GitHub Pages with custom domain

echo ""
echo "========================================"
echo "  AltorLab Website Deployment"
echo "========================================"
echo ""

# Step 1: Build the React app
echo "[1/5] Building React app..."
cd react-app
npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "Build failed! Please fix errors and try again."
    cd ..
    exit 1
fi

cd ..
echo "✓ Build complete"
echo ""

# Step 2: Copy build files to root
echo "[2/5] Copying build files to repository root..."
cp -r react-app/dist/* .
echo "✓ Files copied"
echo ""

# Step 3: Ensure CNAME exists
echo "[3/5] Ensuring CNAME file exists..."
echo "altorlab.com" > CNAME
echo "✓ CNAME verified"
echo ""

# Step 4: Commit changes
echo "[4/5] Committing changes..."
git add .
git commit -m "Deploy React app to GitHub Pages - $(date '+%Y-%m-%d %H:%M')"

if [ $? -ne 0 ]; then
    echo "No changes to commit or commit failed."
fi
echo "✓ Changes committed"
echo ""

# Step 5: Push to GitHub
echo "[5/5] Pushing to GitHub..."
git push origin master

if [ $? -ne 0 ]; then
    echo ""
    echo "Push failed! Please check your connection and try again."
    exit 1
fi

echo "✓ Pushed to GitHub"
echo ""

# Success message
echo "========================================"
echo "  Deployment Complete!"
echo "========================================"
echo ""
echo "Your website will be live at:"
echo "  https://altorlab.com"
echo ""
echo "Please wait 2-5 minutes for GitHub Pages to rebuild."
echo ""

