"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AboutSectionProps {
  portfolioData: {
    description: string
  }
  onDownloadCV: () => void
}

export default function AboutSection({ portfolioData, onDownloadCV }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">About me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -z-10 w-64 h-64 bg-teal-500 rounded-full top-4 left-4 opacity-20"></div>
              <div className="bg-white rounded-full p-4 relative z-10 shadow-xl border border-gray-100">
                <div className="w-56 h-56 md:w-72 md:h-72 relative">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Aqsam - About"
                    width={300}
                    height={300}
                    className="rounded-full object-cover"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-800">
                    <span className="block">VD</span>
                    <span className="block">C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900">UI/UX Designer</h3>
              <div className="w-16 h-1 bg-yellow-400 mb-4"></div>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Flutter Developer</h3>
              <div className="w-16 h-1 bg-yellow-400 mb-4"></div>
            </div>
            <p className="text-lg mb-8 text-gray-600 leading-relaxed">{portfolioData.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-black text-white hover:bg-gray-800 shadow-lg shadow-teal-400/30 transition-all duration-300">
                Hire me
              </Button>
              <Button
                variant="outline"
                className="bg-white border-2 border-teal-500 text-black hover:bg-teal-50 shadow-lg shadow-teal-400/30 transition-all duration-300"
                onClick={onDownloadCV}
              >
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
