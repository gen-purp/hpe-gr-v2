import { ArrowRight, Home, Building, Wrench } from 'lucide-react'

export function Hero() {
  const heroCards = [
    {
      icon: Home,
      title: 'Residential',
      description: 'Home electrical solutions'
    },
    {
      icon: Building,
      title: 'Commercial',
      description: 'Business electrical systems'
    },
    {
      icon: Wrench,
      title: 'Emergency',
      description: '24/7 emergency repairs'
    }
  ]

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToServices = () => {
    const element = document.querySelector('#services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-purple-600 flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Professional Electrical Services
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Powering your home and business with reliable, safe, and efficient electrical solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToContact}
                className="btn btn-primary btn-lg bg-white text-primary-600 hover:bg-gray-50 flex items-center justify-center group"
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToServices}
                className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary-600"
              >
                Our Services
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4 animate-slide-in-right">
            {heroCards.map((card, index) => (
              <div
                key={card.title}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <card.icon className="w-6 h-6 text-yellow-900" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-white/80 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
