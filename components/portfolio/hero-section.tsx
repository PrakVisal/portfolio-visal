"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HeroSectionProps {
  portfolioData: {
    name: string
    title: string
    socialLinks: {
      instagram: string
      facebook: string
      twitter: string
      youtube: string
    }
  }
  onDownloadCV: () => void
}

export default function HeroSection({ portfolioData, onDownloadCV }: HeroSectionProps) {
  return (
    <section id="home" className="pt-24 pb-16 px-4 bg-gradient-to-br from-yellow-400 to-yellow-500">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-xl font-medium mb-2 text-gray-800">Hello,</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
              I'm <span className="text-teal-600">Aqsam</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-800">{portfolioData.title}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="bg-black text-white hover:bg-gray-800 shadow-lg shadow-teal-400/30 transition-all duration-300 hover:shadow-xl">
                Hire me
              </Button>
              <Button
                variant="outline"
                className="bg-white border-2 border-teal-500 text-black hover:bg-teal-50 shadow-lg shadow-teal-400/30 transition-all duration-300 hover:shadow-xl"
                onClick={onDownloadCV}
              >
                Download CV
              </Button>
            </div>

            <div className="flex space-x-4">
              <Link href={portfolioData.socialLinks.instagram} aria-label="Instagram" className="group">
                <Instagram className="h-6 w-6 text-gray-700 group-hover:text-pink-500 transition-colors duration-300" />
              </Link>
              <Link href={portfolioData.socialLinks.facebook} aria-label="Facebook" className="group">
                <Facebook className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
              </Link>
              <Link href={portfolioData.socialLinks.twitter} aria-label="Twitter" className="group">
                <Twitter className="h-6 w-6 text-gray-700 group-hover:text-teal-500 transition-colors duration-300" />
              </Link>
              <Link href={portfolioData.socialLinks.youtube} aria-label="YouTube" className="group">
                <Youtube className="h-6 w-6 text-gray-700 group-hover:text-red-600 transition-colors duration-300" />
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -z-10 w-64 h-64 bg-teal-500 rounded-full top-4 left-4 opacity-80"></div>
              <div className="bg-yellow-400 rounded-full p-4 relative z-10 shadow-2xl">
                <div className="w-56 h-56 md:w-72 md:h-72 relative">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Aqsam - UI/UX Designer & Flutter Developer"
                    width={300}
                    height={300}
                    className="rounded-full object-cover"
                    priority
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-800">
                    <span className="block">VD</span>
                    <span className="block">C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
