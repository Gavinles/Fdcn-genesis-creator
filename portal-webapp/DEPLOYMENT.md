# Portal-Webapp Deployment Guide

This guide explains how to deploy the portal-webapp (with Universal Code UI) to Vercel.

## Quick Deploy to Vercel

### Option 1: Via Vercel Dashboard (Recommended for First-Time)

1. **Push your code to GitHub** (if not already done)

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
   - Sign in with your GitHub account

3. **Import the Repository**
   - Click "Add New..." → "Project"
   - Import your `Fdcn-genesis-creator` repository
   - Vercel will auto-detect it's a monorepo

4. **Configure the Project**
   - **Project Name**: `portal-webapp` (or choose your own)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `portal-webapp` ⚠️ **IMPORTANT**
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your site will be live at: `https://portal-webapp-[random].vercel.app`

6. **Access the Code UI**
   - Navigate to: `https://your-deployed-url.vercel.app/code-ui`

### Option 2: Via Vercel CLI (For Developers)

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Navigate to the portal-webapp directory**
   ```bash
   cd portal-webapp
   ```

3. **Deploy to Vercel**
   ```bash
   # First time: links project to Vercel
   vercel
   
   # Follow the prompts:
   # - Set up and deploy? Yes
   # - Which scope? (select your account)
   # - Link to existing project? No
   # - What's your project's name? portal-webapp
   # - In which directory is your code located? ./
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

5. **Your site is now live!**
   - The CLI will display your deployment URL
   - Access the Code UI at: `https://your-url.vercel.app/code-ui`

### Option 3: GitHub Integration (Automatic Deployments)

1. **Connect Vercel to your GitHub repository** (done once during first deploy)

2. **Enable Auto-deployments**
   - Every push to `main` branch will trigger a production deployment
   - Pull requests will create preview deployments

3. **Branch deployments**
   - Each branch gets its own preview URL
   - Perfect for testing new features

## Accessing the Universal Code UI

After deployment, the Code UI is available at:
```
https://your-deployment-url.vercel.app/code-ui
```

### Features Available:
- ✅ Multi-language code editor (JavaScript, Python, CSS, Shell)
- ✅ File tree navigation
- ✅ Syntax highlighting with Prism.js
- ✅ COSE cryptography panel (stub implementation)
- ✅ Dark theme matching VS Code

## Configuration

### Environment Variables (Optional)

If you need to wire the Code UI to backend services, add these environment variables in Vercel:

1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add variables as needed:

```bash
# Example: Backend file API
NEXT_PUBLIC_FILE_API_URL=https://your-backend.com/api/files

# Example: COSE cryptography service
NEXT_PUBLIC_COSE_API_URL=https://your-backend.com/api/cose
```

## Troubleshooting

### Build Fails

**Issue**: Build fails with "Module not found"
**Solution**: Ensure all dependencies are in `package.json` and committed to git

**Issue**: Build fails with TypeScript errors
**Solution**: The project has `strict: false` in `tsconfig.json`, but you may need to fix type errors

### Page Not Found

**Issue**: `/code-ui` shows 404
**Solution**: Ensure the file exists at `src/pages/code-ui.tsx` and is committed to git

### Styles Not Loading

**Issue**: Page loads but styling is broken
**Solution**: Ensure Prism.js CSS is imported in the component. The current setup imports it automatically.

## Custom Domain

To add a custom domain:

1. Go to your project in Vercel Dashboard
2. Settings → Domains
3. Add your domain (e.g., `code.yourdomain.com`)
4. Configure DNS records as instructed by Vercel
5. Access your Code UI at: `https://code.yourdomain.com/code-ui`

## Monitoring and Analytics

Vercel provides:
- **Real-time logs**: View build and runtime logs
- **Analytics**: Track page views and performance
- **Deployment history**: Roll back to previous versions if needed

## Production Checklist

Before going to production:

- [ ] Test all features in preview deployment
- [ ] Configure environment variables
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics (optional)
- [ ] Wire backend services for file operations
- [ ] Implement real COSE cryptography
- [ ] Add authentication if needed
- [ ] Test on mobile devices
- [ ] Set up monitoring and alerts

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Project Issues**: Use GitHub issues in your repository

---

**Your Code UI is now live on Vercel! 🚀**

Access it at: `https://your-deployment-url.vercel.app/code-ui`
