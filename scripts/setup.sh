#!/bin/bash

# Portfolio Setup Script
echo "🚀 Setting up Portfolio Project..."

# Check Node.js version
echo "📋 Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2)
required_version="18.0.0"

if [ "$(printf '%s\n' "$required_version" "$node_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "❌ Node.js version $required_version or higher is required. Current version: $node_version"
    exit 1
fi

# Check npm version
echo "📋 Checking npm version..."
npm_version=$(npm -v)
required_npm_version="9.0.0"

if [ "$(printf '%s\n' "$required_npm_version" "$npm_version" | sort -V | head -n1)" != "$required_npm_version" ]; then
    echo "❌ npm version $required_npm_version or higher is required. Current version: $npm_version"
    exit 1
fi

echo "✅ Node.js and npm versions are compatible"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p public/cv
mkdir -p public/uploads
touch public/uploads/.gitkeep

# Copy environment file
if [ ! -f .env.local ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your configuration"
fi

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your database and email configuration"
echo "2. Run 'npm run db:migrate' to set up the database"
echo "3. Place your CV file in public/cv/Aqsam_CV.pdf"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "🎉 Happy coding!"
