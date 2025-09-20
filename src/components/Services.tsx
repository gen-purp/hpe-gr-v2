import { Plug, Wrench, Lightbulb, Shield, Zap, Phone } from 'lucide-react'
import type { Service } from '@/types'

export function Services() {
  const services: Service[] = [
    {
      id: 'installation',
      title: 'Electrical Installation',
      description: 'Professional installation of outlets, switches, and electrical fixtures for your home or business.',
      icon: 'Plug'
    },
    {
      id: 'repair',
      title: 'Repairs & Maintenance',
      description: 'Expert repair services and routine maintenance to keep your electrical systems running smoothly.',
      icon: 'Wrench'
    },
    {
      id: 'lighting',
      title: 'Lighting Solutions',
      description: 'Modern lighting design and installation including LED upgrades and smart lighting systems.',
      icon: 'Lightbulb'
    },
    {
      id: 'inspection',
      title: 'Safety Inspections',
      description: 'Comprehensive electrical safety inspections to ensure your property meets all safety standards.',
      icon: 'Shield'
    },
    {
      id: 'upgrade',
      title: 'Panel Upgrades',
      description: 'Electrical panel upgrades and replacements to handle increased power demands safely.',
      icon: 'Zap'
    },
    {
      id: 'emergency',
      title: 'Emergency Service',
      description: '24/7 emergency electrical services for urgent repairs and power restoration.',
      icon: 'Phone'
    }
  ]

  const iconMap = {
    Plug,
    Wrench,
    Lightbulb,
    Shield,
    Zap,
    Phone
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive electrical solutions for all your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]
            
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
