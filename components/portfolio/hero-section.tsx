'use client'

import { Button } from '@/components/ui/button'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import LogoLoop from '../LogoLoop'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'
import RotatingText from '@/components/RotatingText'

interface HeroSectionProps {
  portfolioData: {
    name: string
    title: string
    profile_image: string
    about_image: string
    socialLinks: {
      instagram: string
      facebook: string
      twitter: string
      youtube: string
    }
  }
  onDownloadCV: () => void
}

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
]

export default function HeroSection({ portfolioData, onDownloadCV }: HeroSectionProps) {
  const nameSplit = portfolioData.name.split(' ')
  return (
    <section id="home" className="bg-gradient-to-br from-yellow-400 to-yellow-500 px-4 pb-8 pt-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-0 md:grid-cols-2">
          <div className="order-2 pt-20 md:order-1">
            <div className="flex gap-2 items-center pb-1">
              <h1 className=' font-bold md:text-5xl text-3xl '>Creative</h1>
              <RotatingText
                texts={['Thinking', 'Coding', 'Solving', 'Living!']}
                mainClassName="md:text-5xl font-bold text-3xl px-2 sm:px-2 md:px-3 bg-teal-400 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={'last'}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-2"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>
            {/* <h2 className="mb-2 text-5xl font-bold text-black">Hello,</h2> */}
            <h1 className="mb-4 text-4xl font-bold text-black md:text-6xl">
              I am <span className="text-teal-600">{nameSplit[1]}</span>
            </h1>
            <p className="mb-8 text-xl text-gray-700 md:text-2xl">{portfolioData.title}</p>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Button className="bg-black text-white shadow-lg transition-all duration-700 hover:bg-yellow-500 hover:text-black hover:shadow-xl hover:outline-dashed">
                <a href="mailto:visalprak2015@email.com">Hire me</a>
              </Button>
              <Button
                className="bg-white text-black shadow-lg transition-all duration-700 hover:bg-teal-500 hover:text-white hover:shadow-xl"
                onClick={onDownloadCV}
              >
                Download CV
              </Button>
            </div>

            <div className="flex space-x-4">
              <a
                href={portfolioData.socialLinks.instagram}
                aria-label="Instagram"
                className="group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-pink-500" />
              </a>
              <a
                href={portfolioData.socialLinks.facebook}
                aria-label="Facebook"
                className="group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-blue-600" />
              </a>
              <a
                href={portfolioData.socialLinks.twitter}
                aria-label="Twitter"
                className="group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-teal-500" />
              </a>
              <a
                href={portfolioData.socialLinks.youtube}
                aria-label="YouTube"
                className="group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-6 w-6 text-gray-700 transition-colors duration-300 group-hover:text-red-600" />
              </a>
            </div>
          </div>

          <div className="relative top-10 order-1 flex justify-center md:order-2">
            <div className="relative">
              <div className="relative z-10 bg-yellow-400">
                <Image
                  src={'IMG_4949.PNG'}
                  alt="Visal - UI/UX Designer & Backend Developer"
                  width={250}
                  height={300}
                  className="rounded-lg border-2 border-black object-cover shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <LogoLoop
        className="mt-20 flex flex-col justify-end"
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="bg-yellow-400"
        ariaLabel="Technology partners"
      />
    </section>
  )
}
