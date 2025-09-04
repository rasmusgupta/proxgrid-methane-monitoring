'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/mine.png')`
        }}
      ></div>
      
      {/* Blue Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-slate-900/90"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-primary-600/30"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-800/50 via-transparent to-primary-700/40"></div>
      
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-md border border-white/30 text-white mb-8 shadow-lg">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            Cutting-edge emissions detection technology
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-lg">Monitor Industrial Emissions</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary-400 to-emerald-400 drop-shadow-lg">
              with Precision
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Advanced airborne and ground-based sensors connected to AI-powered cloud analytics. 
            Monitor, analyze, and report industrial emissions with unprecedented accuracy and reliability.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/login"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 backdrop-blur-sm"
            >
              See our Demo
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center px-8 py-4 border border-white/30 text-lg font-medium rounded-lg text-white bg-white/10 backdrop-blur-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </section>
  );
}