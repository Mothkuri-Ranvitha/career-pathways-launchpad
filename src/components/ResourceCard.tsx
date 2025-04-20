
import React from 'react';
import { BookOpen, Video, FileText, Link2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

interface ResourceCardProps {
  title: string;
  description: string;
  type: "video" | "article" | "tutorial" | "course" | "tool";
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
        return <BookOpen className="h-5 w-5 text-green-500" />;
      case "tool":
        return <Link2 className="h-5 w-5 text-purple-500" />;
      default:
        return <Link2 className="h-5 w-5 text-gray-500" />;
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
          View Resource <Link2 className="ml-1 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
