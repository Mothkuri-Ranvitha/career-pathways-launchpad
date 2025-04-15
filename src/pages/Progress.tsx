
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { roadmaps } from "@/data/roadmaps";
import Navbar from "@/components/Navbar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight, LineChart, Trophy, Clock } from "lucide-react";

const ProgressPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Get all roadmaps with progress
  const roadmapsWithProgress = roadmaps.map(roadmap => ({
    ...roadmap,
    progress: user.progress?.[roadmap.id] || 0
  }));

  // Sort by progress (highest first)
  roadmapsWithProgress.sort((a, b) => b.progress - a.progress);

  // Calculate overall progress
  const overallProgress = roadmapsWithProgress.length > 0
    ? roadmapsWithProgress.reduce((sum, r) => sum + r.progress, 0) / roadmapsWithProgress.length
    : 0;

  // Calculate active roadmaps (progress > 0)
  const activeRoadmaps = roadmapsWithProgress.filter(r => r.progress > 0);
  
  // Calculate completed roadmaps (progress = 100)
  const completedRoadmaps = roadmapsWithProgress.filter(r => r.progress === 100);

  // Estimate total time spent
  const estimateTimeSpent = () => {
    // Assuming each 1% progress takes approximately 0.5 hours of learning
    const totalProgressPoints = roadmapsWithProgress.reduce((sum, r) => sum + r.progress, 0);
    return Math.round(totalProgressPoints * 0.5);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Your Learning Progress</h1>
        
        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-500 text-sm font-medium">Overall Progress</h2>
              <LineChart className="h-5 w-5 text-career-blue" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{Math.round(overallProgress)}%</p>
            <Progress value={overallProgress} className="h-2 mt-2" />
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-500 text-sm font-medium">Active Roadmaps</h2>
              <LineChart className="h-5 w-5 text-career-teal" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{activeRoadmaps.length}</p>
            <p className="mt-2 text-sm text-gray-500">of {roadmapsWithProgress.length} total</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-500 text-sm font-medium">Completed</h2>
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{completedRoadmaps.length}</p>
            <p className="mt-2 text-sm text-gray-500">roadmaps finished</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-500 text-sm font-medium">Est. Time Spent</h2>
              <Clock className="h-5 w-5 text-purple-500" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">{estimateTimeSpent()}</p>
            <p className="mt-2 text-sm text-gray-500">hours learning</p>
          </div>
        </div>
        
        {/* Detailed Progress Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900">Roadmap Progress</h2>
            <p className="mt-1 text-sm text-gray-500">Track your journey through each career path</p>
          </div>
          <ul className="divide-y divide-gray-200">
            {roadmapsWithProgress.map((roadmap) => (
              <li key={roadmap.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{roadmap.icon}</span>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{roadmap.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 max-w-md">{roadmap.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 text-right">
                      <span className="text-sm font-medium text-gray-900">{roadmap.progress}%</span>
                      <div className="w-24 mt-1">
                        <Progress value={roadmap.progress} className="h-2" />
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/roadmap/${roadmap.id}`)}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;
