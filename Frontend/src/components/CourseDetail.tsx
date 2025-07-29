import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const NAV_HEIGHT = 64; // px, adjust if your nav is taller

// --- Your courseTopics data remains the same ---
const courseTopics: Record<string, { title: string; desc: string; img: string; video?: string; topics: { id: string; name: string; content: string; video?: string }[] }> = {
  react101: {
    title: 'React for Beginners',
    desc: 'Start your journey with React.js and build interactive UIs.',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
    video: 'https://www.youtube.com/embed/dGcsHMXbSOA',
    topics: [
      { id: 'intro', name: 'Introduction', content: 'Welcome to React! This is the introduction.', video: 'https://www.youtube.com/embed/dGcsHMXbSOA' },
      { id: 'jsx', name: 'JSX', content: 'JSX lets you write HTML in JavaScript.', video: 'https://www.youtube.com/embed/4UZrsTqkcW4' },
      { id: 'state', name: 'State', content: 'State lets you make components interactive.', video: 'https://www.youtube.com/embed/35lXWvCuM8o' },
      { id: 'props', name: 'Props', content: 'Props let you pass data to components.', video: 'https://www.youtube.com/embed/MhkGQAoc7bc' },
      { id: 'hooks', name: 'Hooks', content: 'Hooks let you use state and other features.', video: 'https://www.youtube.com/embed/f687hBjwFcM' },
      { id: 'router', name: 'React Router', content: 'React Router is for navigation.', video: 'https://www.youtube.com/embed/Law7wfdg_ls' },
      { id: 'context', name: 'Context API', content: 'Context provides global state.', video: 'https://www.youtube.com/embed/35lXWvCuM8o' },
      { id: 'redux', name: 'Redux', content: 'Redux is a state management library.', video: 'https://www.youtube.com/embed/poQXNp9ItL4' },
      { id: 'testing', name: 'Testing', content: 'Learn how to test React apps.', video: 'https://www.youtube.com/embed/3e1GHCA3GP0' },
      { id: 'deploy', name: 'Deployment', content: 'How to deploy your React app.', video: 'https://www.youtube.com/embed/8aGhZQkoFbQ' },
    ],
  },
  jsfund: {
    title: 'JavaScript Fundamentals',
    desc: 'Master the basics of JavaScript for web development.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    video: 'https://www.youtube.com/embed/PkZNo7MFNFg',
    topics: [
      { id: 'vars', name: 'Variables', content: 'Learn about var, let, and const.' },
      { id: 'funcs', name: 'Functions', content: 'Functions are reusable blocks of code.' },
      { id: 'loops', name: 'Loops', content: 'Loops let you repeat actions.' },
      { id: 'arrays', name: 'Arrays', content: 'Arrays store lists of data.' },
      { id: 'objects', name: 'Objects', content: 'Objects store key-value pairs.' },
      { id: 'dom', name: 'DOM Manipulation', content: 'Interact with the web page.' },
      { id: 'events', name: 'Events', content: 'Respond to user actions.' },
      { id: 'async', name: 'Async JS', content: 'Async code with callbacks, promises, async/await.' },
    ],
  },
  pydata: {
    title: 'Python for Data Science',
    desc: 'Analyze data and build models with Python.',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    video: 'https://www.youtube.com/embed/dGcsHMXbSOA',
    topics: [
      { id: 'setup', name: 'Setup', content: 'Install Python and libraries.' },
      { id: 'numpy', name: 'NumPy', content: 'NumPy is for numerical computing.' },
      { id: 'pandas', name: 'Pandas', content: 'Pandas for data manipulation.' },
      { id: 'matplotlib', name: 'Matplotlib', content: 'Matplotlib for data visualization.' },
      { id: 'scikit-learn', name: 'Scikit-learn', content: 'Scikit-learn for machine learning.' },
    ],
  },
  mlbasics: {
    title: 'Machine Learning Basics',
    desc: 'Intro to machine learning concepts and algorithms.',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80',
    video: 'https://www.youtube.com/embed/dGcsHMXbSOA',
    topics: [
      { id: 'mlintro', name: 'ML Intro', content: 'What is Machine Learning?' },
      { id: 'algos', name: 'Algorithms', content: 'Learn about ML algorithms.' },
      { id: 'supervised', name: 'Supervised Learning', content: 'Supervised learning with scikit-learn.' },
      { id: 'unsupervised', name: 'Unsupervised Learning', content: 'Unsupervised learning with scikit-learn.' },
      { id: 'evaluation', name: 'Evaluation', content: 'How to evaluate ML models.' },
    ],
  },
  android: {
    title: 'Android App Development',
    desc: 'Build Android apps from scratch using Java or Kotlin.',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
    video: 'https://www.youtube.com/embed/dGcsHMXbSOA',
    topics: [
      { id: 'androidintro', name: 'Intro to Android', content: 'Android basics.' },
      { id: 'uidev', name: 'UI Development', content: 'Building Android UIs.' },
      { id: 'fragments', name: 'Fragments', content: 'Using Fragments in Android.' },
      { id: 'navigation', name: 'Navigation', content: 'Android Navigation Components.' },
      { id: 'data', name: 'Data Storage', content: 'Storing data in Android.' },
    ],
  },
  ios: {
    title: 'iOS with Swift',
    desc: 'Create iOS apps using Swift and Xcode.',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
    video: 'https://www.youtube.com/embed/dGcsHMXbSOA',
    topics: [
      { id: 'swiftintro', name: 'Swift Intro', content: 'Getting started with Swift.' },
      { id: 'storyboard', name: 'Storyboard', content: 'Designing with Storyboard.' },
      { id: 'xcode', name: 'Xcode Basics', content: 'Using Xcode for iOS development.' },
      { id: 'swiftui', name: 'SwiftUI', content: 'Building iOS apps with SwiftUI.' },
    ],
  },
};


