'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'

const services = [
  {
    id: 1,
    title: 'UI/UX Designer',
    description:
      'Crafting captivating interfaces that resonate. From wireframes to polished designs, I make sure your digital presence stands out with user-centric creativity.',
    bgColor: 'from-yellow-400 to-yellow-500',
    buttonColor: 'bg-yellow-400 hover:bg-yellow-500',
    iconBg: 'text-yellow-500',
  },
  {
    id: 2,
    title: 'Backend Developer',
    description:
      'I turn ideas into reality by crafting efficient backend systems. My focus is on building robust, cross-platform apps with smooth user experiences and high performance.',
    bgColor: 'from-teal-500 to-teal-600',
    buttonColor: 'bg-teal-500 hover:bg-teal-600',
    iconBg: 'text-teal-500',
    titleColor: 'text-white',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-gray-50 px-4 py-16">
      <div className="container mx-auto">
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">Services</h2>
        <p className="mx-auto mb-12 max-w-3xl text-center leading-relaxed text-gray-600">
          Embark on a journey of digital transformation with services that blend design brilliance
          with cutting-edge development. Create experiences that resonate and applications that
          captivate.
        </p>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {services.map(service => (
            <Card
              key={service.id}
              className="overflow-hidden border-none shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <CardContent className="p-0">
                <div
                  className={`bg-gradient-to-r ${service.bgColor} flex items-center space-x-4 p-6`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold ${service.iconBg} shadow-lg`}
                  >
                    {service.id}
                  </div>
                  <CardTitle className={service.titleColor || 'text-gray-900'}>
                    {service.title}
                  </CardTitle>
                </div>
                <div className="p-6">
                  <CardDescription className="mb-6 text-base leading-relaxed text-gray-600">
                    {service.description}
                  </CardDescription>
                  <Button
                    className={`${service.buttonColor} ${service.titleColor ? 'text-white' : 'text-black'} shadow-lg transition-all duration-300 hover:shadow-xl`}
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
