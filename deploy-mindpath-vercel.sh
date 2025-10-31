#!/bin/bash
# Mindpath Vercel Deployment Helper Script
# This script helps deploy the Mindpath application to Vercel

set -e

echo "============================================"
echo "   Mindpath Vercel Deployment Helper"
echo "============================================"
echo ""

# Check if mindpath-genesis.sh has been run
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Mindpath application not found."
    echo ""
    echo "Please run './mindpath-genesis.sh' first to generate the application."
    echo ""
    exit 1
fi

echo "✅ Mindpath application found"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
    echo ""
fi

echo "📝 Deployment Steps:"
echo ""
echo "1. Backend Deployment (Required First)"
echo "   - The backend CANNOT be deployed to Vercel (WebSocket limitations)"
echo "   - Deploy to Render.com, Railway.app, or similar platform"
echo "   - Use 'render-mindpath.yaml' for Render.com deployment"
echo ""
read -p "Have you deployed the backend? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Please deploy the backend first:"
    echo "  - Go to https://render.com"
    echo "  - Create a new Web Service"
    echo "  - Use the 'render-mindpath.yaml' blueprint"
    echo "  - Or follow MINDPATH-VERCEL-DEPLOYMENT.md"
    echo ""
    exit 1
fi

echo ""
read -p "Enter your backend URL (e.g., https://mindpath-backend.onrender.com): " BACKEND_URL

if [ -z "$BACKEND_URL" ]; then
    echo "❌ Backend URL is required"
    exit 1
fi

echo ""
echo "2. Frontend Deployment to Vercel"
echo ""

# Create .env.local for testing
cd frontend
cat > .env.local << EOF
NEXT_PUBLIC_BACKEND_URL=$BACKEND_URL
EOF

echo "✅ Created frontend/.env.local with backend URL"
echo ""

# Option to test locally first
read -p "Would you like to test locally first? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Installing dependencies..."
    npm install
    echo ""
    echo "Starting development server..."
    echo "Test at: http://localhost:3000"
    echo ""
    echo "Press Ctrl+C when done testing, then run this script again to deploy."
    npm run dev
    exit 0
fi

# Deploy to Vercel
echo ""
echo "Deploying frontend to Vercel..."
echo ""

# Copy vercel config if needed
if [ ! -f "vercel.json" ]; then
    if [ -f "../frontend-vercel.json" ]; then
        cp ../frontend-vercel.json vercel.json
        echo "✅ Copied vercel.json configuration"
    fi
fi

# Set environment variable for Vercel
echo "Setting environment variable..."
vercel env add NEXT_PUBLIC_BACKEND_URL production <<EOF
$BACKEND_URL
EOF

# Deploy
echo ""
echo "Deploying to Vercel..."
vercel --prod

echo ""
echo "============================================"
echo "   Deployment Complete! 🎉"
echo "============================================"
echo ""
echo "Next steps:"
echo "1. Copy your Vercel deployment URL"
echo "2. Update backend CORS settings to allow your Vercel domain"
echo "3. Test the application end-to-end"
echo ""
echo "For CORS update, edit backend/src/app.py:"
echo "  CORS(app, origins=['https://your-app.vercel.app'])"
echo "  socketio = SocketIO(app, cors_allowed_origins=['https://your-app.vercel.app'])"
echo ""
echo "Then redeploy the backend."
echo ""
