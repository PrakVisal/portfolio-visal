'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

export interface ChatMessage {
  id: string
  text: string
  username: string
  timestamp: string
  socketId?: string
}

interface UseChatReturn {
  messages: ChatMessage[]
  isConnected: boolean
  userCount: number
  sendMessage: (text: string, username: string) => void
  sendTyping: (username: string, isTyping: boolean) => void
  typingUsers: string[]
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [userCount, setUserCount] = useState(0)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const socketRef = useRef<Socket | null>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initialize socket connection
    // Use environment variable for production, fallback to localhost for development
    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL ||
      (typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? 'http://localhost:3001'
        : window.location.origin)
    
    const socket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Connected to chat server')
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from chat server')
      setIsConnected(false)
    })

    socket.on('messages', (existingMessages: ChatMessage[]) => {
      setMessages(existingMessages)
    })

    socket.on('message', (message: ChatMessage) => {
      setMessages((prev) => [...prev, message])
    })

    socket.on('userCount', (count: number) => {
      setUserCount(count)
    })

    socket.on('typing', (data: { username: string; isTyping: boolean }) => {
      if (data.isTyping) {
        setTypingUsers((prev) => {
          if (!prev.includes(data.username)) {
            return [...prev, data.username]
          }
          return prev
        })
      } else {
        setTypingUsers((prev) => prev.filter((user) => user !== data.username))
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const sendMessage = useCallback(
    (text: string, username: string) => {
      if (socketRef.current && text.trim()) {
        socketRef.current.emit('message', { text: text.trim(), username })
      }
    },
    []
  )

  const sendTyping = useCallback(
    (username: string, isTyping: boolean) => {
      if (socketRef.current) {
        socketRef.current.emit('typing', { username, isTyping })

        // Clear previous timeout
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current)
        }

        // Stop typing indicator after 3 seconds
        if (isTyping) {
          typingTimeoutRef.current = setTimeout(() => {
            if (socketRef.current) {
              socketRef.current.emit('typing', { username, isTyping: false })
            }
          }, 3000)
        }
      }
    },
    []
  )

  return {
    messages,
    isConnected,
    userCount,
    sendMessage,
    sendTyping,
    typingUsers,
  }
}

