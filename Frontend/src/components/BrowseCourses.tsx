import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaChartBar, FaMobileAlt } from 'react-icons/fa';

const sampleData = [
  {
    category: 'Web Development',
    icon: <FaLaptopCode size={28} color="#6366f1" />,
    courses: [
      { id: 'react101', name: 'React for Beginners', desc: 'Start your journey with React.js', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80' },
      { id: 'jsfund', name: 'JavaScript Fundamentals', desc: 'Master the basics of JavaScript', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    category: 'Data Science',
    icon: <FaChartBar size={28} color="#10b981" />,
    courses: [
      { id: 'pydata', name: 'Python for Data Science', desc: 'Analyze data with Python', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
      { id: 'mlbasics', name: 'Machine Learning Basics', desc: 'Intro to ML concepts', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    category: 'Mobile Development',
    icon: <FaMobileAlt size={28} color="#a78bfa" />,
    courses: [
      { id: 'android', name: 'Android App Development', desc: 'Build Android apps from scratch', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80' },
      { id: 'ios', name: 'iOS with Swift', desc: 'Create iOS apps using Swift', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
    ],
  },
];

export default function BrowseCourses() {
  const [search, setSearch] = useState('');

  const filteredData = sampleData.map(cat => ({
    ...cat,
    courses: cat.courses.filter(course =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.courses.length > 0);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Browse Courses</h1>
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search for a course..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
        />
      </div>
      {filteredData.length === 0 && (
        <div className="text-center text-gray-500 text-xl py-20">No courses found.</div>
      )}
      <div className="space-y-16">
        {filteredData.map((cat, idx) => (
          <div key={idx}>
            <div className="flex items-center mb-6">
              <span className="mr-3">{cat.icon}</span>
              <h2 className="text-2xl font-semibold text-gray-800">{cat.category}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {cat.courses.map(course => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group border border-gray-100"
                >
                  <img src={course.img} alt={course.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-indigo-700 mb-2 group-hover:underline">{course.name}</h3>
                    <p className="text-gray-600 mb-3">{course.desc}</p>
                    <span className="inline-block text-indigo-600 font-semibold text-sm">View Details →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 