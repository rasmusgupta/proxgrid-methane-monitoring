import Image from 'next/image';
import MarketingLayout from '@/components/marketing/MarketingLayout';
import SensorShowcase from '@/components/marketing/SensorShowcase';

export default function SolutionsPage() {
  return (
    <MarketingLayout>
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative py-24 bg-gradient-to-br from-primary-900 to-slate-900">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}
          ></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Our Solutions
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Complete emissions monitoring solutions for modern industrial operations
            </p>
          </div>
        </div>

        {/* Sensor Showcase Section */}
        <SensorShowcase />

        {/* Methane Sensor Gate Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                    Methane Sensor Gate
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                      Seamless Integration
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed mb-8">
                    Transform your existing mining gas sensors into smart, connected devices with our 
                    plug-and-play wireless module.
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Universal Compatibility</h3>
                      <p className="text-gray-600">Works with existing mining sensors - no replacement needed</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Multiple Protocols</h3>
                      <p className="text-gray-600">Supports RS-485, Modbus RTU, 4-20mA, and LoRaWAN</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">NGER Compliance</h3>
                      <p className="text-gray-600">Automated reporting for hassle-free regulatory compliance</p>
                    </div>
                  </div>
                </div>

                {/* Protocol Support */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Supported Protocols:</h4>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border">RS-485</span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border">Modbus RTU</span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border">4-20mA</span>
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border">LoRaWAN</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="relative bg-gradient-to-br from-primary-50 to-blue-50 rounded-3xl p-8 shadow-2xl">
                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-primary-200 to-blue-200 rounded-full opacity-60"></div>
                  <div className="absolute bottom-8 left-8 w-8 h-8 bg-gradient-to-br from-emerald-200 to-primary-200 rounded-full opacity-40"></div>
                  
                  {/* Sensor Gate Image */}
                  <div className="relative z-10 bg-white rounded-2xl p-6 shadow-lg">
                    <Image
                      src="/methane_sensor_gate.png"
                      alt="ProxGrid Methane Sensor Gate"
                      width={500}
                      height={350}
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-500 to-primary-600 text-white px-4 py-2 rounded-lg shadow-lg transform -rotate-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-sm">Plug & Play</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Deliver */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                What We Deliver
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Complete emissions monitoring solutions for every industrial requirement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Solution 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Time Monitoring</h3>
                <p className="text-gray-600 leading-relaxed">
                  Instant detection and alerts for methane leaks across your entire operation.
                </p>
              </div>

              {/* Solution 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">NGER Reporting</h3>
                <p className="text-gray-600 leading-relaxed">
                  Automated compliance reports generated automatically, eliminating manual paperwork.
                </p>
              </div>

              {/* Solution 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cloud Platform</h3>
                <p className="text-gray-600 leading-relaxed">
                  Secure cloud connectivity for data analysis, visualization, and remote management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary-600 to-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Contact our team to discuss your specific monitoring requirements and 
              learn how ProxGrid can enhance your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Contact Sales
              </a>
              <a
                href="/login"
                className="inline-flex items-center px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                View Demo
              </a>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}