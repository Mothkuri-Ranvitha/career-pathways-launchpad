
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { roadmaps, RoadmapStep } from "@/data/roadmaps";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { CheckCircle, BookOpen, Video, FileText, Bookmark, ArrowLeft, ExternalLink } from "lucide-react";

const RoadmapDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProgress } = useAuth();
  const [currentRoadmap, setCurrentRoadmap] = useState(roadmaps.find(r => r.id === id));
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!id || !currentRoadmap) {
      navigate('/roadmaps');
      return;
    }
    
    // Initialize completed steps from user progress
    if (user && user.progress && user.progress[id]) {
      const userProgress = user.progress[id];
      setProgress(userProgress);
      
      // Calculate which steps should be marked as completed based on progress percentage
      const totalSteps = currentRoadmap.steps.length;
      const completedCount = Math.floor((userProgress / 100) * totalSteps);
      
      const newCompletedSteps: Record<string, boolean> = {};
      
      // First initialize all steps as not completed
      currentRoadmap.steps.forEach(step => {
        newCompletedSteps[step.id] = false;
      });
      
      // Then mark steps as completed based on progress
      currentRoadmap.steps.slice(0, completedCount).forEach(step => {
        newCompletedSteps[step.id] = true;
      });
      
      setCompletedSteps(newCompletedSteps);
    } else {
      // Initialize all steps as not completed if no progress exists
      const newCompletedSteps: Record<string, boolean> = {};
      currentRoadmap?.steps.forEach(step => {
        newCompletedSteps[step.id] = false;
      });
      setCompletedSteps(newCompletedSteps);
    }
  }, [id, currentRoadmap, isAuthenticated, navigate, user]);

  const handleStepToggle = (stepId: string, checked: boolean) => {
    const newCompletedSteps = {
      ...completedSteps,
      [stepId]: checked
    };
    
    setCompletedSteps(newCompletedSteps);
    
    // Calculate new progress
    if (!currentRoadmap) return;
    
    const totalSteps = currentRoadmap.steps.length;
    const completedCount = Object.values(newCompletedSteps).filter(Boolean).length;
    const newProgress = Math.round((completedCount / totalSteps) * 100);
    
    setProgress(newProgress);
    
    // Update progress in user context
    if (id) {
      updateProgress(id, newProgress);
      toast.success(`Progress updated: ${newProgress}%`);
    }
  };

  if (!currentRoadmap) {
    return <div>Roadmap not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/home" className="inline-flex items-center text-career-blue hover:text-career-teal transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
                <span className="mr-2 text-4xl">{currentRoadmap.icon}</span>
                {currentRoadmap.title} Roadmap
              </h1>
              <p className="mt-2 text-gray-600">{currentRoadmap.description}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between mb-1 text-sm">
              <span>Your Progress:</span>
              <span>{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
        
        <div className="space-y-6">
          {currentRoadmap.steps.map((step, index) => (
            <StepCard 
              key={step.id}
              step={step}
              index={index}
              isCompleted={!!completedSteps[step.id]}
              onToggleComplete={(checked) => handleStepToggle(step.id, checked)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

interface StepCardProps {
  step: RoadmapStep;
  index: number;
  isCompleted: boolean;
  onToggleComplete: (checked: boolean) => void;
}

const StepCard = ({ step, index, isCompleted, onToggleComplete }: StepCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-0.5">
          {isCompleted ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-400 text-xs font-medium text-gray-600">
              {index + 1}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <div className="flex items-center">
              <Checkbox 
                id={`complete-${step.id}`}
                checked={isCompleted}
                onCheckedChange={onToggleComplete}
                className="h-5 w-5 border-2"
              />
              <label 
                htmlFor={`complete-${step.id}`} 
                className="ml-2 text-sm text-gray-600 cursor-pointer"
              >
                {isCompleted ? "Completed" : "Mark as complete"}
              </label>
            </div>
          </div>
          
          <p className="mt-1 text-gray-600">{step.description}</p>
          
          <Tabs defaultValue="resources" className="mt-4">
            <TabsList>
              <TabsTrigger value="resources" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Learning Resources
              </TabsTrigger>
            </TabsList>
            <TabsContent value="resources" className="mt-2">
              <div className="space-y-2">
                {step.resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {resource.type === 'video' ? (
                      <Video className="h-4 w-4 mr-2 text-red-500" />
                    ) : resource.type === 'article' ? (
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    ) : (
                      <Bookmark className="h-4 w-4 mr-2 text-purple-500" />
                    )}
                    <span className="flex-1">{resource.name}</span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetail;
