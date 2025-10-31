# Mindpath Quick Start Guide

This is the fastest way to get Mindpath running locally.

## 🚀 5-Minute Setup

### Step 1: Generate the Application
```bash
./mindpath-genesis.sh
```

### Step 2: Start with Docker (Easiest)
```bash
docker compose up --build
```

### Step 3: Open Your Browser
```
http://localhost:3000
```

Click **"Begin Your Journey"** and start using Mindpath!

---

## 📋 Alternative: Manual Setup

If you prefer to run services separately or don't use Docker:

### Backend (Terminal 1)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/app.py
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

### Access
```
http://localhost:3000
```

---

## ✅ Verify Everything Works

Run the automated test suite:
```bash
./test-genesis.sh
```

---

## 🔧 Troubleshooting

### Docker not working?
Use manual setup instead (see above).

### Port already in use?
```bash
# Find what's using the port
lsof -i :3000  # or :5008
# Kill the process
kill -9 <PID>
```

### Backend won't start?
```bash
cd backend
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
python src/app.py
```

### Frontend can't connect?
Make sure backend is running on port 5008 first.

---

## 📚 Need More Details?

- **Full Guide**: See [README.md](./README.md)
- **Usage Instructions**: See [USAGE.md](./USAGE.md)
- **Deployment**: See [MINDPATH-VERCEL-DEPLOYMENT.md](./MINDPATH-VERCEL-DEPLOYMENT.md)

---

## 🎯 What You Get

- **Backend**: Python/Flask server with AI sentiment analysis (port 5008)
- **Frontend**: Next.js/React beautiful UI (port 3000)
- **Features**: Real-time chat, sentiment rewards (FEX/SU), empathetic guidance

---

*"This space is sacred. It is here to listen."*
