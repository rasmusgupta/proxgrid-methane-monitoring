'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import Image from 'next/image';

export default function LoginForm() {
  const [email, setEmail] = useState('demo@proxgrid.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const { signIn, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await signIn(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="card-glass p-8 space-y-6">
          {/* Logo and Branding */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Image
                src="/ProxGrid.png"
                alt="ProxGrid"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="border-t border-white/20 pt-4">
            <p className="text-xs text-gray-400 text-center mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex justify-between">
                <span>demo@proxgrid.com</span>
                <span>demo123</span>
              </div>
              <div className="flex justify-between">
                <span>admin@proxgrid.com</span>
                <span>admin123</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Secure • Professional • Trusted
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="mt-6 text-center text-gray-400 text-xs">
          <p>© 2024 ProxGrid Energy Solutions</p>
          <p>Cutting-edge airborne and ground-based emissions detection</p>
        </div>
      </div>
    </div>
  );
}