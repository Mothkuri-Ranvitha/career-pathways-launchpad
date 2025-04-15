
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { roadmaps } from "@/data/roadmaps";

const ProgressTracker = () => {
  const { user } = useAuth();
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (user && user.progress) {
      // Calculate overall progress by averaging all roadmap progresses
      const roadmapIds = Object.keys(user.progress);
      if (roadmapIds.length === 0) {
        setOverallProgress(0);
        return;
      }
      
      const totalProgress = roadmapIds.reduce((acc, roadmapId) => {
        return acc + user.progress[roadmapId];
      }, 0);
      
      setOverallProgress(totalProgress / roadmapIds.length);
    } else {
      setOverallProgress(0);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 w-full">
      <h3 className="text-lg font-semibold mb-4">Your Learning Progress</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-gray-500">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
        
        <div className="pt-4 space-y-2">
          <h4 className="text-sm font-medium mb-2">Roadmaps Progress</h4>
          
          {roadmaps.map(roadmap => {
            const progress = user.progress[roadmap.id] || 0;
            
            return (
              <div key={roadmap.id} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs">{roadmap.title}</span>
                  <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
