
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Roadmap } from "@/data/roadmaps";
import { useAuth } from "@/context/AuthContext";

interface RoadmapCardProps {
  roadmap: Roadmap;
}

const RoadmapCard = ({ roadmap }: RoadmapCardProps) => {
  const { user } = useAuth();
  const progress = user?.progress?.[roadmap.id] || 0;
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
        <div className="progress-container mb-4">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }} 
          />
        </div>
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
