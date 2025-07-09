"use client"

import { useEffect, useState } from "react"

interface PortfolioData {
  name: string
  title: string
  description: string
  location: string
  socialLinks: {
    instagram: string
    facebook: string
    twitter: string
    youtube: string
  }
}

export function usePortfolioData() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch("/api/portfolio")
        if (response.ok) {
          const result = await response.json()
          if (result.success) {
            setPortfolioData(result.data)
          } else {
            throw new Error(result.message)
          }
        } else {
          throw new Error("Failed to fetch portfolio data")
        }
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error)
        setError(error instanceof Error ? error.message : "Unknown error")
        // Use default data if API is not available
        setPortfolioData({
          name: "Muhammad Aqsam",
          title: "UI/UX Designer, Flutter developer",
          description:
            "Hello! I'm a UI/UX designer and Flutter developer. Dive into my portfolio to discover a fusion of elegant design and seamless Flutter development. Welcome to a world where creativity meets functionality!",
          location: "Pakistan",
          socialLinks: {
            instagram: "https://instagram.com/aqsam",
            facebook: "https://facebook.com/aqsam",
            twitter: "https://twitter.com/aqsam",
            youtube: "https://youtube.com/aqsam",
          },
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolioData()
  }, [])

  return { portfolioData, isLoading, error }
}
