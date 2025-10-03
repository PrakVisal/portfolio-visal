'use client'
import AboutSection from '@/components/portfolio/about-section'
import ContactSection from '@/components/portfolio/contact-section'
import Footer from '@/components/portfolio/footer'
import HeroSection from '@/components/portfolio/hero-section'
import NewLoading from './ui/loading-spinner'
import Navigation from '@/components/portfolio/navigation'
import ServicesSection from '@/components/portfolio/services-section'
import ProjectsSection from '@/components/portfolio/projects-section'
import { useContactForm } from '@/hooks/use-contact-form'
import { usePortfolioData } from '@/hooks/use-portfolio-data'
import { useScrollSpy } from '@/hooks/use-scroll-spy'
import CircularGallery from './CircularGallery'
import { downloadCV } from '@/utils/cv-download'

const sections = ['home', 'about', 'services', 'contact']

export default function Portfolio() {
  const { portfolioData, isLoading } = usePortfolioData()
  // const { skills } = useSkillsData()
  const activeSection = useScrollSpy(sections)
  const { contactForm, isSubmitting, handleInputChange, handleSubmit } = useContactForm()

  if (isLoading || !portfolioData) {
    return <NewLoading/>
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} />
      <HeroSection portfolioData={portfolioData} onDownloadCV={downloadCV} />
      <AboutSection portfolioData={portfolioData} onDownloadCV={downloadCV} />
      <ServicesSection />
      <ProjectsSection />

      <div style={{ height: '600px', position: 'relative' }}>
      <CircularGallery bend={1} textColor="black" borderRadius={0.05} scrollEase={0.02} items={
        [
          {
           image : `IMG_4878.JPEG`,
           text : ""
          },
          {
           image : `IMG_0115.JPG`,
           text : ""
          },
          {
           image : `IMG_0243.JPG`,
           text : ""
          },
          {
           image : `IMG_0673.JPG`,
           text : ""
          },
          {
           image : `IMG_4721.JPG`,
           text : ""
          },
          {
           image : `IMG_5092.JPG`,
           text : ""
          },
          {
           image : `IMG_5454.JPG`,
           text : ""
          },
          {
           image : `IMG_6837.JPG`,
           text : ""
          },
          {
           image : `IMG_7101.JPG`,
           text : ""
          },
          {
           image : `IMG_7732.JPG`,
           text : ""
          },
          {
           image : `IMG_9792.DNG`,
           text : ""
          },]}/>
      </div>
      <ContactSection
        portfolioData={portfolioData}
        contactForm={contactForm}
        isSubmitting={isSubmitting}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <Footer />
    </div>
  )
}
