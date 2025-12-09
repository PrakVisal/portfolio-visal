# 🚂 Railway Deployment - Quick Guide

## Answer: Deploy the WHOLE Project

**Yes, you deploy your entire project to Railway**, but configure it to run **only** the socket server.

---

## 📋 Step-by-Step (5 minutes)

### Step 1: Go to Railway
👉 [railway.app](https://railway.app) → Sign up with GitHub

### Step 2: Create New Project
1. Click **"New Project"**
2. Click **"Deploy from GitHub repo"**
3. Select your **portfolio-visal** repository
4. Click **"Deploy Now"**

### Step 3: Configure Service
1. Railway will create a service automatically
2. Click on the service name
3. Go to **"Settings"** tab
4. Find **"Start Command"** section
5. Enter:
   ```
   node socket-server.js
   ```
6. Click **"Save"**

### Step 4: Add Environment Variables
1. Go to **"Variables"** tab
2. Click **"+ New Variable"**
3. Add this variable:
   - **Name**: `ALLOWED_ORIGINS`
   - **Value**: `https://your-vercel-app.vercel.app,https://*.vercel.app`
   - Replace `your-vercel-app` with your actual Vercel domain
   - Example: `https://prakvisal.vercel.app,https://*.vercel.app`
4. Click **"Add"**

### Step 5: Get Your Railway URL
1. Go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. You'll see a domain like: `your-app-production.up.railway.app`
4. **Copy this URL** (you'll need it for Vercel)

### Step 6: Configure Vercel
1. Go to [vercel.com](https://vercel.com) → Your project
2. Go to **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Add:
   - **Name**: `NEXT_PUBLIC_SOCKET_URL`
   - **Value**: Paste your Railway URL (from Step 5)
   - Check all environments: ✅ Production, ✅ Preview, ✅ Development
5. Click **"Save"**
6. Go to **Deployments** → Click **"..."** → **"Redeploy"**

### Step 7: Test! 🎉
1. Open your Vercel app
2. Click the chat button (bottom-right)
3. Enter your name
4. Send a message
5. Open another browser window to test real-time chat

---

## 🎯 What Gets Deployed?

✅ **Your entire repository** (all files)  
✅ **All dependencies** (from package.json)  
✅ **But only `socket-server.js` runs** (because of Start Command)

---

## 🔍 Visual Guide

```
Your Repository (GitHub)
    │
    ├── app/              ← Not used by Railway
    ├── components/      ← Not used by Railway
    ├── socket-server.js  ← ✅ THIS RUNS ON RAILWAY
    ├── server.js         ← Not used (only for local dev)
    └── package.json      ← ✅ Used (installs dependencies)
```

**Railway Configuration:**
- **Start Command**: `node socket-server.js`
- **Result**: Only the socket server runs, not the Next.js app

---

## ⚙️ Railway Settings Summary

| Setting | Value |
|---------|-------|
| **Start Command** | `node socket-server.js` |
| **Build Command** | (leave empty - auto-detected) |
| **Root Directory** | (leave empty) |
| **Environment Variable** | `ALLOWED_ORIGINS=https://your-app.vercel.app,https://*.vercel.app` |

---

## ❓ Common Questions

### Q: Do I need to create a separate repository?
**A:** No! Deploy your existing repository.

### Q: Will Railway run my Next.js app?
**A:** No! Only `socket-server.js` runs because of the Start Command.

### Q: What if I update my code?
**A:** Railway auto-deploys when you push to GitHub (if connected).

### Q: Can I deploy both Next.js and socket server on Railway?
**A:** Yes, but you'd need two separate services. It's easier to:
- Next.js → Vercel (free, optimized)
- Socket Server → Railway (for WebSocket support)

---

## 🐛 Troubleshooting

**Problem**: "Cannot find module 'socket.io'"  
**Solution**: Make sure `socket.io` is in your `package.json` (it should be already)

**Problem**: CORS errors  
**Solution**: Check `ALLOWED_ORIGINS` includes your exact Vercel URL

**Problem**: Connection timeout  
**Solution**: 
1. Check Railway service is running (green status)
2. Verify Railway URL in Vercel env vars
3. Check Railway logs

---

## ✅ Checklist

- [ ] Railway account created
- [ ] Project deployed from GitHub
- [ ] Start Command set: `node socket-server.js`
- [ ] `ALLOWED_ORIGINS` variable added
- [ ] Railway URL copied
- [ ] `NEXT_PUBLIC_SOCKET_URL` added to Vercel
- [ ] Vercel redeployed
- [ ] Chat tested in browser

---

## 💰 Cost

- **Free Trial**: $5 credit (enough to test)
- **Hobby Plan**: $5/month (includes $5 credit)
- For a portfolio, free trial is usually enough to start!

---

## 📚 More Help

- Detailed guide: See `RAILWAY_DEPLOYMENT.md`
- General deployment: See `DEPLOYMENT.md`
- Quick start: See `QUICK_START_CHAT.md`

