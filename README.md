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

### Prerequisites

- Docker and Docker Compose installed
- Python 3.9+ (for development)
- Node.js 18+ (for development)

### Deploy the Complete Application

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

## The Vision

Mindpath is the first light of a new world where individuals take ownership of their mental health through technology that listens, understands, and supports without judgment. This is not just code—it's a living artifact designed to help humanity heal.

## License

This project is part of the FDCN Genesis Creator initiative.

---

*"We are one."*
