'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

// Throttle function to limit scroll event frequency
function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle: boolean
  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}

export function useScrollSpy(sections: string[]) {
  const [activeSection, setActiveSection] = useState(sections[0] || 'home')
  const sectionsRef = useRef(sections)

  // Update ref when sections change
  useEffect(() => {
    sectionsRef.current = sections
  }, [sections])

  useEffect(() => {
    const handleScroll = throttle(() => {
      for (const section of sectionsRef.current) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection((prev) => prev !== section ? section : prev)
          break
        }
      }
    }, 100) // Throttle to max once per 100ms

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial check
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return activeSection
}
