# Mindpath Usage Guide

## Quick Start

### Step 1: Generate the Application

Run the genesis script in any directory where you want to create your Mindpath instance:

```bash
./mindpath-genesis.sh
```

This will create:
- `backend/` - Python Flask server with sentiment analysis
- `frontend/` - Next.js React application
- `docker-compose.yml` - Container orchestration

### Step 2: Deploy the Application

**Option A: Local Development with Docker** (Quickest)

```bash
# Modern Docker
docker compose up --build

# Or legacy Docker Compose
docker-compose up --build
```

Open your browser to: http://localhost:3000

**Option B: Cloud Deployment with Vercel** (Production)

```bash
# Interactive deployment helper
./deploy-mindpath-vercel.sh
```

Or see [MINDPATH-VERCEL-DEPLOYMENT.md](./MINDPATH-VERCEL-DEPLOYMENT.md) for detailed cloud deployment instructions.

### Step 3: Access the Application

- **Local**: http://localhost:3000
- **Production**: Your Vercel deployment URL

Click "Begin Your Journey" to start using Mindpath.

## Using Mindpath

### The Interface

**Login Screen**
- Simple, calming interface
- Click "Begin Your Journey" to connect

**Main Portal**
- **Top Bar**: Shows your FEX (Frequency Exchange) and SU (Soul Units) balances
- **Chat Area**: Conversation with the AI co-pilot
- **Input Area**: Text field to express your thoughts and feelings
- **Anchor Button**: Submit your entry

### How It Works

1. **Express Yourself**: Type your thoughts, feelings, or experiences in the text area
2. **Anchor Your Experience**: Click the "Anchor" button to submit
3. **Receive Guidance**: The AI co-pilot analyzes your sentiment and responds with empathetic guidance
4. **Earn Rewards**: 
   - **FEX tokens**: Awarded based on entry quality and emotional coherence
   - **SU (Soul Units)**: Earned for deeper, more meaningful entries
5. **Track Progress**: Watch your balances grow as you engage with the platform

### Understanding Co-Pilot Responses

The co-pilot provides three types of responses based on sentiment analysis:

**High Positive Sentiment (>0.6)**
- Celebrates your joy and positive energy
- Acknowledges the contribution to the network
- Reinforces positive emotions

**Low Negative Sentiment (<-0.4)**
- Acknowledges the courage to express difficult feelings
- Offers compassionate support
- Asks what the feeling needs

**Neutral Sentiment**
- Confirms your experience has been anchored
- Thanks you for self-awareness
- Invites further exploration

### Reward System

**FEX (Frequency Exchange)**
- Formula: `entry_length * max(0.1, 1 + sentiment_score) / 10`
- Rewards both quantity and positive emotional coherence
- Displayed with two decimal places

**SU (Soul Units)**
- Formula: `entry_length * max(0.1, 1 + sentiment_score) / 20`
- Whole number rewards for deeper engagement
- Represents soul-level contributions

## Development

### Running Services Separately (Manual Startup)

For advanced users who want more control over the development environment, you can run the backend and frontend services separately. This is useful for debugging, development, or when you don't want to use Docker.

#### Prerequisites

Before starting, ensure you have:
- **Python 3.9+** installed (`python3 --version`)
- **pip** package manager (`pip3 --version`)
- **Node.js 18+** installed (`node --version`)
- **npm** package manager (`npm --version`)

#### Step-by-Step Manual Setup

**Step 1: Generate the Application Structure**

First, run the genesis script to create the complete application:
```bash
./mindpath-genesis.sh
```

**Step 2: Start the Backend Service**

Open a terminal and navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment (first time only):
```bash
python3 -m venv venv
```

Activate the virtual environment:
```bash
# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# You should see (venv) in your terminal prompt
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

Start the backend server:
```bash
python src/app.py
```

You should see:
```
>>> Mindpath Backend (Oracle + Ledger): ONLINE <<<
```

Backend runs on: **http://localhost:5008**

**Step 3: Start the Frontend Service (New Terminal)**

Open a **new terminal window** and navigate to the frontend directory:
```bash
cd frontend
```

Install Node.js dependencies (first time only):
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Frontend runs on: **http://localhost:3000**

**Step 4: Access the Application**

Open your web browser and navigate to:
```
http://localhost:3000
```

Click "Begin Your Journey" to start using Mindpath!

#### Environment Variables for Manual Setup

**Backend Environment Variables**

The backend works with default settings for local development. No environment variables are required.

If you need to customize, you can set:
- `PORT`: Server port (default: 5008)
- `HOST`: Server host (default: 0.0.0.0)

Example:
```bash
export PORT=5009
python src/app.py
```

**Frontend Environment Variables**

Create a `.env.local` file in the `frontend/` directory to configure the backend URL:

```bash
# frontend/.env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:5008
```

If not set, the frontend defaults to `http://localhost:5008` which works for local development.

For production or custom backends:
```bash
# Example for production backend
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

#### Stopping the Services

**To stop the backend**:
1. Press `Ctrl+C` in the backend terminal
2. Deactivate the virtual environment: `deactivate`

**To stop the frontend**:
1. Press `Ctrl+C` in the frontend terminal

### Configuration

**Backend Configuration**
- Port: 5008 (change in `backend/src/app.py` line 90)
- CORS: Allows all origins (`*`) - adjust for production
- Database: In-memory (extend for persistence in `backend/src/app.py`)
- WebSocket: Socket.IO with CORS enabled

**Frontend Configuration**
- Port: 3000 (change in `frontend/package.json` scripts section)
- Backend URL: Set via `NEXT_PUBLIC_BACKEND_URL` environment variable
- Defaults to `http://localhost:5008` for local development
- Build output: `.next/` directory (gitignored)

