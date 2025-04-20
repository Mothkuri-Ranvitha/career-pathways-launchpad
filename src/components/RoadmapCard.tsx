
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Roadmap } from "@/data/roadmaps";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface RoadmapCardProps {
  roadmap: Roadmap;
}

const RoadmapCard = ({ roadmap }: RoadmapCardProps) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!user) return;
    
    const fetchProgress = async () => {
      try {
        const { data, error } = await supabase
          .from('roadmap_progress')
          .select('progress')
          .eq('user_id', user.id)
          .eq('roadmap_id', roadmap.id)
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setProgress(data.progress);
        }
      } catch (error) {
        console.error('Error fetching roadmap progress:', error);
      }
    };
    
    fetchProgress();
  }, [user, roadmap.id]);
  
  const completedSteps = Math.floor((progress / 100) * roadmap.steps.length);

  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{roadmap.title}</CardTitle>
          <span className="text-4xl">{roadmap.icon}</span>
        </div>
        <CardDescription>{roadmap.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-2 mb-2" />
        <p className="text-sm text-gray-600">
          {completedSteps} of {roadmap.steps.length} steps completed ({Math.round(progress)}%)
        </p>
      </CardContent>
      <CardFooter>
        <Link to={`/roadmap/${roadmap.id}`} className="w-full">
          <Button variant="default" className="w-full">
            {progress > 0 ? "Continue Learning" : "Start Learning"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RoadmapCard;
