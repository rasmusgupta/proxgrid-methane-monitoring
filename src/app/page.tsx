import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full cover powerlines background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/powerlines.jpg)' }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Glassmorphism card in center */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/ProxGrid.png"
                alt="ProxGrid Logo"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            
            {/* Content */}
            <div className="text-center text-white">
              <p className="text-lg leading-relaxed mb-6">
                ProxGrid is working on reducing cost and risks associated with power asset maintenance.
              </p>
              
              <div className="space-y-2">
                <p className="text-sm opacity-90">For more information contact:</p>
                <div className="space-y-1">
                  <a 
                    href="mailto:rg@proxgrid.com" 
                    className="block text-blue-300 hover:text-blue-200 transition-colors duration-200"
                  >
                    rg@proxgrid.com
                  </a>
                  <a 
                    href="mailto:amin@proxgrid.com" 
                    className="block text-blue-300 hover:text-blue-200 transition-colors duration-200"
                  >
                    amin@proxgrid.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}