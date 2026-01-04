'use client'
import { useMemo } from 'react'
import AboutSection from '@/components/portfolio/about-section'
import ContactSection from '@/components/portfolio/contact-section'
import Footer from '@/components/portfolio/footer'
import GitHubActivitySection from '@/components/portfolio/github-activity-section'
import HeroSection from '@/components/portfolio/hero-section'
import NewLoading from './ui/loading-spinner'
import Navigation from '@/components/portfolio/navigation'
import ProjectsSection from '@/components/portfolio/projects-section'
import { useContactForm } from '@/hooks/use-contact-form'
import { usePortfolioData } from '@/hooks/use-portfolio-data'
import { useScrollSpy } from '@/hooks/use-scroll-spy'
import CircularGallery from './CircularGallery'
import { downloadCV } from '@/utils/cv-download'

const sections = ['home', 'about', 'projects', 'github', 'contact']

export default function Portfolio() {
  const { portfolioData, isLoading } = usePortfolioData()
  const activeSection = useScrollSpy(sections)
  const { contactForm, isSubmitting, handleInputChange, errors, handleSubmit } = useContactForm()

  // Memoize gallery items to prevent recreation on every render
  const galleryItems = useMemo(() => [
    { image: 'IMG_4878.JPEG', text: '' },
    { image: 'IMG_0115.JPG', text: '' },
    { image: 'IMG_0243.JPG', text: '' },
    { image: 'IMG_0673.JPG', text: '' },
    { image: 'IMG_4721.JPG', text: '' },
    { image: 'IMG_5092.JPG', text: '' },
    { image: 'IMG_5454.JPG', text: '' },
    { image: 'IMG_6837.JPG', text: '' },
    { image: 'IMG_7101.JPG', text: '' },
    { image: 'IMG_7732.JPG', text: '' },
    { image: 'IMG_9792.DNG', text: '' },
  ], [])

  if (isLoading || !portfolioData) {
    return <NewLoading />
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} />
      <HeroSection portfolioData={portfolioData} onDownloadCV={downloadCV} />
      <AboutSection portfolioData={portfolioData} onDownloadCV={downloadCV} />
      <ProjectsSection />
      <GitHubActivitySection />

      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery
          bend={1}
          textColor="black"
          borderRadius={0.05}
          scrollEase={0.03}
          scrollSpeed={1.5}
          items={galleryItems}
        />
      </div>
      <ContactSection
        portfolioData={portfolioData}
        contactForm={contactForm}
        isSubmitting={isSubmitting}
        onInputChange={handleInputChange}
        errors={errors}
        onSubmit={handleSubmit}
      />
      <Footer />
    </div>
  )
}
