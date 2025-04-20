import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceCard from "@/components/ResourceCard";
import { resources } from "@/data/resources";

const Resources = () => {
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResources, setFilteredResources] = useState(resources);
  const [activeTab, setActiveTab] = useState("recommended");
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    if (activeTab === "recommended" && profile) {
      setFilteredResources(
        resources.filter(resource => 
          resource.tags.includes(profile.dreamJob) || 
          resource.tags.includes("all")
        )
      );
    } else if (activeTab === "all") {
      setFilteredResources(resources);
    } else if (activeTab === "articles") {
      setFilteredResources(resources.filter(resource => resource.type === "article"));
    } else if (activeTab === "videos") {
      setFilteredResources(resources.filter(resource => resource.type === "video"));
    } else if (activeTab === "tutorials") {
      setFilteredResources(resources.filter(resource => resource.type === "tutorial"));
    }
  }, [activeTab, profile]);
  
  useEffect(() => {
    if (searchTerm) {
      let results = resources.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredResources(results);
    } else {
      if (activeTab === "recommended" && profile) {
        setFilteredResources(
          resources.filter(resource => 
            resource.tags.includes(profile.dreamJob) || 
            resource.tags.includes("all")
          )
        );
      } else if (activeTab === "all") {
        setFilteredResources(resources);
      } else if (activeTab === "articles") {
        setFilteredResources(resources.filter(resource => resource.type === "article"));
      } else if (activeTab === "videos") {
        setFilteredResources(resources.filter(resource => resource.type === "video"));
      } else if (activeTab === "tutorials") {
        setFilteredResources(resources.filter(resource => resource.type === "tutorial"));
      }
    }
  }, [searchTerm, activeTab, profile]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Educational Resources</h1>
        
        <div className="mb-6">
          <Input 
            placeholder="Search resources..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <p className="text-gray-600 mb-8">
          Explore curated learning materials to help you in your career journey. We've gathered the best resources from around the web to support your learning.
        </p>
        
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="mb-8 flex flex-wrap">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommended" className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <ResourceCard 
                  key={`recommended-resource-${index}`}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  link={resource.link}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <ResourceCard 
                  key={`all-resource-${index}`}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  link={resource.link}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="articles" className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(resource => resource.type === "article").map((resource, index) => (
                <ResourceCard 
                  key={`articles-resource-${index}`}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  link={resource.link}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(resource => resource.type === "video").map((resource, index) => (
                <ResourceCard 
                  key={`videos-resource-${index}`}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  link={resource.link}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tutorials" className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.filter(resource => resource.type === "tutorial").map((resource, index) => (
                <ResourceCard 
                  key={`tutorials-resource-${index}`}
                  title={resource.title}
                  description={resource.description}
                  type={resource.type}
                  link={resource.link}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Resources;
