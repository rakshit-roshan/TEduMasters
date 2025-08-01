import React, { useState } from 'react';
import { Search, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

// Mock data for the contacts list
const initialContacts = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "+1 (555) 123-4567",
    title: "Senior Product Manager",
    location: "New York, NY",
    avatar: "https://placehold.co/150x150/e2e8f0/1d4ed8?text=AJ"
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob.w@example.com",
    phone: "+1 (555) 987-6543",
    title: "Software Engineer",
    location: "San Francisco, CA",
    avatar: "https://placehold.co/150x150/e2e8f0/3b82f6?text=BW"
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie.d@example.com",
    phone: "+1 (555) 555-1111",
    title: "UX/UI Designer",
    location: "Austin, TX",
    avatar: "https://placehold.co/150x150/e2e8f0/2563eb?text=CD"
  },
  {
    id: 4,
    name: "Diana Evans",
    email: "diana.e@example.com",
    phone: "+1 (555) 222-3333",
    title: "Marketing Specialist",
    location: "Chicago, IL",
    avatar: "https://placehold.co/150x150/e2e8f0/3730a3?text=DE"
  },
  {
    id: 5,
    name: "Eve Green",
    email: "eve.g@example.com",
    phone: "+1 (555) 444-5555",
    title: "Data Scientist",
    location: "Seattle, WA",
    avatar: "https://placehold.co/150x150/e2e8f0/4338ca?text=EG"
  }
];

const ContactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter contacts based on the search term
  const filteredContacts = initialContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">Contacts</h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            A list of all your contacts, with search and details.
          </p>

          {/* Search Input with glassmorphism style */}
          <div className="relative mb-8 backdrop-blur-sm bg-white/80 rounded-3xl p-2 border border-white/20 shadow-lg">
            <input
              type="text"
              placeholder="Search contacts by name, email, or title..."
              className="w-full bg-white/50 text-gray-900 border-none rounded-xl py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>

          {/* Contacts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.length > 0 ? (
              filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  className="backdrop-blur-sm bg-white/80 rounded-3xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:ring-2 hover:ring-indigo-500"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-16 h-16 rounded-full mr-4 border-2 border-indigo-600 shadow-md"
                      onError={(e) => {
                        e.target.onerror = null; // prevents looping
                        e.target.src = `https://placehold.co/150x150/e2e8f0/1d4ed8?text=${contact.name.split(' ').map(n => n[0]).join('')}`;
                      }}
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{contact.name}</h2>
                      <p className="text-sm text-gray-600">{contact.title}</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center">
                      <Mail size={16} className="text-indigo-600 mr-3" />
                      <a href={`mailto:${contact.email}`} className="text-sm hover:underline">{contact.email}</a>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="text-indigo-600 mr-3" />
                      <a href={`tel:${contact.phone}`} className="text-sm hover:underline">{contact.phone}</a>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={16} className="text-indigo-600 mr-3" />
                      <span className="text-sm">{contact.location}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                No contacts found matching your search.
              </div>
            )}
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

export default ContactsPage;
