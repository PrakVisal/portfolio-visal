# Deployment Guide for Chat Feature

This guide explains how to deploy the chat feature with WebSocket support to Vercel.

## Overview

Since Vercel is a serverless platform, WebSocket connections require a separate server. This guide shows you how to:

1. Deploy your Next.js app to Vercel (as usual)
2. Deploy the WebSocket server separately (Railway, Render, or Fly.io)
3. Connect them together

## Option 1: Deploy WebSocket Server to Railway (Recommended)

### Step 1: Deploy WebSocket Server to Railway

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Create a new project** and select "Deploy from GitHub repo"

3. **Configure the service:**
   - **Root Directory**: Leave empty (or set to project root)
   - **Build Command**: (not needed for Node.js)
   - **Start Command**: `node socket-server.js`
   - **Port**: Railway will automatically assign a port (use `PORT` env var)

4. **Set Environment Variables:**

   ```
   PORT=3001
   ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,https://*.vercel.app
   ```

5. **Get your Railway URL:**
   - Railway will provide a URL like: `https://your-app.up.railway.app`
   - Note this URL for the next step

### Step 2: Configure Vercel

1. **Go to your Vercel project settings**

2. **Add Environment Variable:**
   - Variable name: `NEXT_PUBLIC_SOCKET_URL`
   - Value: Your Railway WebSocket server URL (e.g., `https://your-app.up.railway.app`)
   - Make sure it's available for **Production**, **Preview**, and **Development**

3. **Redeploy your Vercel app** to apply the changes

## Option 2: Deploy WebSocket Server to Render

### Step 1: Deploy to Render

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service:**
   - Connect your GitHub repository
   - **Name**: `portfolio-chat-server`
   - **Environment**: Node
   - **Build Command**: (leave empty)
   - **Start Command**: `node socket-server.js`
   - **Plan**: Free tier is fine for testing

3. **Set Environment Variables:**

   ```
   PORT=10000
   ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
   ```

4. **Get your Render URL:**
   - Render will provide: `https://your-app.onrender.com`

### Step 2: Configure Vercel

Same as Railway - add `NEXT_PUBLIC_SOCKET_URL` environment variable pointing to your Render URL.

## Option 3: Deploy WebSocket Server to Fly.io

### Step 1: Install Fly CLI

```bash
# macOS/Linux
curl -L https://fly.io/install.sh | sh

# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex
```

### Step 2: Create Fly.io App

1. **Login to Fly.io:**

   ```bash
   fly auth login
   ```

2. **Create a new app:**

   ```bash
   fly launch --name portfolio-chat-server
   ```

3. **Create `fly.toml`** in your project root:

   ```toml
   app = "portfolio-chat-server"
   primary_region = "iad"

   [build]

   [http_service]
     internal_port = 3001
     force_https = true
     auto_stop_machines = true
     auto_start_machines = true
     min_machines_running = 0
     processes = ["app"]

   [[vm]]
     memory_mb = 256
   ```

4. **Deploy:**

   ```bash
   fly deploy
   ```

5. **Set environment variables:**
   ```bash
   fly secrets set ALLOWED_ORIGINS="https://your-vercel-app.vercel.app"
   ```

### Step 2: Configure Vercel

Add `NEXT_PUBLIC_SOCKET_URL` pointing to your Fly.io URL (e.g., `https://portfolio-chat-server.fly.dev`).

## Local Development

For local development, you have two options:

### Option A: Use Integrated Server (Recommended for local)

```bash
npm run dev
```

This runs both Next.js and WebSocket server together on port 3000.

### Option B: Run Separately

Terminal 1 (Next.js):

```bash
npm run dev:next
```

Terminal 2 (WebSocket Server):

```bash
npm run dev:socket
```

Then set in `.env.local`:

```
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## Environment Variables Summary

### For Vercel (Next.js App):

```
NEXT_PUBLIC_SOCKET_URL=https://your-socket-server-url.com
```

### For WebSocket Server (Railway/Render/Fly.io):

```
PORT=3001
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,https://*.vercel.app
```

## Testing the Deployment

1. **Deploy both services**
2. **Open your Vercel app** in a browser
3. **Open browser DevTools** → Console
4. **Click the chat button** - you should see "Connected to chat server"
5. **Open another browser/incognito window** and test sending messages

## Troubleshooting

### Chat not connecting?

1. **Check CORS settings:**
   - Make sure your Vercel URL is in `ALLOWED_ORIGINS`
   - Include both `https://your-app.vercel.app` and `https://*.vercel.app`

2. **Check environment variables:**
   - Verify `NEXT_PUBLIC_SOCKET_URL` is set in Vercel
   - Make sure it starts with `https://` (not `http://`)

3. **Check WebSocket server logs:**
   - Railway/Render/Fly.io dashboards show connection logs
   - Look for "User connected" messages

4. **Check browser console:**
   - Look for WebSocket connection errors
   - Check if the URL is correct

### Messages not persisting?

The current implementation stores messages in memory. When the server restarts, messages are lost. To persist messages:

1. **Add a database** (PostgreSQL, MongoDB, etc.)
2. **Update `socket-server.js`** to save/load messages from the database
3. **Deploy the database** (Railway, Supabase, MongoDB Atlas, etc.)

## Cost Considerations

- **Vercel**: Free tier is usually sufficient for portfolios
- **Railway**: $5/month for hobby plan (includes $5 credit)
- **Render**: Free tier available (spins down after inactivity)
- **Fly.io**: Free tier includes 3 shared-cpu VMs

## Next Steps

- [ ] Deploy WebSocket server to Railway/Render/Fly.io
- [ ] Set `NEXT_PUBLIC_SOCKET_URL` in Vercel
- [ ] Test the chat feature
- [ ] (Optional) Add database persistence for messages
- [ ] (Optional) Add authentication for chat
- [ ] (Optional) Add rate limiting to prevent spam
