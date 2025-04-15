
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { roadmaps } from "@/data/roadmaps";
import Navbar from "@/components/Navbar";
import RoadmapCard from "@/components/RoadmapCard";

const Roadmaps = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Career Roadmaps</h1>
        <p className="text-gray-600 mb-8">
          Choose a roadmap to start your learning journey. Each roadmap provides a structured learning path
          with curated resources to help you develop the skills needed for your dream career.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Roadmaps;
