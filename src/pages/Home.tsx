
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { roadmaps } from "@/data/roadmaps";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import RoadmapCard from "@/components/RoadmapCard";
import ProgressTracker from "@/components/ProgressTracker";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";

const Home = () => {
  const { user, profile, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [roadmapLoading, setRoadmapLoading] = useState(true);
  const [roadmapProgress, setRoadmapProgress] = useState<Record<string, number>>({});
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!user) return;
    
    const fetchProgress = async () => {
      try {
        const { data, error } = await supabase
          .from('roadmap_progress')
          .select('roadmap_id, progress')
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        if (data) {
          const progressMap: Record<string, number> = {};
          data.forEach(item => {
            progressMap[item.roadmap_id] = item.progress;
          });
          setRoadmapProgress(progressMap);
        }
      } catch (error) {
        console.error('Error fetching roadmap progress:', error);
      } finally {
        setRoadmapLoading(false);
      }
    };
    
    fetchProgress();
  }, [user, isAuthenticated, loading, navigate]);
  
  // Get the recommended roadmap based on user's dream job
  const getRecommendedRoadmap = () => {
    if (!profile) return null;
    
    const dreamJobMap: Record<string, string> = {
      frontend: "frontend-dev",
      backend: "backend-dev",
      fullstack: "fullstack-dev",
      data: "data-scientist",
      ui: "ux-designer",
      pm: "product-manager",
      swe: "software-engineer",
      sde: "sde-engineer",
      other: "frontend-dev", // Default to frontend
    };
    
    const roadmapId = dreamJobMap[profile.dreamJob] || "frontend-dev";
    return roadmaps.find(r => r.id === roadmapId) || roadmaps[0];
  };
  
  // Get the most recently worked on roadmap
  const getMostRecentRoadmap = () => {
    if (!roadmapProgress) return null;
    
    const roadmapIds = Object.keys(roadmapProgress);
    if (roadmapIds.length === 0) return null;
    
    // Find the roadmap with the highest progress that's not complete
    const incompleteMaps = roadmapIds.filter(id => roadmapProgress[id] < 100);
    if (incompleteMaps.length === 0) return null;
    
    // Sort by progress (highest first)
    incompleteMaps.sort((a, b) => roadmapProgress[b] - roadmapProgress[a]);
    
    return roadmaps.find(r => r.id === incompleteMaps[0]) || null;
  };

  if (loading || roadmapLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-career-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const recommendedRoadmap = getRecommendedRoadmap();
  const recentRoadmap = getMostRecentRoadmap();
  const suggestedRoadmap = recentRoadmap || recommendedRoadmap;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <section className="mb-10">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 border border-gray-100">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back, {profile?.fullName?.split(' ')[0] || 'User'}!
            </h1>
            <p className="mt-2 text-gray-600">
              "Success is not final, failure is not fatal: It is the courage to continue that counts."
            </p>
            
            {suggestedRoadmap && (
              <div className="mt-6 sm:flex sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {roadmapProgress && roadmapProgress[suggestedRoadmap.id] ? 'Continue where you left off:' : 'Recommended for you:'}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">{suggestedRoadmap.title} Roadmap</p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <Button 
                    onClick={() => navigate(`/roadmap/${suggestedRoadmap.id}`)}
                    className="w-full sm:w-auto flex items-center"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    {roadmapProgress && roadmapProgress[suggestedRoadmap.id] ? 'Continue Learning' : 'Start Learning'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Progress Tracker */}
          <div className="md:col-span-1">
            <ProgressTracker />
          </div>
          
          {/* Roadmaps Grid */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Career Roadmaps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roadmaps.slice(0, 4).map((roadmap) => (
                <RoadmapCard key={roadmap.id} roadmap={roadmap} />
              ))}
            </div>
            {roadmaps.length > 4 && (
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => navigate('/roadmaps')}>
                  View All Roadmaps
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
