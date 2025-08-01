import React from 'react';
import { Lightbulb, Users, BarChart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden font-inter">
      {/* Animated Background Elements - matching the Register page */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">About Us</h1>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Our journey, mission, and the people behind our success.
          </p>

          {/* Introduction and Mission */}
          <div className="mb-12">
            <div className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                <Lightbulb size={24} className="text-indigo-600 mr-3" />
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At our core, we are dedicated to building innovative solutions that empower individuals and businesses. We believe in creating technology that is not only powerful and efficient but also intuitive and accessible to everyone. Our goal is to transform complex challenges into simple, elegant experiences.
              </p>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <Users size={24} className="text-indigo-600 mr-3" />
                Who We Are
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We are a diverse team of passionate creators, engineers, and designers. We thrive on collaboration and a shared commitment to excellence. Our team&apos;s unique backgrounds and perspectives are our greatest strength, driving us to build products that truly resonate with our users.
              </p>
            </div>
            <div className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                <BarChart size={24} className="text-indigo-600 mr-3" />
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We envision a future where technology seamlessly integrates into daily life, enhancing productivity and creativity without complication. We are constantly pushing the boundaries of what is possible, striving to be a leader in our industry and a source of inspiration for others.
              </p>
            </div>
          </div>

          {/* Team Section (Placeholder) */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
            <p className="text-gray-600 mb-6">
              We are powered by a group of dedicated professionals.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex flex-col items-center backdrop-blur-sm bg-white/80 border border-white/20 rounded-2xl p-6 shadow-md">
                <img src="https://placehold.co/100x100/e2e8f0/1d4ed8?text=JM" alt="Team Member 1" className="rounded-full w-24 h-24 mb-4 border-2 border-indigo-600" />
                <h3 className="font-medium text-gray-800">John M.</h3>
                <p className="text-sm text-gray-600">Founder</p>
              </div>
              <div className="flex flex-col items-center backdrop-blur-sm bg-white/80 border border-white/20 rounded-2xl p-6 shadow-md">
                <img src="https://placehold.co/100x100/e2e8f0/3b82f6?text=SA" alt="Team Member 2" className="rounded-full w-24 h-24 mb-4 border-2 border-indigo-600" />
                <h3 className="font-medium text-gray-800">Sarah A.</h3>
                <p className="text-sm text-gray-600">Lead Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;