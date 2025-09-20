import { CheckCircle, User } from 'lucide-react'

export function About() {
  const features = [
    'Licensed & Insured',
    '15+ Years Experience',
    '24/7 Emergency Service',
    'Free Estimates'
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              About Horsepower Electrical
            </h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                With over 15 years of experience in the electrical industry, Horsepower Electrical 
                has been providing reliable, safe, and efficient electrical services to residential 
                and commercial clients.
              </p>
              <p>
                Our team of licensed and certified electricians is committed to delivering exceptional 
                workmanship and customer service. We stay up-to-date with the latest electrical codes 
                and technologies to ensure your projects are completed to the highest standards.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <div key={feature} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex flex-col items-center justify-center text-white">
              <User className="w-16 h-16 mb-4" />
              <p className="text-xl font-semibold">Professional Team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
