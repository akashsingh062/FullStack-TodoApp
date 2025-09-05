#!/bin/bash

# Deployment Helper Script for Render.com
# Run this script before pushing to GitHub for deployment

echo "🚀 Preparing FullStack Todo App for Render.com deployment..."

# Check if we're in the right directory
if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found. Please run this script from the project root."
    exit 1
fi

# Check if git repository is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Add all files to git
echo "📝 Adding files to git..."
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit."
else
    # Commit changes
    echo "💾 Committing changes..."
    git commit -m "Prepare for Render deployment - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Check if remote origin exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "⚠️  No remote origin found."
    echo "Please add your GitHub repository as origin:"
    echo "git remote add origin https://github.com/yourusername/your-repo-name.git"
    echo ""
    echo "Then run: git push -u origin main"
    exit 1
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://render.com and sign in"
echo "2. Click 'New' → 'Blueprint'"
echo "3. Connect your GitHub repository"
echo "4. Render will detect the render.yaml file automatically"
echo "5. Set up environment variables as described in DEPLOYMENT.md"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🌐 After deployment, your app will be available at:"
echo "   Frontend: https://fullstack-todo-frontend.onrender.com"
echo "   Backend:  https://fullstack-todo-backend.onrender.com"
echo ""
echo "Happy deploying! 🎉"
