"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"

const services = [
  {
    id: 1,
    title: "UI/UX Designer",
    description:
      "Crafting captivating interfaces that resonate. From wireframes to polished designs, I make sure your digital presence stands out with user-centric creativity.",
    bgColor: "from-yellow-400 to-yellow-500",
    buttonColor: "bg-yellow-400 hover:bg-yellow-500",
    iconBg: "text-yellow-500",
  },
  {
    id: 2,
    title: "Flutter Developer",
    description:
      "Turning app ideas into reality. As a Flutter developer, I build sleek, cross-platform applications for a seamless user experience and efficient performance.",
    bgColor: "from-teal-500 to-teal-600",
    buttonColor: "bg-teal-500 hover:bg-teal-600",
    iconBg: "text-teal-500",
    titleColor: "text-white",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Services</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-gray-600 leading-relaxed">
          Embark on a journey of digital transformation with services that blend design brilliance with cutting-edge
          development. Let's create experiences that resonate and applications that captivate.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className={`bg-gradient-to-r ${service.bgColor} p-6 flex items-center space-x-4`}>
                  <div
                    className={`bg-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold ${service.iconBg} shadow-lg`}
                  >
                    {service.id}
                  </div>
                  <CardTitle className={service.titleColor || "text-gray-900"}>{service.title}</CardTitle>
                </div>
                <div className="p-6">
                  <CardDescription className="text-base text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </CardDescription>
                  <Button
                    className={`${service.buttonColor} ${service.titleColor ? "text-white" : "text-black"} transition-all duration-300 shadow-lg hover:shadow-xl`}
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
