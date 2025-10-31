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

### Step 2: Deploy with Docker

```bash
# Modern Docker
docker compose up --build

# Or legacy Docker Compose
docker-compose up --build
```

### Step 3: Access the Application

Open your browser to: http://localhost:3000

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

### Running Services Separately

**Backend Only**
```bash
cd backend
source venv/bin/activate  # First time: python3 -m venv venv
pip install -r requirements.txt
python src/app.py
```
Backend runs on: http://localhost:5008

**Frontend Only**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:3000

### Configuration

**Backend**
- Port: 5008 (configurable in `backend/src/app.py`)
- CORS: Allows all origins (adjust for production)
- Database: In-memory (extend for persistence)

**Frontend**
- Port: 3000 (configurable in `frontend/package.json`)
- Backend URL: Set via `NEXT_PUBLIC_BACKEND_URL` environment variable
- Defaults to `http://localhost:5008` for local development

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
  1. Check Docker daemon is running
  2. Increase Docker build timeout
  3. Verify internet connectivity for package downloads

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
