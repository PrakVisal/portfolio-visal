const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// Store messages in memory (you can replace this with a database)
const messages = []
const connectedUsers = new Set()

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

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
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
