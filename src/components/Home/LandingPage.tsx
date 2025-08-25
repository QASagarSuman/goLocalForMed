import React, { useState } from 'react';
import { Pill, Users, MapPin, Clock, Shield, Star } from 'lucide-react';
import AuthModal from '../Auth/AuthModal';

const LandingPage: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-blue-600" />,
      title: 'Location-Based Matching',
      description: 'Find pharmacies within your preferred radius (5km or 10km)'
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: 'Quick Response',
      description: 'Get quotes from multiple pharmacies within minutes'
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: 'Verified Pharmacies',
      description: 'All pharmacies are verified and licensed for your safety'
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: 'Multiple Options',
      description: 'Choose between home delivery or pharmacy pickup'
    }
  ];

  const stats = [
    { value: '500+', label: 'Verified Pharmacies' },
    { value: '10K+', label: 'Happy Customers' },
    { value: '50K+', label: 'Orders Delivered' },
    { value: '4.8', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Pill className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">PharmConnect</h1>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Medicines,
            <span className="text-blue-600"> Delivered Fast</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload your prescription or enter medicines manually. Get quotes from verified pharmacies 
            near you and choose between home delivery or pickup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Order Now
            </button>
            <button
              onClick={() => setShowAuthModal(true)}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Join as Pharmacy
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How PharmConnect Works
            </h2>
            <p className="text-xl text-gray-600">Simple, fast, and reliable medicine ordering</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload or Enter</h3>
              <p className="text-gray-600">
                Upload your prescription image or manually enter the medicines you need
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Quotes</h3>
              <p className="text-gray-600">
                Receive quotes from verified pharmacies within your selected radius
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose & Order</h3>
              <p className="text-gray-600">
                Select the best quote and choose delivery or pickup option
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PharmConnect?
            </h2>
            <p className="text-xl text-gray-600">Everything you need for convenient medicine ordering</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center">
                  {stat.value}
                  {stat.label === 'Average Rating' && <Star className="h-6 w-6 ml-1 fill-current" />}
                </div>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Your Medicines?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers who trust PharmConnect for their medicine needs
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Your Order
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <Pill className="h-8 w-8 text-blue-400 mr-2" />
            <h3 className="text-xl font-bold">PharmConnect</h3>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 PharmConnect. All rights reserved.</p>
            <p className="mt-2">Connecting patients with trusted pharmacies nationwide.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default LandingPage;