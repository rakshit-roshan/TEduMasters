import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from './CourseService';
import { BookOpen, Search, Loader, AlertCircle } from 'lucide-react';

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
  const { courses, loading, error, fetchCourses } = useCourses();
  const [search, setSearch] = useState('');

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.description.toLowerCase().includes(search.toLowerCase()) ||
    course.category.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCourses = filteredCourses.reduce((acc, course) => {
    const category = course.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(course);
    return acc;
  }, {} as Record<string, typeof courses>);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchCourses}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Browse Courses</h1>
      
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for a course..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
          />
        </div>
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center text-gray-500 text-xl py-20">
          {search ? 'No courses found matching your search.' : 'No courses available.'}
        </div>
      )}

      <div className="space-y-16">
        {Object.entries(groupedCourses).map(([category, categoryCourses]) => (
          <div key={category}>
            <div className="flex items-center mb-6">
              <BookOpen className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">{category}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categoryCourses.map(course => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group border border-gray-100"
                >
                  <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-indigo-700 mb-2 group-hover:underline">{course.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-indigo-600 font-semibold">${course.price}</span>
                      <span className="text-sm text-gray-500">{course.level}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {course.instructor}</span>
                      <span className="text-sm text-gray-500">{course.duration}</span>
                    </div>
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