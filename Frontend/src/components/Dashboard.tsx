import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Plus, Home, BookOpen, Users, BarChart3, Settings, Bell, Search,
  Upload, Save, Eye, Code, Type, Image, Video, FileText, Copy,
  ChevronDown, ChevronRight, Menu, X, Trash2, Edit3, Move,
  ArrowRight, Layout, Palette, Monitor, Play, Pause, SkipForward,
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline,
  List, ListOrdered, Quote, Link, Calendar, Star, TrendingUp,
  DollarSign, Clock, Award, MessageCircle, ThumbsUp, Share2,
  Filter, SortAsc, MoreVertical, ChevronLeft, Download, Archive,
  HardDrive
} from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // A dark, "Mac-like" theme

// --- Component for individual content blocks ---

// Common Wrapper for all blocks
const BlockWrapper = ({ children, isSelected, onSelect, onDelete, onDuplicate }) => {
  return (
    <div
      className={`relative group p-4 mb-4 rounded-xl transition-all duration-200 ${
        isSelected ? 'bg-indigo-50 border border-indigo-300 shadow-md' : 'bg-white/80 border border-white/20 shadow-sm hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      {children}
      <div className={`absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isSelected ? 'opacity-100' : ''}`}>
        <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="p-1 rounded-md text-gray-500 hover:bg-gray-100"><Copy className="w-4 h-4" /></button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1 rounded-md text-red-500 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

// Header Block
const HeaderBlock = ({ block, onUpdate, headerSizes }) => {
  return (
    <BlockWrapper {...block} onUpdate={onUpdate}>
      <div className="flex items-center space-x-2 mb-2">
        <select
          value={block.content.size}
          onChange={(e) => onUpdate(block.id, { size: e.target.value })}
          className="px-2 py-1 text-sm border border-gray-200 rounded-md bg-white/60"
        >
          {headerSizes.map(h => (
            <option key={h.size} value={h.size}>{h.label}</option>
          ))}
        </select>
        <select
          value={block.content.alignment}
          onChange={(e) => onUpdate(block.id, { alignment: e.target.value })}
          className="px-2 py-1 text-sm border border-gray-200 rounded-md bg-white/60"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <input
        type="text"
        value={block.content.text}
        onChange={(e) => onUpdate(block.id, { text: e.target.value })}
        className={`${headerSizes.find(h => h.size === block.content.size)?.class || 'text-2xl font-semibold'} w-full bg-transparent border-none outline-none`}
        style={{ textAlign: block.content.alignment }}
        placeholder="Enter header text"
      />
    </BlockWrapper>
  );
};

// Text Block (basic markdown-like)
const TextBlock = ({ block, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editing]);

  const handleBlur = () => {
    setEditing(false);
  };

  const renderMarkdown = (text) => {
    // Basic markdown parsing
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/__(.*?)__/g, '<u>$1</u>') // Underline
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-indigo-600 hover:underline">$1</a>'); // Links
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <BlockWrapper {...block} onUpdate={onUpdate} onSelect={() => setEditing(true)}>
      {editing ? (
        <textarea
          ref={textareaRef}
          value={block.content.text}
          onChange={(e) => onUpdate(block.id, { text: e.target.value })}
          onBlur={handleBlur}
          className="w-full min-h-[100px] px-2 py-1 text-gray-800 bg-white/60 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          placeholder="Enter your text content. Use **bold**, *italic*, __underline__, or [link](url)."
        />
      ) : (
        <div 
          className="prose prose-indigo max-w-none text-gray-800" 
          onClick={() => setEditing(true)}
          style={{ textAlign: block.content.alignment }}
        >
          {renderMarkdown(block.content.text || 'Click to edit text...')}
        </div>
      )}
      <div className="flex items-center space-x-2 mt-2">
        <select
          value={block.content.alignment}
          onChange={(e) => onUpdate(block.id, { alignment: e.target.value })}
          className="px-2 py-1 text-sm border border-gray-200 rounded-md bg-white/60"
        >
          <option value="left"><AlignLeft className="w-4 h-4 inline-block mr-1" /> Left</option>
          <option value="center"><AlignCenter className="w-4 h-4 inline-block mr-1" /> Center</option>
          <option value="right"><AlignRight className="w-4 h-4 inline-block mr-1" /> Right</option>
        </select>
        {/* Basic formatting controls can be added here */}
      </div>
    </BlockWrapper>
  );
};


// Code Block
const CodeBlock = ({ block, onUpdate, onCopy, codeLanguages }) => {
  return (
    <BlockWrapper {...block} onUpdate={onUpdate}>
      <div className="bg-gray-900 rounded-lg overflow-hidden font-mono text-sm shadow-xl">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <input
              type="text"
              value={block.content.title}
              onChange={(e) => onUpdate(block.id, { title: e.target.value })}
              className="bg-transparent border-none outline-none text-gray-400 text-sm placeholder-gray-500 w-32"
              placeholder="Code title (e.g., app.js)"
            />
          </div>
          <button
            onClick={() => onCopy(block.content.code)}
            className="flex items-center text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-700"
          >
            <Copy className="w-4 h-4 mr-1" /> Copy
          </button>
        </div>
        <div className="relative">
          <SyntaxHighlighter
            language={block.content.language}
            style={vs2015} // Using a dark theme for Mac-like appearance
            showLineNumbers={block.content.showLineNumbers}
            lineNumberStyle={{ color: '#666', fontSize: '0.8em' }}
            codeTagProps={{ style: { fontFamily: 'Fira Code, monospace', fontSize: '0.9em' } }}
            wrapLines={true}
            customStyle={{ padding: '1rem', margin: 0, background: 'transparent' }}
          >
            {block.content.code}
          </SyntaxHighlighter>
          <textarea
            value={block.content.code}
            onChange={(e) => onUpdate(block.id, { code: e.target.value })}
            className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white resize-none border-none outline-none p-4 font-mono text-sm leading-snug"
            spellCheck="false"
          />
        </div>
        <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={block.content.showLineNumbers}
              onChange={(e) => onUpdate(block.id, { showLineNumbers: e.target.checked })}
              id={`line-numbers-${block.id}`}
              className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor={`line-numbers-${block.id}`} className="text-gray-400 text-xs">Line Numbers</label>
          </div>
          <select
            value={block.content.language}
            onChange={(e) => onUpdate(block.id, { language: e.target.value })}
            className="px-2 py-1 text-xs border border-gray-700 rounded-md bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500"
          >
            {codeLanguages.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>
      </div>
    </BlockWrapper>
  );
};

// Image Block
const ImageBlock = ({ block, onUpdate }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(block.id, { src: reader.result, alt: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <BlockWrapper {...block} onUpdate={onUpdate}>
      <div className="flex flex-col items-center">
        {block.content.src ? (
          <img src={block.content.src} alt={block.content.alt} className="max-w-full h-auto rounded-lg shadow-md mb-3" style={{ maxWidth: block.content.width }} />
        ) : (
          <div className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 mb-3">
            <Upload className="w-10 h-10 mb-2" />
            <p className="text-sm">Drag & drop an image or</p>
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-indigo-600 hover:underline text-sm mt-1"
            >
              Browse to upload
            </button>
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
        )}
        <input
          type="text"
          value={block.content.caption}
          onChange={(e) => onUpdate(block.id, { caption: e.target.value })}
          className="w-full px-3 py-2 text-sm text-center border border-gray-200 rounded-md bg-white/60 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Add a caption for your image"
        />
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="range"
            min="10"
            max="100"
            step="1"
            value={parseInt(block.content.width || '100')}
            onChange={(e) => onUpdate(block.id, { width: `${e.target.value}%` })}
            className="w-32"
          />
          <span className="text-sm text-gray-600">{parseInt(block.content.width || '100')}% Width</span>
        </div>
      </div>
    </BlockWrapper>
  );
};

// Video Block
const VideoBlock = ({ block, onUpdate }) => {
  const isYouTube = block.content.src && block.content.src.includes('youtube.com/watch');
  const embedSrc = isYouTube 
    ? block.content.src.replace('watch?v=', 'embed/') 
    : block.content.src;

  return (
    <BlockWrapper {...block} onUpdate={onUpdate}>
      <input
        type="text"
        value={block.content.src}
        onChange={(e) => onUpdate(block.id, { src: e.target.value })}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/60 mb-3"
        placeholder="Paste YouTube or Vimeo video URL here"
      />
      {block.content.src && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
          <iframe
            src={embedSrc}
            title={block.content.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      )}
      <input
        type="text"
        value={block.content.title}
        onChange={(e) => onUpdate(block.id, { title: e.target.value })}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-white/60 focus:ring-indigo-500 focus:border-indigo-500 mt-3"
        placeholder="Video Title (Optional)"
      />
      <textarea
        value={block.content.description}
        onChange={(e) => onUpdate(block.id, { description: e.target.value })}
        rows={2}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-white/60 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mt-2"
        placeholder="Video description (Optional)"
      />
      <div className="flex items-center space-x-4 mt-2">
        <label className="flex items-center text-sm text-gray-700">
          <input
            type="checkbox"
            checked={block.content.autoplay}
            onChange={(e) => onUpdate(block.id, { autoplay: e.target.checked })}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span className="ml-2">Autoplay</span>
        </label>
        <label className="flex items-center text-sm text-gray-700">
          <input
            type="checkbox"
            checked={block.content.controls}
            onChange={(e) => onUpdate(block.id, { controls: e.target.checked })}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span className="ml-2">Show Controls</span>
        </label>
      </div>
    </BlockWrapper>
  );
};

// Quote Block
const QuoteBlock = ({ block, onUpdate }) => {
  return (
    <BlockWrapper {...block} onUpdate={onUpdate}>
      <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 italic text-gray-700">
        <textarea
          value={block.content.text}
          onChange={(e) => onUpdate(block.id, { text: e.target.value })}
          className="w-full bg-transparent border-none outline-none text-lg resize-none"
          rows={3}
          placeholder="Enter quote text here..."
        />
        <input
          type="text"
          value={block.content.author}
          onChange={(e) => onUpdate(block.id, { author: e.target.value })}
          className="w-full bg-transparent border-none outline-none text-sm text-gray-600 mt-2"
          placeholder="— Author Name"
        />
      </blockquote>
      <select
          value={block.content.alignment}
          onChange={(e) => onUpdate(block.id, { alignment: e.target.value })}
          className="px-2 py-1 text-sm border border-gray-200 rounded-md bg-white/60 mt-2"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
    </BlockWrapper>
  );
};

// List Block
const ListBlock = ({ block, onUpdate }) => {
  const handleItemChange = (index, value) => {
    const newItems = [...block.content.items];
    newItems[index] = value;
    onUpdate(block.id, { items: newItems });
  };

  const handleAddItem = () => {
    onUpdate(block.id, { items: [...block.content.items, ''] });
  };

  const handleRemoveItem = (index) => {
    const newItems = block.content.items.filter((_, i) => i !== index);
    onUpdate(block.id, { items: newItems });
  };

  return (
    <BlockWrapper {...block} onUpdate={onUpdate}>
      <div className="flex items-center space-x-2 mb-2">
        <select
          value={block.content.type}
          onChange={(e) => onUpdate(block.id, { type: e.target.value })}
          className="px-2 py-1 text-sm border border-gray-200 rounded-md bg-white/60"
        >
          <option value="bullet">Bullet List</option>
          <option value="numbered">Numbered List</option>
        </select>
        <select
          value={block.content.alignment}
          onChange={(e) => onUpdate(block.id, { alignment: e.target.value })}
          className="px-2 py-1 text-sm border border-gray-200 rounded-md bg-white/60"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      {(block.content.type === 'bullet' ? (
        <ul className="list-disc pl-5 space-y-1">
          {block.content.items.map((item, index) => (
            <li key={index} className="flex items-center group">
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className="w-full bg-transparent border-none outline-none text-gray-800"
                placeholder="List item"
                style={{ textAlign: block.content.alignment }}
              />
              <button
                onClick={() => handleRemoveItem(index)}
                className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ol className="list-decimal pl-5 space-y-1">
          {block.content.items.map((item, index) => (
            <li key={index} className="flex items-center group">
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className="w-full bg-transparent border-none outline-none text-gray-800"
                placeholder="List item"
                style={{ textAlign: block.content.alignment }}
              />
              <button
                onClick={() => handleRemoveItem(index)}
                className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </li>
          ))}
        </ol>
      ))}
      <button
        onClick={handleAddItem}
        className="mt-2 text-indigo-600 hover:text-indigo-700 flex items-center text-sm"
      >
        <Plus className="w-4 h-4 mr-1" /> Add item
      </button>
    </BlockWrapper>
  );
};

// Divider Block
const DividerBlock = ({ block, onUpdate }) => {
  return (
    <BlockWrapper {...block} onUpdate={onUpdate}>
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">Divider</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex items-center space-x-4 mt-2">
        <label className="flex items-center text-sm text-gray-700">Style:</label>
        <select
          value={block.content.style}
          onChange={(e) => onUpdate(block.id, { style: e.target.value })}
          className="px-2 py-1 text-sm border border-gray-200 rounded-md bg-white/60"
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
        <label className="flex items-center text-sm text-gray-700">Thickness:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={block.content.thickness}
          onChange={(e) => onUpdate(block.id, { thickness: parseInt(e.target.value) || 1 })}
          className="w-16 px-2 py-1 text-sm border border-gray-200 rounded-md bg-white/60"
        />
        <label className="flex items-center text-sm text-gray-700">Color:</label>
        <input
          type="color"
          value={block.content.color}
          onChange={(e) => onUpdate(block.id, { color: e.target.value })}
          className="w-8 h-8 rounded-md border-none cursor-pointer"
        />
      </div>
    </BlockWrapper>
  );
};

// Page Break Block (for "next page" functionality)
const PageBreakBlock = ({ block, onUpdate }) => {
  return (
    <BlockWrapper {...block} onUpdate={onUpdate}>
      <div className="text-center py-4 border-t-2 border-b-2 border-dashed border-indigo-200 text-indigo-500 font-medium bg-indigo-50 rounded-lg">
        <ArrowRight className="inline-block w-5 h-5 mr-2" />
        PAGE BREAK - New Section Starts Here
        <ArrowRight className="inline-block w-5 h-5 ml-2" />
      </div>
      <p className="text-center text-xs text-gray-500 mt-2">Content below this line will appear on a new "page" or section for students.</p>
    </BlockWrapper>
  );
};

// --- Main Dashboard Component ---

export default function CourseDashboard() {
  const [activeMenu, setActiveMenu] = useState('create-course');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentCourse, setCurrentCourse] = useState(null); // When editing an existing course
  const [courseTopics, setCourseTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [topicContent, setTopicContent] = useState({}); // { topicId: [blocks] }
  const [showBlockOptions, setShowBlockOptions] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null); // ID of the currently selected block for editing
  const [previewMode, setPreviewMode] = useState(false);

  // Course creation states
  const [courseForm, setCourseForm] = useState({
    title: 'New Programming Course',
    description: 'A comprehensive guide to modern programming.',
    category: 'web-dev',
    difficulty: 'beginner',
    price: '49.99',
    duration: '8 hours',
    thumbnail: null,
    tags: ['programming', 'web', 'frontend'],
    requirements: ['Basic computer literacy', 'Internet connection'],
    objectives: ['Build interactive web apps', 'Understand fundamental concepts']
  });

  const fileInputRef = useRef(null); // For course thumbnail upload

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'create-course', label: 'Create Course', icon: Plus },
    { id: 'my-courses', label: 'My Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'certifications', label: 'Certifications', icon: Award }, // New item
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const blockTypes = [
    { type: 'header', label: 'Header', icon: Type, color: 'bg-blue-500', description: 'Add section headers' },
    { type: 'text', label: 'Text Block', icon: FileText, color: 'bg-green-500', description: 'Rich text content' },
    { type: 'code', label: 'Code Block', icon: Code, color: 'bg-purple-500', description: 'Syntax highlighted code' },
    { type: 'image', label: 'Image', icon: Image, color: 'bg-orange-500', description: 'Upload images' },
    { type: 'video', label: 'Video', icon: Video, color: 'bg-red-500', description: 'Embed videos' },
    { type: 'quote', label: 'Quote', icon: Quote, color: 'bg-indigo-500', description: 'Highlighted quotes' },
    { type: 'list', label: 'List', icon: List, color: 'bg-teal-500', description: 'Bullet or numbered lists' },
    { type: 'divider', label: 'Divider', icon: AlignCenter, color: 'bg-gray-500', description: 'Section separator' },
    { type: 'page-break', label: 'Page Break', icon: ArrowRight, color: 'bg-yellow-500', description: 'Separate content into pages' }, // New block type
  ];

  const headerSizes = [
    { size: 'h1', label: 'Heading 1', class: 'text-4xl font-bold' },
    { size: 'h2', label: 'Heading 2', class: 'text-3xl font-bold' },
    { size: 'h3', label: 'Heading 3', class: 'text-2xl font-semibold' },
    { size: 'h4', label: 'Heading 4', class: 'text-xl font-semibold' },
    { size: 'h5', label: 'Heading 5', class: 'text-lg font-medium' },
    { size: 'h6', label: 'Heading 6', class: 'text-base font-medium' },
  ];

  const codeLanguages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'jsx', label: 'React JSX' }, // Use 'jsx' for react-syntax-highlighter
    { value: 'typescript', label: 'TypeScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'sql', label: 'SQL' },
    { value: 'json', label: 'JSON' },
    { value: 'markup', label: 'XML/HTML' }, // generic markup
  ];

  // Initialize with a default course and topic if none exist
  useEffect(() => {
    if (!currentCourse) {
      // Simulate loading an initial course structure or creating a new one
      setCurrentCourse({ id: 'course-1', title: courseForm.title });
    }

    if (courseTopics.length === 0 && currentCourse) {
      const defaultTopic = {
        id: 'topic-1',
        title: 'Course Introduction',
        order: 0,
        duration: '10 min'
      };
      setCourseTopics([defaultTopic]);
      setCurrentTopic(defaultTopic.id);
      setTopicContent({ [defaultTopic.id]: [] });
    }
  }, [currentCourse, courseTopics.length, courseForm.title]);

  const addTopic = () => {
    const newTopic = {
      id: `topic-${Date.now()}`,
      title: `New Topic ${courseTopics.length + 1}`,
      order: courseTopics.length,
      duration: '15 min'
    };
    setCourseTopics([...courseTopics, newTopic]);
    setTopicContent(prev => ({ ...prev, [newTopic.id]: [] }));
    setCurrentTopic(newTopic.id);
  };

  const updateTopic = (topicId, updates) => {
    setCourseTopics(prev =>
      prev.map(topic =>
        topic.id === topicId ? { ...topic, ...updates } : topic
      )
    );
  };

  const deleteTopic = (topicId) => {
    if (courseTopics.length > 1) {
      setCourseTopics(prev => {
        const updatedTopics = prev.filter(topic => topic.id !== topicId);
        if (currentTopic === topicId) {
          setCurrentTopic(updatedTopics[0]?.id || null);
        }
        return updatedTopics;
      });
      setTopicContent(prev => {
        const newContent = { ...prev };
        delete newContent[topicId];
        return newContent;
      });
    } else {
      alert("Cannot delete the last topic. A course must have at least one topic.");
    }
  };

  const addBlock = (type) => {
    if (!currentTopic) return;

    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      order: (topicContent[currentTopic] || []).length,
    };

    setTopicContent(prev => ({
      ...prev,
      [currentTopic]: [...(prev[currentTopic] || []), newBlock]
    }));
    setShowBlockOptions(false);
    setSelectedBlock(newBlock.id); // Select the newly added block
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'header':
        return { text: 'New Header', size: 'h2', alignment: 'left' };
      case 'text':
        return { text: 'Enter your text content here. Use **bold**, *italic*, __underline__, or [link](https://example.com).', alignment: 'left' };
      case 'code':
        return {
          code: '// Welcome to the code editor\nconsole.log("Hello, World!");\n// You can change language, show/hide line numbers',
          language: 'javascript',
          showLineNumbers: true,
          title: 'Example Code'
        };
      case 'image':
        return { src: '', alt: 'Descriptive alt text', caption: '', alignment: 'center', width: '100%' };
      case 'video':
        return { src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Example Video', description: '', autoplay: false, controls: true };
      case 'quote':
        return { text: 'This is an inspiring quote.', author: 'Someone Famous', alignment: 'left' };
      case 'list':
        return { items: ['First item', 'Second item', 'Third item'], type: 'bullet', alignment: 'left' };
      case 'divider':
        return { style: 'solid', thickness: 1, color: '#e5e7eb' };
      case 'page-break':
        return {};
      default:
        return {};
    }
  };

  const updateBlockContent = useCallback((blockId, newContent) => {
    if (!currentTopic) return;

    setTopicContent(prev => ({
      ...prev,
      [currentTopic]: (prev[currentTopic] || []).map(block =>
        block.id === blockId
          ? { ...block, content: { ...block.content, ...newContent }}
          : block
      )
    }));
  }, [currentTopic]);

  const deleteBlock = useCallback((blockId) => {
    if (!currentTopic) return;

    setTopicContent(prev => ({
      ...prev,
      [currentTopic]: (prev[currentTopic] || []).filter(block => block.id !== blockId)
    }));
    if (selectedBlock === blockId) {
      setSelectedBlock(null);
    }
  }, [currentTopic, selectedBlock]);

  const duplicateBlock = useCallback((blockId) => {
    if (!currentTopic) return;

    const blockToCopy = (topicContent[currentTopic] || []).find(block => block.id === blockId);
    if (blockToCopy) {
      const newBlock = {
        ...blockToCopy,
        id: `block-${Date.now()}-copy`, // Ensure unique ID
        order: blockToCopy.order + 0.5 // Allows for sorting later
      };

      setTopicContent(prev => {
        const updatedBlocks = [...(prev[currentTopic] || []), newBlock];
        // Re-sort blocks by order after duplication
        return {
          ...prev,
          [currentTopic]: updatedBlocks.sort((a, b) => a.order - b.order)
        };
      });
      setSelectedBlock(newBlock.id); // Select the new duplicated block
    }
  }, [currentTopic, topicContent]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Code copied to clipboard!'))
      .catch(err => console.error('Failed to copy text: ', err));
  };

  const handleCourseFormChange = (e) => {
    const { name, value } = e.target;
    setCourseForm(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseForm(prev => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderBlock = (block) => {
    const commonProps = {
      block,
      onUpdate: updateBlockContent,
      onDelete: deleteBlock,
      onDuplicate: duplicateBlock,
      isSelected: selectedBlock === block.id,
      onSelect: () => setSelectedBlock(block.id)
    };

    if (previewMode) {
      // In preview mode, render simplified versions without editing controls
      switch (block.type) {
        case 'header':
          const HeaderTag = block.content.size;
          return <HeaderTag className={`${headerSizes.find(h => h.size === block.content.size)?.class || 'text-2xl font-semibold'} text-gray-900 mb-2`} style={{ textAlign: block.content.alignment }}>{block.content.text}</HeaderTag>;
        case 'text':
          return <div className="prose prose-indigo max-w-none text-gray-800 mb-2" style={{ textAlign: block.content.alignment }} dangerouslySetInnerHTML={{ __html: block.content.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/__(.*?)__/g, '<u>$1</u>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-indigo-600 hover:underline">$1</a>') }} />;
        case 'code':
          return (
            <div className="bg-gray-900 rounded-lg overflow-hidden font-mono text-sm shadow-md mb-2">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 text-gray-400">
                <span>{block.content.title} ({block.content.language})</span>
              </div>
              <SyntaxHighlighter
                language={block.content.language}
                style={vs2015}
                showLineNumbers={block.content.showLineNumbers}
                lineNumberStyle={{ color: '#666', fontSize: '0.8em' }}
                codeTagProps={{ style: { fontFamily: 'Fira Code, monospace', fontSize: '0.9em' } }}
                wrapLines={true}
                customStyle={{ padding: '1rem', margin: 0, background: 'transparent' }}
              >
                {block.content.code}
              </SyntaxHighlighter>
            </div>
          );
        case 'image':
          return (
            <div className="mb-2" style={{ textAlign: block.content.alignment }}>
              {block.content.src && <img src={block.content.src} alt={block.content.alt} className="max-w-full h-auto rounded-lg shadow-md mx-auto" style={{ maxWidth: block.content.width }} />}
              {block.content.caption && <p className="text-sm text-gray-600 mt-1 text-center">{block.content.caption}</p>}
            </div>
          );
        case 'video':
          const previewEmbedSrc = block.content.src && block.content.src.includes('youtube.com/watch')
            ? block.content.src.replace('watch?v=', 'embed/')
            : block.content.src;
          return block.content.src ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md mb-2">
              <iframe
                src={previewEmbedSrc}
                title={block.content.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
              {block.content.title && <p className="text-lg font-medium text-gray-900 mt-2">{block.content.title}</p>}
              {block.content.description && <p className="text-sm text-gray-600">{block.content.description}</p>}
            </div>
          ) : null;
        case 'quote':
          return (
            <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 italic text-gray-700 mb-2" style={{ textAlign: block.content.alignment }}>
              <p className="text-lg">{block.content.text}</p>
              {block.content.author && <p className="text-sm text-gray-600 mt-2">-- {block.content.author}</p>}
            </blockquote>
          );
        case 'list':
          return (
            block.content.type === 'bullet' ? (
              <ul className="list-disc pl-5 space-y-1 text-gray-800 mb-2" style={{ textAlign: block.content.alignment }}>
                {block.content.items.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            ) : (
              <ol className="list-decimal pl-5 space-y-1 text-gray-800 mb-2" style={{ textAlign: block.content.alignment }}>
                {block.content.items.map((item, index) => <li key={index}>{item}</li>)}
              </ol>
            )
          );
        case 'divider':
          return <div className="relative flex items-center py-2 mb-4"><div className="flex-grow" style={{ borderTop: `${block.content.thickness}px ${block.content.style} ${block.content.color}` }}></div></div>;
        case 'page-break':
          return (
            <div className="text-center py-4 border-t-2 border-b-2 border-dashed border-indigo-200 text-indigo-500 font-medium bg-indigo-50 rounded-lg my-4">
              --- END OF PAGE ---
            </div>
          );
        default:
          return null;
      }
    } else {
      // In edit mode, render components with controls
      switch (block.type) {
        case 'header':
          return <HeaderBlock {...commonProps} headerSizes={headerSizes} />;
        case 'text':
          return <TextBlock {...commonProps} />;
        case 'code':
          return <CodeBlock {...commonProps} onCopy={copyToClipboard} codeLanguages={codeLanguages} />;
        case 'image':
          return <ImageBlock {...commonProps} />;
        case 'video':
          return <VideoBlock {...commonProps} />;
        case 'quote':
          return <QuoteBlock {...commonProps} />;
        case 'list':
          return <ListBlock {...commonProps} />;
        case 'divider':
          return <DividerBlock {...commonProps} />;
        case 'page-break':
          return <PageBreakBlock {...commonProps} />;
        default:
          return null;
      }
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl transform transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mr-3">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">TEduMasters</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                activeMenu === item.id
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 transition-transform duration-200 ${activeMenu === item.id ? '' : 'group-hover:scale-110'}`} />
              <span className="font-medium">{item.label}</span>
              {item.id === 'reviews' && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50">
          <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div>
              <p className="font-medium text-gray-900">John Doe</p>
              <p className="text-sm text-gray-600">Premium Instructor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 mr-4 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeMenu === 'create-course' ? 'Course Builder' :
                   activeMenu === 'dashboard' ? 'Instructor Dashboard' :
                   activeMenu === 'my-courses' ? 'My Courses' :
                   activeMenu === 'certifications' ? 'Certifications Management' :
                   activeMenu === 'students' ? 'Students Overview' :
                   activeMenu === 'analytics' ? 'Course Analytics' :
                   activeMenu === 'revenue' ? 'Revenue Insights' :
                   activeMenu === 'reviews' ? 'Student Reviews' :
                   activeMenu === 'settings' ? 'Account Settings' :
                   'TEduMasters'}
                </h2>
                {activeMenu === 'create-course' && (
                  <p className="text-gray-600 text-sm">Create engaging courses with our powerful editor</p>
                )}
                {activeMenu === 'certifications' && (
                  <p className="text-gray-600 text-sm">Manage certifications for your courses</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search courses, students..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/60 backdrop-blur-sm transition-all"
                />
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 relative transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* --- Content Area based on Active Menu --- */}
        <div className="p-6">
          {/* Create Course Section */}
          {activeMenu === 'create-course' && (
            <div className="grid grid-cols-12 gap-6">
              {/* Course Settings Panel */}
              <div className="col-span-12 lg:col-span-3">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Palette className="w-5 h-5 mr-2 text-indigo-600" />
                    Course Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
                      <input
                        type="text"
                        name="title"
                        value={courseForm.title}
                        onChange={handleCourseFormChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/60"
                        placeholder="Enter course title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={courseForm.description}
                        onChange={handleCourseFormChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/60"
                        placeholder="Brief course description"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          name="category"
                          value={courseForm.category}
                          onChange={handleCourseFormChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/60"
                        >
                          <option value="">Select</option>
                          <option value="web-dev">Web Development</option>
                          <option value="data-science">Data Science</option>
                          <option value="mobile-dev">Mobile Development</option>
                          <option value="ml">Machine Learning</option>
                          <option value="design">Design</option>
                          <option value="business">Business</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                        <select
                          name="difficulty"
                          value={courseForm.difficulty}
                          onChange={handleCourseFormChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/60"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                        <input
                          type="number"
                          name="price"
                          value={courseForm.price}
                          onChange={handleCourseFormChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/60"
                          placeholder="99"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={courseForm.duration}
                          onChange={handleCourseFormChange}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/60"
                          placeholder="8 weeks"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course Thumbnail</label>
                      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleThumbnailUpload} className="hidden" />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="w-full bg-white/60 border border-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Thumbnail
                      </button>
                      {courseForm.thumbnail && (
                        <img src={courseForm.thumbnail} alt="Thumbnail Preview" className="mt-3 rounded-lg max-w-full h-auto" />
                      )}
                    </div>

                    {/* Tags, Requirements, Objectives (can be expanded to input fields with add/remove functionality) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                      <input
                        type="text"
                        name="tags"
                        value={courseForm.tags.join(', ')}
                        onChange={(e) => setCourseForm({...courseForm, tags: e.target.value.split(',').map(tag => tag.trim())})}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/60"
                        placeholder="e.g., react, javascript, web development"
                      />
                    </div>

                    <div className="pt-4 space-y-3">
                      <button
                        onClick={() => setPreviewMode(!previewMode)}
                        className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg transform hover:scale-105"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {previewMode ? 'Exit Preview' : 'Preview Course'}
                      </button>
                      <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center shadow-md">
                        <Save className="w-4 h-4 mr-2" />
                        Save Course
                      </button>
                      <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center shadow-md">
                        <Upload className="w-4 h-4 mr-2" />
                        Publish Course
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topics Sidebar */}
              <div className="col-span-12 lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Course Topics</h3>
                      <button
                        onClick={addTopic}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Add New Topic"
                      >
                        <Plus className="w-4 h-4 text-indigo-600" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar"> {/* Dynamic height */}
                    {courseTopics.map((topic, index) => (
                      <div
                        key={topic.id}
                        className={`p-3 border-b border-gray-100 cursor-pointer transition-colors ${
                          currentTopic === topic.id ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setCurrentTopic(topic.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0 pr-2">
                            <input
                              type="text"
                              value={topic.title}
                              onChange={(e) => updateTopic(topic.id, { title: e.target.value })}
                              className="w-full bg-transparent border-none outline-none text-sm font-medium text-gray-900 truncate"
                              onClick={(e) => e.stopPropagation()} // Prevent topic selection when editing title
                            />
                            <p className="text-xs text-gray-600 mt-1">{topic.duration}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTopic(topic.id);
                            }}
                            className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                            title="Delete Topic"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Content Builder */}
              <div className="col-span-12 lg:col-span-7">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {courseTopics.find(t => t.id === currentTopic)?.title || 'Course Content'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {previewMode ? 'Preview of your lesson content' : 'Build your lesson content with interactive blocks'}
                        </p>
                      </div>
                      {!previewMode && (
                        <div className="relative">
                          <button
                            onClick={() => setShowBlockOptions(!showBlockOptions)}
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 shadow-lg transform hover:scale-105"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Block
                          </button>

                          {showBlockOptions && (
                            <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-20">
                              <div className="px-4 py-2 border-b border-gray-100">
                                <h4 className="font-medium text-gray-900">Content Blocks</h4>
                              </div>
                              {blockTypes.map(block => (
                                <button
                                  key={block.type}
                                  onClick={() => addBlock(block.type)}
                                  className="w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                                >
                                  <div className={`w-10 h-10 ${block.color} rounded-lg flex items-center justify-center mr-3 shadow-sm`}>
                                    <block.icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="text-left">
                                    <p className="font-medium text-gray-900">{block.label}</p>
                                    <p className="text-xs text-gray-600">{block.description}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 min-h-[500px] max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
                    {!currentTopic || (topicContent[currentTopic] || []).length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Layout className="w-10 h-10 text-indigo-500" />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Start Building Your Content</h4>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">Add your first content block to begin creating an engaging learning experience for your students.</p>
                        <button
                          onClick={() => setShowBlockOptions(true)}
                          className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center justify-center mx-auto transition-all duration-200 shadow-lg transform hover:scale-105"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add First Block
                        </button>
                      </div>
                    ) : (
                      // Render existing blocks
                      (topicContent[currentTopic] || []).map(block => (
                        <div key={block.id} onClick={() => !previewMode && setSelectedBlock(block.id)}>
                          {renderBlock(block)}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Certifications Management Section */}
          {activeMenu === 'certifications' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-indigo-600" />
                Manage Certifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upload New Certificate */}
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center justify-center text-center">
                  <Upload className="w-12 h-12 text-blue-500 mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Upload New Certificate Template</h4>
                  <p className="text-gray-600 mb-4">Upload a high-resolution PDF or image file for your course completion certificates.</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center shadow-md">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload File
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, PNG, JPG. Max size: 5MB.</p>
                </div>

                {/* Existing Certificates List (Placeholder) */}
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <HardDrive className="w-5 h-5 mr-2 text-purple-500" />
                    Your Existing Templates
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">Web Dev Master Certificate.pdf</p>
                          <p className="text-sm text-gray-600">Uploaded: 2024-07-15</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600"><Eye className="w-4 h-4" /></button>
                        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600"><Download className="w-4 h-4" /></button>
                        <button className="p-2 rounded-md hover:bg-red-100 text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Image className="w-5 h-5 mr-3 text-orange-600" />
                        <div>
                          <p className="font-medium text-gray-900">Data Science Pro Cert.png</p>
                          <p className="text-sm text-gray-600">Uploaded: 2024-06-20</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600"><Eye className="w-4 h-4" /></button>
                        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600"><Download className="w-4 h-4" /></button>
                        <button className="p-2 rounded-md hover:bg-red-100 text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </li>
                    <li className="text-center text-gray-500 text-sm py-4">
                      No more certificates found.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder sections for other menu items */}
          {activeMenu === 'dashboard' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instructor Dashboard</h3>
              <p className="text-gray-600">Welcome back, John! Here's a quick overview of your courses.</p>
              {/* Add summary stats, recent activity, quick links */}
            </div>
          )}
          {activeMenu === 'my-courses' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">My Courses</h3>
              <p className="text-gray-600">Manage your published and draft courses.</p>
              {/* List of courses with edit/view/analytics options */}
            </div>
          )}
          {activeMenu === 'students' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Management</h3>
              <p className="text-gray-600">View your students and their progress.</p>
              {/* Student list, search, filter */}
            </div>
          )}
          {activeMenu === 'analytics' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Analytics</h3>
              <p className="text-gray-600">Gain insights into course performance and student engagement.</p>
              {/* Charts, graphs */}
            </div>
          )}
          {activeMenu === 'revenue' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Revenue & Payouts</h3>
              <p className="text-gray-600">Track your earnings and manage payouts.</p>
              {/* Financial data */}
            </div>
          )}
          {activeMenu === 'reviews' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Reviews</h3>
              <p className="text-gray-600">Respond to student feedback.</p>
              {/* Review list */}
            </div>
          )}
          {activeMenu === 'settings' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Account Settings</h3>
              <p className="text-gray-600">Manage your profile, notifications, and preferences.</p>
              {/* User settings form */}
            </div>
          )}
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

        /* Custom Scrollbar for better aesthetics */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.5); /* Lighter track */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(129, 140, 248, 0.7); /* Indigo-300 with some transparency */
          border-radius: 10px;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(99, 102, 241, 0.8); /* Darker indigo on hover */
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(129, 140, 248, 0.7) rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}