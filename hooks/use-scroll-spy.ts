'use client'

import { useEffect, useState } from 'react'

export function useScrollSpy(sections: string[]) {
  const [activeSection, setActiveSection] = useState(sections[0] || 'home')

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return activeSection
}
