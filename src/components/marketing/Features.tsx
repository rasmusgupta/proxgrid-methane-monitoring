import { 
  RadioIcon, 
  CpuChipIcon, 
  CloudIcon, 
  ChartBarIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Advanced Sensors',
    description: 'Cutting-edge airborne and ground-based emissions detection sensors with industry-leading precision and reliability.',
    icon: RadioIcon,
  },
  {
    name: 'AI Analytics',
    description: 'Intelligent data analysis powered by machine learning algorithms to identify patterns and predict emissions.',
    icon: CpuChipIcon,
  },
  {
    name: 'Secure Cloud',
    description: 'Enterprise-grade cloud infrastructure with bank-level security and 99.9% uptime guarantee.',
    icon: CloudIcon,
  },
  {
    name: 'Real-time Reports',
    description: 'Instant insights and automated compliance reporting with customizable dashboards and alerts.',
    icon: ChartBarIcon,
  },
  {
    name: 'Compliance Ready',
    description: 'Built-in compliance features for EPA, OSHA, and international environmental regulations.',
    icon: ShieldCheckIcon,
  },
  {
    name: '24/7 Monitoring',
    description: 'Continuous monitoring with automated alerting and emergency response protocols.',
    icon: ClockIcon,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
            Complete Solution
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for emissions monitoring
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            From detection to reporting, our integrated platform provides comprehensive 
            emissions monitoring for oil & gas and mining operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="relative group">
              <div className="relative p-8 bg-white rounded-2xl border border-gray-200 hover:border-primary-300 transition-colors duration-300 hover:shadow-lg">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}