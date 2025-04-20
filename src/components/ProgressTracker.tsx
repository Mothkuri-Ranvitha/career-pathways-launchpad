
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { roadmaps } from "@/data/roadmaps";
import { supabase } from "@/integrations/supabase/client";

const ProgressTracker = () => {
  const { user } = useAuth();
  const [overallProgress, setOverallProgress] = useState(0);
  const [roadmapProgress, setRoadmapProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) return;
    
    const fetchProgress = async () => {
      try {
        const { data, error } = await supabase
          .from('roadmap_progress')
          .select('roadmap_id, progress')
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const progressMap: Record<string, number> = {};
          let totalProgress = 0;
          
          data.forEach(item => {
            progressMap[item.roadmap_id] = item.progress;
            totalProgress += item.progress;
          });
          
          setRoadmapProgress(progressMap);
          setOverallProgress(totalProgress / data.length);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };
    
    fetchProgress();
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
            const progress = roadmapProgress[roadmap.id] || 0;
            
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
