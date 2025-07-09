export interface User {
  id: string
  email: string
  name: string
  role: string
  created_at: Date
  updated_at: Date
}

export interface PortfolioData {
  id: string
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
  id: string
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
  id: string
  name: string
  category: string
  level: number
  icon: string
  order_index: number
  created_at: Date
  updated_at: Date
}

export interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "unread" | "read" | "replied"
  created_at: Date
  updated_at: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ProjectFormData {
  title: string
  description: string
  image: string
  technologies: string[]
  github_url: string
  live_url: string
  featured: boolean
}

export interface SkillFormData {
  name: string
  category: string
  level: number
  icon: string
}

export interface PortfolioFormData {
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
}

declare module "next-auth" {
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

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}
