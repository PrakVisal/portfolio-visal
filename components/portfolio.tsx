"use client"
import AboutSection from "@/components/portfolio/about-section"
import ContactSection from "@/components/portfolio/contact-section"
import Footer from "@/components/portfolio/footer"
import HeroSection from "@/components/portfolio/hero-section"
import LoadingSpinner from "@/components/portfolio/loading-spinner"
import Navigation from "@/components/portfolio/navigation"
import ServicesSection from "@/components/portfolio/services-section"
import { useContactForm } from "@/hooks/use-contact-form"
import { usePortfolioData } from "@/hooks/use-portfolio-data"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { downloadCV } from "@/utils/cv-download"

const sections = ["home", "about", "services", "contact"]

export default function Portfolio() {
  const { portfolioData, isLoading } = usePortfolioData()
  const activeSection = useScrollSpy(sections)
  const { contactForm, isSubmitting, handleInputChange, handleSubmit } = useContactForm()

  if (isLoading || !portfolioData) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} />
      <HeroSection portfolioData={portfolioData} onDownloadCV={downloadCV} />
      <AboutSection portfolioData={portfolioData} onDownloadCV={downloadCV} />
      <ServicesSection />
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
