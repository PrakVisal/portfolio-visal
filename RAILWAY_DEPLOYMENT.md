# Deploy WebSocket Server to Railway - Step by Step Guide

## Overview

You have **two options** for deploying to Railway:

1. **Option A: Deploy the whole project** (Recommended - easier to manage)
   - Deploy your entire portfolio repository
   - Configure Railway to run only the socket server
   - Single repository, easier updates

2. **Option B: Deploy only socket-server.js** (Alternative)
   - Create a minimal deployment with just the socket server
   - Smaller footprint, but requires maintaining two repos

**We recommend Option A** - deploying the whole project but configuring it to run the socket server.

---

## Option A: Deploy Whole Project (Recommended)

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (recommended for easy repo connection)

### Step 2: Create New Project

1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"**
3. Choose your **portfolio-visal** repository
4. Railway will create a new project

### Step 3: Configure the Service

1. Railway will auto-detect it's a Node.js project
2. Click on the service to open settings
3. Go to **"Settings"** tab
4. Configure the following:

   **Start Command:**

   ```
   node socket-server.js
   ```

   **Build Command:**

   ```
   npm install
   ```

   (or leave empty - Railway will auto-detect)

### Step 4: Set Environment Variables

1. Go to **"Variables"** tab in Railway
2. Click **"New Variable"**
3. Add these variables:

   **Variable 1:**
   - Name: `PORT`
   - Value: `3001` (or leave empty - Railway auto-assigns)
   - (Railway will override this with their port, but it's good to have a default)

   **Variable 2:**
   - Name: `ALLOWED_ORIGINS`
   - Value: `https://your-vercel-app.vercel.app,https://*.vercel.app`
   - Replace `your-vercel-app` with your actual Vercel domain
   - Example: `https://prakvisal.vercel.app,https://*.vercel.app`

### Step 5: Deploy

1. Railway will automatically start deploying
2. Wait for deployment to complete (usually 1-2 minutes)
3. Check the **"Deployments"** tab to see logs
4. You should see: `🚀 WebSocket server running on port...`

### Step 6: Get Your Railway URL

1. Go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Railway provides a default domain like: `your-app.up.railway.app`
4. **Copy this URL** - you'll need it for Vercel

### Step 7: Configure Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Add:
   - **Name**: `NEXT_PUBLIC_SOCKET_URL`
   - **Value**: Your Railway URL (e.g., `https://your-app.up.railway.app`)
   - **Environments**: Check all (Production, Preview, Development)
5. Click **"Save"**
6. Go to **Deployments** → Click **"..."** on latest → **"Redeploy"**

### Step 8: Test

1. Open your Vercel app in browser
2. Open browser DevTools (F12) → Console tab
3. Click the chat button
4. You should see: `Connected to chat server`
5. Send a test message
6. Open another browser window to test real-time messaging

---

## Option B: Deploy Only Socket Server (Alternative)

If you prefer a separate, minimal deployment:

### Step 1: Create Minimal Repository (Optional)

You can create a separate minimal repo with just:

- `socket-server.js`
- `package.json` (minimal version)
- `.gitignore`

Or deploy directly from your main repo but configure it differently.

### Step 2: Deploy to Railway

1. Follow Steps 1-2 from Option A
2. In Railway settings, set:
   - **Root Directory**: Leave empty (or create a subfolder)
   - **Start Command**: `node socket-server.js`
3. Railway will install all dependencies from your main `package.json`
4. Follow Steps 4-8 from Option A

---

## Railway Configuration Summary

### What Railway Needs:

✅ **Start Command**: `node socket-server.js`  
✅ **Environment Variables**:

- `ALLOWED_ORIGINS` (your Vercel URLs)
- `PORT` (optional - Railway auto-assigns)

### What Gets Deployed:

- ✅ Your entire repository (all files)
- ✅ All dependencies from `package.json`
- ✅ But only `socket-server.js` runs (because of Start Command)

### What Doesn't Run:

- ❌ Next.js app (that runs on Vercel)
- ❌ The integrated `server.js` (only needed for local dev)

---

## Troubleshooting

### Issue: "Cannot find module 'socket.io'"

**Solution**: Make sure `socket.io` is in your `package.json` dependencies (it should be already).

### Issue: "Port already in use"

**Solution**: Remove the `PORT` environment variable - Railway will auto-assign one.

### Issue: CORS errors in browser

**Solution**:

1. Check `ALLOWED_ORIGINS` includes your exact Vercel URL
2. Include both specific URL and wildcard: `https://your-app.vercel.app,https://*.vercel.app`
3. Make sure no trailing slashes in URLs

### Issue: Connection timeout

**Solution**:

1. Check Railway service is running (green status)
2. Verify Railway URL is correct in Vercel env vars
3. Check Railway logs for errors

### Issue: "User connected" but messages not working

**Solution**: Check Railway logs - you should see connection messages. If not, verify the socket server is actually running.

---

## Railway Dashboard Overview

After deployment, you'll see:

- **Metrics**: CPU, Memory usage
- **Logs**: Real-time server logs
- **Deployments**: Deployment history
- **Settings**: Configuration
- **Variables**: Environment variables
- **Domains**: Your Railway URL

---

## Cost

Railway offers:

- **Free Trial**: $5 credit
- **Hobby Plan**: $5/month (includes $5 credit)
- **Pro Plan**: $20/month

For a portfolio chat server, the free trial or hobby plan is usually sufficient.

---

## Quick Checklist

- [ ] Railway account created
- [ ] Project created from GitHub repo
- [ ] Start Command set to: `node socket-server.js`
- [ ] `ALLOWED_ORIGINS` environment variable added
- [ ] Railway URL copied
- [ ] `NEXT_PUBLIC_SOCKET_URL` added to Vercel
- [ ] Vercel app redeployed
- [ ] Chat tested in browser

---

## Next Steps

Once deployed:

1. ✅ Test the chat feature
2. ✅ Monitor Railway logs for any issues
3. (Optional) Add custom domain to Railway
4. (Optional) Set up database for message persistence
5. (Optional) Add authentication for chat

---

## Need Help?

- Check Railway logs in the dashboard
- Check browser console for connection errors
- Verify environment variables are set correctly
- See `DEPLOYMENT.md` for more detailed troubleshooting
