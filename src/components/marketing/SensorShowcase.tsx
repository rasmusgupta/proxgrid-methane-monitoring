'use client';

import Image from 'next/image';
import { 
  WifiIcon, 
  CloudIcon, 
  CpuChipIcon,
  BoltIcon,
  MapIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Universal Compatibility',
    description: 'Seamlessly integrates with existing airborne and ground-based monitoring systems',
    icon: WifiIcon,
  },
  {
    name: 'LoRa Network Integration',
    description: 'Built-in LoRa connectivity ensures reliable data transmission across vast industrial sites',
    icon: CloudIcon,
  },
  {
    name: 'AI-Powered Analytics',
    description: 'Cloud-based AI agents provide intelligent data analysis and anomaly detection',
    icon: CpuChipIcon,
  },
  {
    name: 'Instant Deployment',
    description: 'Plug-and-play installation with immediate data collection and monitoring capabilities',
    icon: BoltIcon,
  },
  {
    name: 'Real-Time Mapping',
    description: 'Live data streaming to comprehensive map-based emissions tracking control center',
    icon: MapIcon,
  },
  {
    name: 'Automated Alerts',
    description: 'Intelligent warning system triggers instant notifications for abnormal methane measurements',
    icon: ShieldCheckIcon,
  },
];

export default function SensorShowcase() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase mb-2">
            ProxGrid Technology
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Advanced Methane Detection 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
              Sensor Technology
            </span>
          </h3>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Experience the future of industrial emissions monitoring with our cutting-edge sensor technology, 
            designed for seamless integration and unparalleled accuracy.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-primary-200 to-blue-200 rounded-full opacity-60"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-emerald-200 to-primary-200 rounded-full opacity-40"></div>
              
              {/* Sensor Image */}
              <div className="relative z-10 bg-white rounded-2xl p-6 shadow-lg">
                <Image
                  src="/methane_sensor.png"
                  alt="ProxGrid Methane Detection Sensor"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-emerald-500 to-primary-600 text-white px-6 py-3 rounded-xl shadow-lg transform rotate-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Live Monitoring</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Key Benefits */}
            <div className="prose prose-lg max-w-none">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">
                Next-Generation Sensor Capabilities
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Universal compatibility with existing systems, instant LoRa connectivity, and 
                AI-powered real-time monitoring. Deploy anywhere, collect data immediately, 
                and get intelligent insights through our cloud platform.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.name}
                  className="group p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-primary-200 group-hover:to-blue-200 transition-colors duration-300">
                      <feature.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm mb-1">
                        {feature.name}
                      </h5>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-6">
              <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl p-6 text-white">
                <h5 className="font-bold text-lg mb-2">Ready to Deploy?</h5>
                <p className="text-primary-100 mb-4">
                  Experience instant setup with our plug-and-play sensor technology.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>5-minute setup</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Instant data collection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>AI-powered insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}