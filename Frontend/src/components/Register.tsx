import React, { useState, useEffect } from 'react';
import {
  Code2, Users, Sparkles, Gauge, LayoutDashboard, Video, Trophy, GraduationCap,
  FileText, Languages, BadgeCheck, MessageSquare, MonitorPlay, Star, ArrowRight,
  CheckCircle, Globe, Zap, Target, BookOpen, Award, Cpu, Eye, EyeOff
} from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [typingText, setTypingText] = useState('');

  const codeSnippets = [
    'const magic = useAI("optimize");',
    'function collaborate() { return real_time; }',
    'const progress = trackXP(challenge);',
    'export default LearnWithFun;'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const text = codeSnippets[activeFeature];
    let i = 0;
    setTypingText('');
    const typing = setInterval(() => {
      if (i < text.length) {
        setTypingText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, [activeFeature]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) newErrors.name = 'Name is required';
        else if (value.length < 2) newErrors.name = 'Name too short';
        else delete newErrors.name;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) newErrors.email = 'Email is required';
        else if (!emailRegex.test(value)) newErrors.email = 'Invalid email format';
        else delete newErrors.email;
        break;
      case 'password':
        if (!value) newErrors.password = 'Password is required';
        else if (value.length < 8) newErrors.password = 'Password must be 8+ characters';
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = 'Password needs uppercase, lowercase & number';
        } else delete newErrors.password;
        break;
      case 'confirmPassword':
        if (!value) newErrors.confirmPassword = 'Please confirm password';
        else if (value !== formData.password) newErrors.confirmPassword = 'Passwords don\'t match';
        else delete newErrors.confirmPassword;
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });
    
    if (Object.keys(errors).length > 0) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`🎉 Welcome to DevPlatform!\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nYour coding journey begins now!`);
    }, 2000);
  };

  const coreFeatures = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "AI-Powered Code Editor",
      description: "Intelligent autocomplete, real-time error detection, and code optimization suggestions powered by advanced AI.",
      highlight: "90% faster coding"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real-time Collaboration",
      description: "Code together with your team in real-time. See cursors, edits, and comments as they happen.",
      highlight: "Zero-latency sync"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Code Review",
      description: "AI analyzes your code for bugs, performance issues, and suggests improvements instantly.",
      highlight: "99.7% accuracy"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Gamified Learning",
      description: "Earn XP, unlock achievements, and climb leaderboards as you master new programming concepts.",
      highlight: "5x engagement"
    }
  ];

  const advancedFeatures = [
    { icon: <Video />, title: "Interactive Video Lessons", users: "50K+" },
    { icon: <MessageSquare />, title: "Expert Mentorship", users: "1K+ mentors" },
    { icon: <GraduationCap />, title: "Certified Learning Paths", users: "100+ certs" },
    { icon: <MonitorPlay />, title: "Live Coding Sessions", users: "Daily streams" },
    { icon: <FileText />, title: "Tutorial Creator", users: "10K+ tutorials" },
    { icon: <Globe />, title: "Global Community", users: "500K+ devs" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Registration Form */}
        <div className="w-full lg:w-2/5 flex items-start justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo/Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">DevPlatform</h1>
              <p className="text-purple-200">Join 500,000+ developers worldwide</p>
            </div>

            {/* Registration Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Your Account</h2>
              
              {/* Name Field */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border ${errors.name ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                  />
                  {!errors.name && formData.name && (
                    <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-400" />
                  )}
                </div>
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border ${errors.email ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                  />
                  {!errors.email && formData.email && (
                    <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-400" />
                  )}
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border ${errors.password ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border ${errors.confirmPassword ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-white/60 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || Object.keys(errors).length > 0}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    Start Coding Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-white/60 text-sm mt-4">
                Already have an account? <button className="text-purple-300 hover:text-purple-200 transition-colors bg-transparent border-none cursor-pointer">Sign in</button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Feature Showcase */}
        <div className="hidden lg:flex w-3/5 p-8 flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Your All-in-One <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Coding Platform</span>
            </h2>
            <p className="text-xl text-purple-200">Everything you need to learn, practice, and excel in programming</p>
          </div>

          {/* Interactive Code Preview */}
          <div className="bg-black/40 backdrop-blur rounded-2xl p-6 mb-8 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-white/60 text-sm">Live Code Editor</div>
            </div>
            <div className="font-mono text-green-400 text-lg">
              {typingText}<span className="animate-pulse">|</span>
            </div>
          </div>

          {/* Core Features Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-center mb-3">
                  <div className="text-purple-400 mr-3">{feature.icon}</div>
                  <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">{feature.highlight}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Dashboard Preview */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <LayoutDashboard className="w-5 h-5 mr-2 text-purple-400" />
              Your Learning Dashboard Preview
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3 text-white text-center">
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-xs opacity-80">XP Points</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-3 text-white text-center">
                <div className="text-2xl font-bold">23</div>
                <div className="text-xs opacity-80">Badges</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 text-white text-center">
                <div className="text-2xl font-bold">#47</div>
                <div className="text-xs opacity-80">Global Rank</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {advancedFeatures.map((feature, index) => (
                <div key={index} className="flex items-center bg-white/5 rounded-lg p-2">
                  <div className="text-purple-400 mr-2">{feature.icon}</div>
                  <div>
                    <div className="text-white text-xs font-medium">{feature.title}</div>
                    <div className="text-white/60 text-xs">{feature.users}</div>
                  </div>
                </div>
              ))}
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
}