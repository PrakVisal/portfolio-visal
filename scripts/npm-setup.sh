#!/bin/bash

# NPM Portfolio Setup Script
echo "🚀 Setting up Portfolio Project with NPM..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check Node.js version
print_status "Checking Node.js version..."
node_version=$(node -v | sed 's/v//')
required_node_version="18.17.0"

if [ "$(printf '%s\n' "$required_node_version" "$node_version" | sort -V | head -n1)" != "$required_node_version" ]; then
    print_error "Node.js version $required_node_version or higher is required. Current version: v$node_version"
    print_warning "Please update Node.js: https://nodejs.org/"
    exit 1
fi

# Check npm version
print_status "Checking npm version..."
npm_version=$(npm -v)
required_npm_version="9.6.7"

if [ "$(printf '%s\n' "$required_npm_version" "$npm_version" | sort -V | head -n1)" != "$required_npm_version" ]; then
    print_warning "npm version $required_npm_version or higher is recommended. Current version: $npm_version"
    print_status "Updating npm..."
    npm install -g npm@latest
fi

print_success "Node.js v$node_version and npm v$(npm -v) are ready!"

# Clean any existing installations
if [ -d "node_modules" ]; then
    print_status "Cleaning existing node_modules..."
    rm -rf node_modules
fi

if [ -f "package-lock.json" ]; then
    print_status "Cleaning existing package-lock.json..."
    rm package-lock.json
fi

# Clear npm cache
print_status "Clearing npm cache..."
npm cache clean --force

# Install dependencies
print_status "Installing dependencies with npm..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

print_success "Dependencies installed successfully!"

# Create necessary directories
print_status "Creating project directories..."
mkdir -p public/cv
mkdir -p public/uploads
touch public/uploads/.gitkeep

# Setup environment file
if [ ! -f .env.local ]; then
    print_status "Creating environment configuration..."
    cp .env.example .env.local
    print_warning "Please update .env.local with your configuration"
else
    print_success "Environment file already exists"
fi

# Setup git hooks
if [ -d ".git" ]; then
    print_status "Setting up git hooks..."
    npm run prepare
    print_success "Git hooks configured"
fi

# Run validation
print_status "Running project validation..."
npm run validate

if [ $? -eq 0 ]; then
    print_success "Project validation passed!"
else
    print_warning "Some validation checks failed. Please review the output above."
fi

# Display next steps
echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Update .env.local with your database and email configuration"
echo "   2. Run 'npm run db:migrate' to set up the database"
echo "   3. Place your CV file in public/cv/Aqsam_CV.pdf"
echo "   4. Run 'npm run dev' to start the development server"
echo ""
echo "📚 Available commands:"
echo "   npm run dev          - Start development server"
echo "   npm run build        - Build for production"
echo "   npm run lint         - Run code linting"
echo "   npm run type-check   - Check TypeScript types"
echo "   npm run db:migrate   - Setup database"
echo ""
echo "🔗 Useful links:"
echo "   • Development: http://localhost:3000"
echo "   • Admin Panel: http://localhost:3000/admin"
echo "   • Documentation: README.md"
echo ""
print_success "Happy coding with npm! 🚀"
