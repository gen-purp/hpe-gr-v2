import { ArrowLeft } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    services: [
      'Electrical Installation',
      'Repairs & Maintenance',
      'Lighting Solutions',
      'Emergency Service'
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="text-xl font-bold">Horsepower Electrical</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Professional electrical services you can trust. Licensed, insured, and committed to excellence.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map(service => (
                <li key={service}>
                  <a 
                    href="#services" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@horsepowerelectrical.com</p>
              <p>📍 123 Electric Avenue, Power City, PC 12345</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Horsepower Electrical. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
