
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Code, FileText, Video, Link as LinkIcon } from "lucide-react";
import { roadmaps } from "@/data/roadmaps";

const Resources = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [dreamJobResources, setDreamJobResources] = useState<{
    title: string;
    description: string;
    type: "video" | "article" | "course" | "tool";
    link: string;
  }[]>([]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user?.dreamJob) {
      // Find the roadmap that matches the user's dream job
      const dreamJobRoadmap = roadmaps.find(roadmap => 
        roadmap.title.toLowerCase() === user.dreamJob.toLowerCase()
      );
      
      // If no exact match, look for partial matches
      const partialMatchRoadmap = !dreamJobRoadmap ? 
        roadmaps.find(roadmap => 
          roadmap.title.toLowerCase().includes(user.dreamJob.toLowerCase()) ||
          user.dreamJob.toLowerCase().includes(roadmap.title.toLowerCase())
        ) : null;
      
      const selectedRoadmap = dreamJobRoadmap || partialMatchRoadmap;
      
      if (selectedRoadmap) {
        // Extract resources from the roadmap
        const resources = selectedRoadmap.steps.flatMap(step => 
          step.resources.map(resource => ({
            title: resource.name,
            description: step.title + ": " + step.description,
            type: resource.type as "video" | "article" | "course" | "tool",
            link: resource.url
          }))
        );
        
        setDreamJobResources(resources);
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Educational Resources</h1>
        
        {user?.dreamJob && (
          <div className="mb-6">
            
            {dreamJobResources.length === 0 && (
              <p className="text-amber-600">
                
              </p>
            )}
          </div>
        )}
        
        <p className="text-gray-600 mb-8">
          Explore curated learning materials to help you in your career journey. We've gathered the best resources from around the web to support your learning.
        </p>
        
        <Tabs defaultValue={dreamJobResources.length > 0 ? "dream-job" : "all"} className="w-full">
          <TabsList className="mb-8 flex flex-wrap">
            {dreamJobResources.length > 0 && (
              <TabsTrigger value="dream-job">My Dream Job</TabsTrigger>
            )}
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>
          
          {dreamJobResources.length > 0 && (
            <TabsContent value="dream-job" className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dreamJobResources.map((resource, index) => (
                  <ResourceCard 
                    key={`dream-job-resource-${index}`}
                    title={resource.title}
                    description={resource.description}
                    type={resource.type}
                    link={resource.link}
                  />
                ))}
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="all" className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard 
                title="JavaScript Fundamentals"
                description="Learn the core concepts of JavaScript programming"
                type="video"
                link="https://www.youtube.com/watch?v=PkZNo7MFNFg"
              />
              <ResourceCard 
                title="Web Development in 2023"
                description="A complete roadmap for modern web development"
                type="article"
                link="https://www.freecodecamp.org/news/web-development-2023/"
              />
              <ResourceCard 
                title="React Complete Course"
                description="Master React.js from basics to advanced concepts"
                type="course"
                link="https://www.freecodecamp.org/learn/front-end-development-libraries/"
              />
              <ResourceCard 
                title="CSS Tricks"
                description="Advanced CSS techniques and best practices"
                type="article"
                link="https://css-tricks.com/"
              />
              <ResourceCard 
                title="Git & GitHub for Beginners"
                description="Learn version control with Git and GitHub"
                type="video"
                link="https://www.youtube.com/watch?v=RGOj5yH7evk"
              />
              <ResourceCard 
                title="VS Code Productivity Tips"
                description="Boost your coding efficiency with these VS Code tricks"
                type="tool"
                link="https://code.visualstudio.com/docs/editor/codebasics"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard 
                title="JavaScript Fundamentals"
                description="Learn the core concepts of JavaScript programming"
                type="video"
                link="https://www.youtube.com/watch?v=PkZNo7MFNFg"
              />
              <ResourceCard 
                title="Git & GitHub for Beginners"
                description="Learn version control with Git and GitHub"
                type="video"
                link="https://www.youtube.com/watch?v=RGOj5yH7evk"
              />
              <ResourceCard 
                title="React for Beginners"
                description="Learn the basics of React.js with practical examples"
                type="video"
                link="https://www.youtube.com/watch?v=bMknfKXIFA8"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="articles" className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard 
                title="Web Development in 2023"
                description="A complete roadmap for modern web development"
                type="article"
                link="https://www.freecodecamp.org/news/web-development-2023/"
              />
              <ResourceCard 
                title="CSS Tricks"
                description="Advanced CSS techniques and best practices"
                type="article"
                link="https://css-tricks.com/"
              />
              <ResourceCard 
                title="JavaScript Design Patterns"
                description="Understanding common design patterns in JavaScript"
                type="article"
                link="https://www.patterns.dev/posts"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard 
                title="React Complete Course"
                description="Master React.js from basics to advanced concepts"
                type="course"
                link="https://www.freecodecamp.org/learn/front-end-development-libraries/"
              />
              <ResourceCard 
                title="Full Stack Web Development"
                description="Learn to build complete web applications from scratch"
                type="course"
                link="https://www.freecodecamp.org/learn/"
              />
              <ResourceCard 
                title="Data Structures & Algorithms"
                description="Master the fundamentals of DSA for technical interviews"
                type="course"
                link="https://www.coursera.org/learn/algorithms-part1"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard 
                title="VS Code Productivity Tips"
                description="Boost your coding efficiency with these VS Code tricks"
                type="tool"
                link="https://code.visualstudio.com/docs/editor/codebasics"
              />
              <ResourceCard 
                title="GitHub Copilot"
                description="AI-powered code completion and assistance"
                type="tool"
                link="https://github.com/features/copilot"
              />
              <ResourceCard 
                title="CodePen"
                description="Social development environment for front-end designers and developers"
                type="tool"
                link="https://codepen.io/"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

interface ResourceCardProps {
  title: string;
  description: string;
  type: "video" | "article" | "course" | "tool";
  link: string;
}

const ResourceCard = ({ title, description, type, link }: ResourceCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-red-500" />;
      case "article":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "course":
        return <Book className="h-5 w-5 text-green-500" />;
      case "tool":
        return <Code className="h-5 w-5 text-purple-500" />;
      default:
        return <LinkIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="bg-gray-50 border-b pb-3">
        <div className="flex items-center">
          {getIcon()}
          <CardTitle className="ml-2 text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <CardDescription className="text-gray-600 mb-4">{description}</CardDescription>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-career-blue hover:text-career-teal inline-flex items-center transition-colors"
        >
          View Resource <LinkIcon className="ml-1 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
};

export default Resources;
