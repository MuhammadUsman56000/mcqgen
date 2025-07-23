#!/bin/bash

# 🚀 Wanderlust Chronicles Professional Deployment Script
# This script automates the deployment process with comprehensive checks and optimizations

set -e # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="Wanderlust Chronicles"
BUILD_DIR=".next"
DIST_DIR="out"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║                   $1                   ║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
}

# Main deployment function
deploy() {
    local deployment_type=$1
    
    print_header "🚀 WANDERLUST CHRONICLES DEPLOYMENT"
    print_status "Starting deployment process for $PROJECT_NAME..."
    print_status "Deployment type: $deployment_type"
    echo

    # Step 1: Pre-deployment checks
    print_status "Step 1/7: Running pre-deployment checks..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ to continue."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version $NODE_VERSION detected. Please upgrade to Node.js 18+."
        exit 1
    fi
    
    print_success "Node.js $(node --version) detected"
    
    # Check if npm is available
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm to continue."
        exit 1
    fi
    
    print_success "npm $(npm --version) detected"
    
    # Step 2: Install dependencies
    print_status "Step 2/7: Installing dependencies..."
    if npm ci; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
    
    # Step 3: Run linting
    print_status "Step 3/7: Running code quality checks..."
    if npm run lint; then
        print_success "Code quality checks passed"
    else
        print_warning "Linting issues detected, but continuing with deployment"
    fi
    
    # Step 4: Type checking
    print_status "Step 4/7: Running TypeScript type checking..."
    if npx tsc --noEmit; then
        print_success "TypeScript compilation successful"
    else
        print_error "TypeScript compilation failed"
        exit 1
    fi
    
    # Step 5: Build the application
    print_status "Step 5/7: Building application for $deployment_type..."
    
    if [ "$deployment_type" = "static" ]; then
        # Static build for GitHub Pages
        if npm run build && npm run export; then
            print_success "Static build completed successfully"
        else
            print_error "Static build failed"
            exit 1
        fi
    else
        # Regular build for Vercel/Netlify
        if npm run build; then
            print_success "Build completed successfully"
        else
            print_error "Build failed"
            exit 1
        fi
    fi
    
    # Step 6: Optimize build
    print_status "Step 6/7: Optimizing build artifacts..."
    
    # Check build size
    if [ -d "$BUILD_DIR" ]; then
        BUILD_SIZE=$(du -sh $BUILD_DIR | cut -f1)
        print_status "Build size: $BUILD_SIZE"
    fi
    
    # Analyze bundle (if analyzer is available)
    if npm list @next/bundle-analyzer &> /dev/null; then
        print_status "Running bundle analysis..."
        npm run analyze &> /dev/null || true
    fi
    
    print_success "Build optimization completed"
    
    # Step 7: Deploy based on type
    print_status "Step 7/7: Deploying to $deployment_type..."
    
    case $deployment_type in
        "vercel")
            deploy_vercel
            ;;
        "netlify")
            deploy_netlify
            ;;
        "static")
            deploy_static
            ;;
        "docker")
            deploy_docker
            ;;
        *)
            print_error "Unknown deployment type: $deployment_type"
            print_status "Available types: vercel, netlify, static, docker"
            exit 1
            ;;
    esac
    
    print_success "Deployment completed successfully! 🎉"
    print_status "Your professional travel blog is now live!"
}

# Vercel deployment
deploy_vercel() {
    if ! command -v vercel &> /dev/null; then
        print_status "Installing Vercel CLI..."
        npm install -g vercel@latest
    fi
    
    print_status "Deploying to Vercel..."
    vercel --prod
    print_success "Deployed to Vercel successfully"
}

# Netlify deployment
deploy_netlify() {
    if ! command -v netlify &> /dev/null; then
        print_status "Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    print_status "Deploying to Netlify..."
    netlify deploy --prod --dir=$BUILD_DIR
    print_success "Deployed to Netlify successfully"
}

# Static deployment (GitHub Pages)
deploy_static() {
    print_status "Preparing static files for GitHub Pages..."
    
    if [ -d "$DIST_DIR" ]; then
        print_status "Static files ready in $DIST_DIR directory"
        print_status "Upload the contents of $DIST_DIR to your web server"
        print_success "Static deployment preparation completed"
    else
        print_error "Static build directory not found"
        exit 1
    fi
}

# Docker deployment
deploy_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker to continue."
        exit 1
    fi
    
    print_status "Building Docker image..."
    docker build -t wanderlust-chronicles .
    
    print_status "Starting Docker container..."
    docker run -d -p 3000:3000 --name wanderlust-chronicles-app wanderlust-chronicles
    
    print_success "Docker deployment completed"
    print_status "Application running at http://localhost:3000"
}

# Performance audit
audit() {
    print_header "🔍 PERFORMANCE AUDIT"
    
    if ! command -v lighthouse &> /dev/null; then
        print_status "Installing Lighthouse CLI..."
        npm install -g lighthouse
    fi
    
    print_status "Running Lighthouse audit..."
    lighthouse http://localhost:3000 --output=html --output-path=lighthouse-report.html
    print_success "Lighthouse report generated: lighthouse-report.html"
}

# Clean up function
cleanup() {
    print_status "Cleaning up build artifacts..."
    rm -rf $BUILD_DIR $DIST_DIR
    print_success "Cleanup completed"
}

# Help function
show_help() {
    echo "🌟 Wanderlust Chronicles Deployment Script"
    echo
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo
    echo "Commands:"
    echo "  deploy [type]  Deploy the application"
    echo "    Types:"
    echo "      vercel     Deploy to Vercel (recommended)"
    echo "      netlify    Deploy to Netlify"
    echo "      static     Prepare for static hosting (GitHub Pages)"
    echo "      docker     Deploy using Docker"
    echo
    echo "  audit          Run performance audit"
    echo "  cleanup        Clean build artifacts"
    echo "  help           Show this help message"
    echo
}

# Main script logic
case "${1:-help}" in
    "deploy")
        deploy "${2:-vercel}"
        ;;
    "audit")
        audit
        ;;
    "cleanup")
        cleanup
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac