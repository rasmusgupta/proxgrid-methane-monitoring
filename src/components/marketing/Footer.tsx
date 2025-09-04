import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/ProxGrid.png"
                alt="ProxGrid"
                width={160}
                height={53}
                className="rounded-lg"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Cutting-edge airborne and ground-based methane detection technology 
              for oil & gas and mining operations worldwide.
            </p>
            <div className="text-gray-400 text-xs">
              <p>© 2024 ProxGrid Energy Solutions</p>
              <p>All rights reserved.</p>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Solutions
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Oil & Gas Monitoring
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Mining Operations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Environmental Compliance
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Regulatory Reporting
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              Professional methane monitoring solutions for enterprise clients
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}