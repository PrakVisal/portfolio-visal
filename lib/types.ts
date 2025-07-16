export interface User {
  id: number
  email: string
  name: string
  password: string
  role: 'admin' | 'user'
  created_at: Date
  updated_at: Date
}

export interface Portfolio {
  id: number
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  website: string
  github: string
  linkedin: string
  twitter: string
  resume_url: string
  profile_image: string
  created_at: Date
  updated_at: Date
}

export interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github_url: string
  live_url: string
  featured: boolean
  order_index: number
  created_at: Date
  updated_at: Date
}

export interface Skill {
  id: number
  name: string
  category: string
  level: number
  icon: string
  order_index: number
  created_at: Date
  updated_at: Date
}

export interface Contact {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: Date
  updated_at: Date
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  features: string[]
  order_index: number
  created_at: Date
  updated_at: Date
}

export interface ContactSubmission {
  id: number
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  isRead: boolean
  isReplied: boolean
  createdAt: string
  // Add any other fields your app uses
}

// NextAuth types extension
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
    }
  }

  interface User {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
  }
}
