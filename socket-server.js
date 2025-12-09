// Standalone WebSocket server for deployment (Railway, Render, Fly.io, etc.)
const { createServer } = require('http')
const { Server } = require('socket.io')

const port = parseInt(process.env.PORT || '3001', 10)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'https://*.vercel.app']

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)

      // Check if origin matches any allowed pattern
      const isAllowed = allowedOrigins.some(allowed => {
        if (allowed.includes('*')) {
          const pattern = allowed.replace('*', '.*')
          return new RegExp(`^${pattern}$`).test(origin)
        }
        return origin === allowed
      })

      if (isAllowed) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

// Store messages in memory (you can replace this with a database)
const messages = []
const connectedUsers = new Set()

io.on('connection', socket => {
  console.log('User connected:', socket.id)
  connectedUsers.add(socket.id)

  // Send existing messages to the newly connected user
  socket.emit('messages', messages)

  // Send updated user count
  io.emit('userCount', connectedUsers.size)

  // Handle new message
  socket.on('message', data => {
    const message = {
      id: Date.now().toString(),
      text: data.text,
      username: data.username || 'Anonymous',
      timestamp: new Date().toISOString(),
      socketId: socket.id,
    }
    messages.push(message)

    // Broadcast message to all connected clients
    io.emit('message', message)
  })

  // Handle typing indicator
  socket.on('typing', data => {
    socket.broadcast.emit('typing', {
      username: data.username || 'Someone',
      isTyping: data.isTyping,
    })
  })

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    connectedUsers.delete(socket.id)
    io.emit('userCount', connectedUsers.size)
  })
})

httpServer
  .once('error', err => {
    console.error(err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`🚀 WebSocket server running on port ${port}`)
    console.log(`📡 Allowed origins: ${allowedOrigins.join(', ')}`)
  })
