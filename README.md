# Mindpath Genesis Creator

The OS for Taking Ownership of Your Mental Health

## Overview

This repository contains the **Mindpath Genesis Kit** - a complete, deployable mental health application that combines AI-powered sentiment analysis with a compassionate co-pilot interface. The application helps users journal their thoughts and feelings while receiving empathetic guidance and tracking their emotional progress.

## What is Mindpath?

Mindpath is a full-stack application consisting of:
- **Backend Service**: Python/Flask server with WebSocket support, sentiment analysis using NLTK VADER, and an in-memory "Soul Ledger" database
- **Frontend Application**: Next.js/React portal with a beautiful, calming UI for journaling and reflection
- **Containerized Deployment**: Docker containers and docker-compose orchestration for easy deployment

## Quick Start

**⚡ In a hurry?** See [QUICKSTART.md](./QUICKSTART.md) for a 5-minute setup guide.

### Prerequisites

- Docker and Docker Compose installed (for local deployment)
- Python 3.9+ (for development)
- Node.js 18+ (for development)
- Vercel account (for Vercel deployment)
- Render.com or Railway account (for backend hosting)

### Option 1: Local Deployment with Docker

1. **Run the genesis script** to create the entire application structure:
   ```bash
   ./mindpath-genesis.sh
   ```

2. **Start the application** with Docker:
   ```bash
   # Modern Docker (v2.0+)
   docker compose up --build
   
   # Or legacy Docker Compose
   docker-compose up --build
   ```

3. **Access Mindpath** in your browser:
   ```
   http://localhost:3000
   ```

That's it! The Mindpath portal will greet you with a login screen. Click "Begin Your Journey" to start.

### Option 2: Cloud Deployment with Vercel

For production deployment to Vercel (frontend) and Render.com (backend):

1. **Run the genesis script** to create the application structure:
   ```bash
   ./mindpath-genesis.sh
   ```

2. **Deploy using the helper script**:
   ```bash
   ./deploy-mindpath-vercel.sh
   ```

3. **Or follow the detailed guide**: See [MINDPATH-VERCEL-DEPLOYMENT.md](./MINDPATH-VERCEL-DEPLOYMENT.md) for comprehensive deployment instructions.

**Important**: The backend requires WebSocket support and cannot be deployed to Vercel. Deploy it to Render.com, Railway.app, or similar platforms that support persistent connections.

### Option 3: Manual Service Startup (Advanced)

For development or debugging, you can run the backend and frontend services separately:

**Step 1: Generate the application structure**
```bash
./mindpath-genesis.sh
```

**Step 2: Start the Backend Service**
```bash
cd backend

# Create and activate virtual environment (first time only)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
python src/app.py
```

The backend will start on `http://localhost:5008`

**Step 3: Start the Frontend Service (in a new terminal)**
```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:3000`

**Step 4: Access the Application**

Open your browser to `http://localhost:3000` and click "Begin Your Journey"

#### Environment Variables for Manual Setup

**Backend**: No environment variables required for local development.

**Frontend**: Create a `.env.local` file in the `frontend/` directory (optional, defaults work for local):
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:5008
```

## Local Test Network & Verification

### Automated Testing

To verify the entire system works correctly, run the automated test script:

```bash
./test-genesis.sh
```

This comprehensive test script will:
- ✅ Run the genesis script in a temporary directory
- ✅ Verify all expected files and directories are created
- ✅ Check Python syntax in backend files
- ✅ Validate JSON syntax in frontend files
- ✅ Verify critical backend functionality (socket events, sentiment analysis)
- ✅ Validate frontend configuration (environment variables, components)
- ✅ Clean up automatically after testing

The test passes if all checks succeed and returns exit code 0.

### Manual Verification Steps

After running `./mindpath-genesis.sh`, you can manually verify the deployment:

1. **Check Directory Structure**:
   ```bash
   ls -la backend/ frontend/ docker-compose.yml
   ```

2. **Verify Backend Files**:
   ```bash
   python3 -m py_compile backend/src/app.py
   cat backend/requirements.txt
   ```

3. **Verify Frontend Files**:
   ```bash
   node -e "JSON.parse(require('fs').readFileSync('frontend/package.json'))"
   cat frontend/src/pages/index.js
   ```

4. **Test Docker Compose Configuration**:
   ```bash
   docker compose config
   ```

## What the Script Creates

When you run `mindpath-genesis.sh`, it generates:

```
.
├── backend/
│   ├── src/
│   │   └── app.py              # Flask backend with sentiment analysis
│   ├── requirements.txt         # Python dependencies
│   ├── Dockerfile              # Backend container configuration
│   └── venv/                   # Python virtual environment
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── _app.js        # Next.js app wrapper
│   │   │   └── index.js       # Main portal page
│   │   ├── components/
│   │   │   └── CoPilot.js     # Co-pilot chat interface
│   │   └── styles/
│   │       ├── globals.css    # Global styles
│   │       └── Home.module.css # Component styles
│   ├── public/                # Static assets
│   ├── package.json           # Node dependencies
│   ├── next.config.js         # Next.js configuration
│   └── Dockerfile             # Frontend container configuration
└── docker-compose.yml         # Orchestration configuration
```

## How It Works

### Backend Features

- **Sentiment Analysis**: Uses NLTK's VADER (Valence Aware Dictionary and sEntiment Reasoner) to analyze the emotional content of journal entries
- **Dynamic Rewards**: Awards FEX (Frequency Exchange) tokens and SU (Soul Units) based on entry quality and emotional coherence
- **Co-Pilot Guidance**: Provides empathetic, context-aware responses based on sentiment analysis
- **Real-time Updates**: WebSocket communication for instant feedback and state synchronization

### Frontend Features

- **Sacred Space**: Calming, thoughtfully designed interface with soothing color palette
- **Real-time Chat**: Instant messaging with the AI co-pilot
- **Progress Tracking**: Live display of FEX and SU balances
- **Responsive Design**: Works beautifully on desktop and mobile

## Development

### Backend Development

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python src/app.py
```

