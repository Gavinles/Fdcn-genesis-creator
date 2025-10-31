# Mindpath Deployment Quick Reference

## 🚀 Prerequisites Checklist

- [ ] Run `./mindpath-genesis.sh` to generate the application
- [ ] Have a Render.com or Railway.app account (for backend)
- [ ] Have a Vercel account (for frontend)
- [ ] Backend is deployed and URL is available

## 📦 File Overview

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel config for deploying from repository root |
| `frontend-vercel.json` | Vercel config for deploying frontend directory directly |
| `render-mindpath.yaml` | Render.com blueprint for backend deployment |
| `deploy-mindpath-vercel.sh` | Interactive deployment helper script |
| `frontend.env.example` | Example environment variables for frontend |
| `.vercelignore` | Files to exclude from Vercel deployment |
| `MINDPATH-VERCEL-DEPLOYMENT.md` | Full deployment documentation |

## ⚡ Quick Deploy Commands

### Step 1: Deploy Backend to Render.com

```bash
# Option A: Via Render Dashboard
# 1. Go to https://render.com
# 2. New → Blueprint
# 3. Connect repo and use render-mindpath.yaml
# 4. Copy the deployed URL

# Option B: Via Render CLI
render blueprint launch
```

### Step 2: Deploy Frontend to Vercel

```bash
# Copy config to frontend directory
cp frontend-vercel.json frontend/vercel.json

# Deploy
cd frontend
vercel --prod

# Add environment variable
vercel env add NEXT_PUBLIC_BACKEND_URL production
# Paste your backend URL when prompted
```

## 🔧 Environment Variables

### Frontend (Vercel)
```bash
NEXT_PUBLIC_BACKEND_URL=https://mindpath-backend.onrender.com
```

### Backend (Render.com)
These are typically auto-configured:
```bash
PORT=5008
PYTHON_VERSION=3.9.0
```

## 🔄 Update Flow

When you need to update the deployment:

### Update Backend
```bash
# Changes are automatically deployed when you push to main branch
# Or manually trigger from Render dashboard
```

### Update Frontend
```bash
cd frontend
vercel --prod
```

## 🐛 Common Issues

### Issue: Frontend can't connect to backend
**Solution:**
1. Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly in Vercel
2. Check backend CORS allows your Vercel domain
3. Ensure backend is running (check Render logs)

### Issue: CORS errors
**Solution:** Update `backend/src/app.py`:
```python
CORS(app, origins=["https://your-app.vercel.app", "http://localhost:3000"])
socketio = SocketIO(app, cors_allowed_origins=["https://your-app.vercel.app", "http://localhost:3000"])
```

### Issue: Backend WebSocket not connecting
**Solution:**
- Verify Render service is running (not sleeping)
- Check that WebSocket connections are allowed
- Review Render logs for connection errors

## 📋 Deployment Checklist

### Initial Deployment
- [ ] Generate app: `./mindpath-genesis.sh`
- [ ] Deploy backend to Render.com
- [ ] Copy backend URL
- [ ] Set `NEXT_PUBLIC_BACKEND_URL` in Vercel
- [ ] Deploy frontend to Vercel
- [ ] Test connection end-to-end
- [ ] Update backend CORS with Vercel domain
- [ ] Redeploy backend
- [ ] Test again

### Subsequent Deployments
- [ ] Make code changes
- [ ] Test locally with Docker Compose
- [ ] Push to repository
- [ ] Backend auto-deploys (if configured)
- [ ] Deploy frontend: `vercel --prod`
- [ ] Test production deployment

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com
- **Vercel CLI Docs**: https://vercel.com/docs/cli
- **Render Blueprint Docs**: https://render.com/docs/infrastructure-as-code

## 💡 Tips

1. **Free Tier Limits**: 
   - Render: Backend may sleep after 15 min of inactivity
   - Vercel: Generous free tier for frontend

2. **Environment Variables**: 
   - Always prefix with `NEXT_PUBLIC_` for client-side Next.js variables
   - Never commit secrets to repository

3. **Testing**:
   - Test locally first: `docker compose up --build`
   - Use staging deployments on Vercel for testing

4. **Monitoring**:
   - Check Render logs for backend issues
   - Use Vercel analytics for frontend performance
   - Monitor WebSocket connection status

## 📞 Need Help?

- Full documentation: [MINDPATH-VERCEL-DEPLOYMENT.md](./MINDPATH-VERCEL-DEPLOYMENT.md)
- Repository README: [README.md](./README.md)
- Vercel Support: https://vercel.com/support
- Render Support: https://render.com/support
