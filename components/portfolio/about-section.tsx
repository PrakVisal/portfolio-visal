'use client'

import { Button } from '@/components/ui/button'

import Image from 'next/image'

interface AboutSectionProps {
  portfolioData: {
    description: string
  }
  onDownloadCV: () => void
}

export default function AboutSection({ portfolioData, onDownloadCV }: AboutSectionProps) {
  return (
    <section id="about" className="bg-teal-600 px-4 py-16">
      <div className="container mx-auto">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">About me</h2>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute left-4 top-4 -z-10 h-64 w-64 rounded-full bg-teal-500 opacity-20"></div>
              <div className="relative z-10 rounded-full border border-gray-100 bg-white p-4 shadow-xl">
                <div className="relative h-56 w-56 md:h-72 md:w-72 hover:scale-110 duration-300 transition-all">
                  <Image
                    src="pf.jpg"
                    alt="Aqsam - About"
                    width={300}
                    height={300}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="mb-2 text-xl font-bold text-white">UI/UX Designer</h3>
              <div className="mb-4 h-1 w-16 bg-yellow-400"></div>
            </div>
            <div className="mb-6">
              <h3 className="mb-2 text-xl font-bold text-white">Backend Developer</h3>
              <div className="mb-4 h-1 w-16 bg-yellow-400"></div>
            </div>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              {portfolioData.description}
            </p>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Button className="bg-black text-white shadow-lg transition-all duration-700 hover:bg-yellow-500 hover:text-black hover:shadow-xl hover:outline-dashed">
                  <a href="mailto:visalprak2015@email.com">Hire me</a>
              </Button>
              <Button
                className="border-2 bg-white text-black shadow-lg transition-all duration-700 hover:border-white hover:bg-teal-500 hover:text-white hover:shadow-xl"
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
