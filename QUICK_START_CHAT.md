# Quick Start: Deploy Chat to Vercel

## 🚀 Fastest Way (Railway - 5 minutes)

### 1. Deploy WebSocket Server

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your portfolio repository
4. In the service settings:
   - **Start Command**: `node socket-server.js`
   - **Port**: Leave as default (Railway auto-assigns)
5. Go to "Variables" tab and add:
   ```
   ALLOWED_ORIGINS=https://your-app.vercel.app,https://*.vercel.app
   ```
6. Copy your Railway URL (e.g., `https://your-app.up.railway.app`)

### 2. Configure Vercel

1. Go to your Vercel project → Settings → Environment Variables
2. Add new variable:
   - **Name**: `NEXT_PUBLIC_SOCKET_URL`
   - **Value**: Your Railway URL (from step 1.6)
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
3. Click "Save"
4. Go to "Deployments" → Click "..." on latest deployment → "Redeploy"

### 3. Test

1. Open your Vercel app
2. Click the chat button (bottom-right)
3. Enter your name and send a message
4. Open another browser window to test real-time messaging

## ✅ Done!

Your chat is now live! Messages are stored in memory (will reset on server restart).

## 🔧 Troubleshooting

**Chat not connecting?**
- Check browser console for errors
- Verify `NEXT_PUBLIC_SOCKET_URL` is set correctly in Vercel
- Make sure Railway service is running (check Railway dashboard)
- Verify CORS settings in Railway environment variables

**Need help?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

