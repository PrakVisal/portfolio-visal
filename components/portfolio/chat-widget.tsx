'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useChat, ChatMessage } from '@/hooks/use-chat'
import { MessageCircle, X, Send, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [showUsernameInput, setShowUsernameInput] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, isConnected, userCount, sendMessage, sendTyping, typingUsers } = useChat()

  useEffect(() => {
    // Check if username is stored in localStorage
    const storedUsername = localStorage.getItem('chatUsername')
    if (storedUsername) {
      setUsername(storedUsername)
      setShowUsernameInput(false)
    }
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Focus input when chat opens
    if (isOpen && !showUsernameInput) {
      inputRef.current?.focus()
    }
  }, [isOpen, showUsernameInput])

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      localStorage.setItem('chatUsername', username.trim())
      setShowUsernameInput(false)
      inputRef.current?.focus()
    }
  }

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && username.trim()) {
      sendMessage(message, username)
      setMessage('')
      sendTyping(username, false)
    }
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
    if (username.trim()) {
      sendTyping(username, e.target.value.length > 0)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all hover:scale-110',
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        )}
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 h-[500px] w-[380px] shadow-2xl">
          <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <CardTitle className="text-lg">Live Chat</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                <span>{userCount}</span>
                <div
                  className={cn(
                    'h-2 w-2 rounded-full',
                    isConnected ? 'bg-green-300' : 'bg-red-300'
                  )}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex h-[calc(500px-73px)] flex-col p-0">
            {showUsernameInput ? (
              <div className="flex h-full flex-col items-center justify-center p-6">
                <form onSubmit={handleUsernameSubmit} className="w-full space-y-4">
                  <div>
                    <label htmlFor="username" className="mb-2 block text-sm font-medium">
                      Enter your name to start chatting
                    </label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your name"
                      className="w-full"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={!username.trim()}>
                    Start Chatting
                  </Button>
                </form>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-sm text-gray-500">
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      messages.map((msg: ChatMessage) => {
                        const isOwnMessage = msg.username === username
                        return (
                          <div
                            key={msg.id}
                            className={cn(
                              'flex gap-2',
                              isOwnMessage ? 'flex-row-reverse' : 'flex-row'
                            )}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-blue-500 text-white">
                                {msg.username.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={cn(
                                'flex max-w-[75%] flex-col gap-1',
                                isOwnMessage ? 'items-end' : 'items-start'
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-gray-600">
                                  {msg.username}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {formatTime(msg.timestamp)}
                                </span>
                              </div>
                              <div
                                className={cn(
                                  'rounded-lg px-3 py-2 text-sm',
                                  isOwnMessage
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                )}
                              >
                                {msg.text}
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                    {typingUsers.length > 0 && (
                      <div className="text-xs text-gray-500 italic">
                        {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <form
                  onSubmit={handleMessageSubmit}
                  className="border-t p-4"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleMessageSubmit(e)
                    }
                  }}
                >
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={message}
                      onChange={handleMessageChange}
                      placeholder="Type a message..."
                      className="flex-1"
                      disabled={!isConnected}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!message.trim() || !isConnected}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  {!isConnected && (
                    <p className="mt-2 text-xs text-red-500">Connecting to chat...</p>
                  )}
                </form>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}

