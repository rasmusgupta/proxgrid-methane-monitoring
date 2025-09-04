'use client';

import { useState } from 'react';
import MarketingLayout from '@/components/marketing/MarketingLayout';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (in a real app, you'd send this to your backend)
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Contact Form Submission from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company}\n\n` +
        `Message:\n${formData.message}`
      );
      
      // Open email client with pre-filled data
      window.location.href = `mailto:rg@proxgrid.com,mv@proxgrid.com?subject=${subject}&body=${body}`;
      
      // Reset form and show success state
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error submitting form:', error);
    }
  };

  if (isSubmitted) {
    return (
      <MarketingLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center py-24">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
              <p className="text-gray-600 mb-6">
                Your message has been sent. We&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-primary-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-primary-700 hover:to-blue-700 transition-all duration-200"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </MarketingLayout>
    );
  }

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ready to transform your emissions monitoring? Contact our team to learn more about ProxGrid&apos;s 
              advanced sensor technology and how we can help your operations.
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Let&apos;s Start a Conversation
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Whether you&apos;re interested in a demo, have technical questions, or want to discuss 
                    custom solutions for your facility, our team is here to help.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:rg@proxgrid.com" className="hover:text-primary-600 transition-colors">
                          rg@proxgrid.com
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a href="mailto:mv@proxgrid.com" className="hover:text-primary-600 transition-colors">
                          mv@proxgrid.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <PhoneIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">Available upon request</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <MapPinIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                      <p className="text-gray-600">Global operations</p>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Quick Response Guarantee</h3>
                  <p className="text-gray-600 text-sm">
                    We typically respond to all inquiries within 24 hours. For urgent matters, 
                    please mention &quot;URGENT&quot; in your message subject.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                      placeholder="Tell us about your emissions monitoring needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-primary-700 hover:to-blue-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    This form will open your email client with pre-filled information 
                    to send to both rg@proxgrid.com and mv@proxgrid.com
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}