export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseTopics[courseId || ''];
  const [selected, setSelected] = useState(0);
  const [sliderOpen, setSliderOpen] = useState(false);

  if (!course) {
    return <div className="p-10 text-center text-2xl text-gray-500">Course not found.</div>;
  }

  const bannerVideoUrl = course.video;

  return (
    <div className="flex min-h-screen">
      {/* Solid, full-height, left-aligned sidebar below nav */}
      <aside
        className="hidden md:flex flex-col w-64 bg-indigo-700 text-white pt-0 pb-0 border-r border-indigo-800 fixed left-0 z-20"
        style={{ top: NAV_HEIGHT, height: `calc(100vh - ${NAV_HEIGHT}px)` }}
      >
        <div className="flex flex-col flex-1 overflow-y-auto h-full">
          <div className="px-6 py-8 border-b border-indigo-800">
            <h2 className="text-2xl font-bold mb-2">Topics</h2>
            <div className="text-indigo-200 text-sm mb-2">{course.title}</div>
          </div>
          <ul className="flex-1 space-y-1 px-2 py-4">
            {course.topics.map((topic, idx) => (
              <li key={topic.id}>
                <button
                  onClick={() => setSelected(idx)}
                  className={`w-full text-left px-5 py-3 rounded-lg transition font-medium text-base hover:bg-indigo-600 focus:outline-none ${idx === selected ? 'bg-white text-indigo-700 font-bold shadow' : 'bg-indigo-700 text-white'}`}
                  style={{ boxShadow: idx === selected ? '0 4px 16px rgba(99,102,241,0.10)' : undefined }}
                >
                  {topic.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 py-4 px-6">
          <Link to="/courses" className="hover:underline text-indigo-600">Courses</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-medium">{course.title}</span>
        </nav>
        {/* Banner with Start Video button */}
        <div className="relative h-40 md:h-56 rounded-3xl overflow-hidden mb-8 shadow-lg mx-6 flex items-center justify-center">
          <img
            src={course.img}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover object-center blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-indigo-400/30" />
          <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 items-center w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg text-center w-full">{course.title}</h1>
            <p className="text-md md:text-lg text-indigo-100 mb-4 max-w-2xl drop-shadow text-center w-full">{course.desc}</p>
            <button
              className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg shadow hover:bg-indigo-50 w-max transition text-lg mt-2"
              onClick={() => setSliderOpen(true)}
            >
              ▶ Start Video
            </button>
          </div>
        </div>

        {/* Video Slider Drawer - MODIFIED */}
        <>
          {/* Overlay */}
          <div
            onClick={() => setSliderOpen(false)}
            className={`fixed inset-0 bg-black z-40 transition-opacity duration-300
              ${sliderOpen ? 'bg-opacity-50 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'}`}
          />
          {/* Sliding Panel */}
          <div
            style={{ marginTop: NAV_HEIGHT }}
            className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-white z-50 shadow-2xl 
                        transition-transform duration-500 ease-in-out transform 
                        ${sliderOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200" style={{ height: NAV_HEIGHT }}>
              <span className="font-bold text-indigo-700 text-lg">Course Video</span>
              <button
                className="text-gray-500 hover:text-indigo-700 text-2xl font-bold focus:outline-none"
                onClick={() => setSliderOpen(false)}
                aria-label="Close video"
              >
                ×
              </button>
            </div>
            <div className="p-6 pt-2 flex flex-col items-center justify-center h-[calc(100vh-64px)]">
              <div className="w-full aspect-w-16 aspect-h-9 bg-black rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={sliderOpen ? bannerVideoUrl : ''}
                  title="Course Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-72 md:h-96"
                />
                _     </div>
            </div>
          </div>
        </>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-lg p-10 min-h-[340px] border border-indigo-100 transition-all duration-300 mx-6 mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6 tracking-tight">{course.topics[selected].name}</h3>
          <div className="text-lg text-gray-700 leading-relaxed">
            {course.topics[selected].content}
          </div>
        </div>
      </main>
    </div>
  );
}