The backend will be available at `http://localhost:5008`

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Architecture

- **Backend**: Flask + Flask-SocketIO + NLTK
- **Frontend**: Next.js 13 + React 18 + Socket.IO Client
- **Communication**: WebSocket for real-time bidirectional communication
- **Data**: In-memory store (extendable to persistent database)

## Deployment

### Cloud Deployment Options

Mindpath can be deployed to various cloud platforms. See [MINDPATH-VERCEL-DEPLOYMENT.md](./MINDPATH-VERCEL-DEPLOYMENT.md) for detailed instructions.

#### Supported Platforms

- **Frontend**: Vercel, Netlify, Render.com, Railway.app
- **Backend**: Render.com, Railway.app, Heroku, DigitalOcean (requires WebSocket support)

#### Quick Deployment Guide

1. **Backend** (must support WebSockets):
   - Use `render-mindpath.yaml` for Render.com
   - Or deploy to Railway.app
   - Copy the deployed backend URL

2. **Frontend**:
   - Set environment variable: `NEXT_PUBLIC_BACKEND_URL=<your-backend-url>`
   - Deploy to Vercel using `vercel.json` configuration
   - Or use the helper script: `./deploy-mindpath-vercel.sh`

3. **Update CORS**:
   - Configure backend to allow your frontend domain
   - Update `backend/src/app.py` CORS settings
   - Redeploy backend

See the full deployment guide for step-by-step instructions.

## Testing

To verify the genesis script works correctly:

```bash
./test-genesis.sh
```

This will:
- Run the genesis script in a temporary directory
- Verify all files are created correctly
- Check Python syntax and JSON validity
- Validate critical functionality (socket events, environment variables)
- Clean up automatically

## Troubleshooting

### Common Issues and Solutions

**Docker Compose Not Found**
```bash
# Use modern Docker syntax (v2.0+)
docker compose up --build

# Or install docker-compose for older versions
pip install docker-compose
```

**Port Already in Use**
```bash
# Find and kill process using the port
lsof -i :3000  # or :5008 for backend
kill -9 <PID>
```

**Backend Module Not Found**
```bash
# Activate virtual environment and reinstall
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

**Frontend Can't Connect to Backend**
- Ensure backend is running on port 5008
- Check `NEXT_PUBLIC_BACKEND_URL` is set correctly
- For Docker: use `http://backend:5008`
- For local dev: use `http://localhost:5008`

**NLTK Data Not Found**
The backend automatically downloads VADER lexicon on first run. If it fails:
```bash
python3 -c "import nltk; nltk.download('vader_lexicon')"
```

**Genesis Script Permission Denied**
```bash
chmod +x mindpath-genesis.sh test-genesis.sh
./mindpath-genesis.sh
```

For more detailed troubleshooting, see [USAGE.md](./USAGE.md#troubleshooting).

## Security Considerations

**Important**: The generated application is configured for **development and demonstration purposes**. Before deploying to production, consider:

- **CORS Configuration**: Currently allows all origins (`*`). Restrict to specific domains in production.
- **Werkzeug Safety**: The `allow_unsafe_werkzeug=True` flag is enabled for development. Remove or make conditional for production.
- **Authentication**: No authentication is implemented. Add proper user authentication before production use.
- **Data Persistence**: Uses in-memory storage. Implement a proper database for production.
- **HTTPS**: Configure TLS/SSL for encrypted communication in production.
- **Rate Limiting**: Add rate limiting to prevent abuse.

See USAGE.md for detailed security recommendations.

## The Vision

Mindpath is the first light of a new world where individuals take ownership of their mental health through technology that listens, understands, and supports without judgment. This is not just code—it's a living artifact designed to help humanity heal.

## License

This project is part of the FDCN Genesis Creator initiative.

---

*"We are one."*