### Extending the Application

**Adding New Users**
Edit `backend/src/app.py`:
```python
DB = {
    "accounts": {
        "0xUserJulia": {"fex": 1000.0, "su": 100},
        "0xUserJohn": {"fex": 500.0, "su": 50}
    }
}
```

**Customizing Responses**
Modify the `get_co_pilot_guidance()` function in `backend/src/app.py` to adjust sentiment thresholds and response messages.

**Styling Changes**
- Global styles: `frontend/src/styles/globals.css`
- Component styles: `frontend/src/styles/Home.module.css`
- Color scheme defined in CSS variables in `globals.css`

## Troubleshooting

### Backend Won't Start
- **Issue**: Module not found errors
- **Solution**: Ensure virtual environment is activated and dependencies installed
  ```bash
  cd backend
  source venv/bin/activate
  pip install -r requirements.txt
  ```

### Frontend Can't Connect to Backend
- **Issue**: "Connection refused" or "Network error"
- **Solution**: 
  1. Verify backend is running on port 5008
  2. Check `NEXT_PUBLIC_BACKEND_URL` environment variable
  3. In Docker, use service name: `http://backend:5008`
  4. In local dev, use: `http://localhost:5008`

### Docker Build Fails
- **Issue**: Network timeout or build errors
- **Solution**: 
  1. Check Docker daemon is running: `docker ps`
  2. Increase Docker build timeout
  3. Verify internet connectivity for package downloads
  4. Try using `--no-cache` flag: `docker compose build --no-cache`
  5. Check Docker logs: `docker compose logs`

### Docker Compose Command Not Found
- **Issue**: `docker-compose: command not found`
- **Solution**: 
  1. For Docker v2.0+, use: `docker compose` (without hyphen)
  2. For older Docker, install docker-compose: `pip install docker-compose`
  3. Or upgrade Docker to latest version

### Port Already in Use
- **Issue**: "Port 3000/5008 is already allocated"
- **Solution**:
  1. Stop conflicting services using the port
  2. Find process: `lsof -i :3000` or `lsof -i :5008`
  3. Kill process: `kill -9 <PID>`
  4. Or change port in `docker-compose.yml` or service configuration

### Genesis Script Fails
- **Issue**: Permission denied or script errors
- **Solution**:
  1. Make script executable: `chmod +x mindpath-genesis.sh`
  2. Run with bash explicitly: `bash mindpath-genesis.sh`
  3. Check you have write permissions in current directory
  4. Ensure Python 3.9+ and Node.js 18+ are installed

### Virtual Environment Activation Fails
- **Issue**: Cannot activate venv on Windows
- **Solution**:
  1. Use: `venv\Scripts\activate` (backslashes on Windows)
  2. Or use PowerShell: `venv\Scripts\Activate.ps1`
  3. If execution policy error: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### NLTK Data Not Found
- **Issue**: "VADER lexicon not found"
- **Solution**: The backend automatically downloads it on first run. If manual download needed:
  ```python
  import nltk
  nltk.download('vader_lexicon')
  ```

## Security Notes

**For Development Use**
- `allow_unsafe_werkzeug=True` is enabled for development convenience
- CORS is open to all origins
- No authentication or authorization implemented
- In-memory database (data lost on restart)

**For Production**
- Remove or conditionally disable `allow_unsafe_werkzeug`
- Configure CORS to allow only trusted origins
- Implement proper authentication (OAuth, JWT, etc.)
- Use a persistent database (PostgreSQL, MongoDB, etc.)
- Enable HTTPS/TLS
- Add rate limiting
- Implement input validation and sanitization

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                  (http://localhost:3000)                │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Next.js Frontend (React)                │   │
│  │  - Login Screen                                 │   │
│  │  - CoPilot Chat Interface                       │   │
│  │  - Real-time State Updates                      │   │
│  └─────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │ WebSocket (Socket.IO)
                     │ Events: join, pocc, state_update
                     │
┌────────────────────▼────────────────────────────────────┐
│            Flask Backend + SocketIO                     │
│               (http://localhost:5008)                   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │     Sentiment Analysis (NLTK VADER)             │   │
│  │     - Analyzes emotional content                │   │
│  │     - Compound score: -1 (negative) to +1 (pos) │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │     Reward Engine                               │   │
│  │     - Calculates FEX and SU                     │   │
│  │     - Based on length + sentiment               │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │     Soul Ledger (In-Memory DB)                  │   │
│  │     - User accounts                             │   │
│  │     - FEX and SU balances                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Philosophy

Mindpath is designed as a **sacred space** for mental health ownership:

- **Non-judgmental**: The AI co-pilot responds with empathy, not criticism
- **Reward-based**: Positive reinforcement through FEX and SU tokens
- **Privacy-first**: In-memory storage means your data isn't persisted (by default)
- **Accessible**: Simple, calming interface reduces barriers to entry
- **Empowering**: You own your journey and your progress

---

*"This space is sacred. It is here to listen."*
