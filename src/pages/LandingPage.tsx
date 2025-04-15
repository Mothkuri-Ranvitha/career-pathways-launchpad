
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Code, BarChart, Users } from 'lucide-react';

const LandingPage = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative flex items-center justify-center h-screen bg-gradient-to-r from-indigo-700 via-blue-800 to-career-blue overflow-hidden"
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight animate-slide-up">
            Launch Your Dream <span className="text-career-coral">Career</span> Today
          </h1>
          <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
            "The future belongs to those who believe in the beauty of their dreams."
            <span className="block mt-2 italic">— Eleanor Roosevelt</span>
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.3s'}}>
            <Link to="/signup">
              <Button size="lg" className="bg-career-coral hover:bg-orange-500 text-white px-8 py-3 text-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                Log In
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-white hover:bg-white/10 px-8 py-3 text-lg"
              onClick={() => setShowMore(!showMore)}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-24 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-500 ease-in-out ${showMore ? 'opacity-100' : 'opacity-0 h-0 py-0 overflow-hidden'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Accelerate Your Career Journey
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Everything you need to navigate your path to success.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="h-12 w-12 bg-career-blue rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Structured Roadmaps</h3>
              <p className="mt-2 text-gray-600">Clear step-by-step learning paths for various tech careers.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="h-12 w-12 bg-career-teal rounded-full flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Curated Resources</h3>
              <p className="mt-2 text-gray-600">Hand-picked tutorials, courses, and articles for each learning stage.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="h-12 w-12 bg-career-coral rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Progress Tracking</h3>
              <p className="mt-2 text-gray-600">Monitor your learning journey with visual progress indicators.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Personalized Path</h3>
              <p className="mt-2 text-gray-600">Customize your learning based on your career goals and available time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
