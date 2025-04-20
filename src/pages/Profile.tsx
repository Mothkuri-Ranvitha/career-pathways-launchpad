
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import ProgressTracker from "@/components/ProgressTracker";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Clock, Briefcase } from "lucide-react";

const Profile = () => {
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Map dreamJob value to readable string
  const getDreamJobTitle = (jobCode: string) => {
    const jobMap: Record<string, string> = {
      frontend: "Frontend Developer",
      backend: "Backend Developer",
      fullstack: "Full Stack Developer",
      data: "Data Scientist",
      "ui-ux": "UI/UX Designer",
      pm: "Product Manager",
      swe: "Software Engineer",
      sde: "SDE (Software Development Engineer)",
      other: "Other"
    };
    
    return jobMap[jobCode] || "Career Seeker";
  };
  
  // Map dailyTime value to readable string
  const getDailyTimeString = (time: string) => {
    return `${time} ${parseInt(time) === 1 ? 'hour' : 'hours'} per day`;
  };

  if (!user || !profile) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
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
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-career-blue to-career-teal h-32"></div>
          
          <div className="px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:space-x-6">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-career-blue text-white flex items-center justify-center text-3xl font-bold">
                {profile.fullName.charAt(0)}
              </div>
              
              <div className="mt-6 sm:mt-0 sm:flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{profile.fullName}</h1>
                <p className="text-gray-600">{profile.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-career-blue mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p className="text-gray-900">{profile.fullName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-career-blue mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Dream Job</h3>
                        <p className="text-gray-900">{getDreamJobTitle(profile.dreamJob)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-career-blue mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Daily Time Commitment</h3>
                        <p className="text-gray-900">{getDailyTimeString(profile.dailyTime)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="text-gray-900">{profile.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Password</h3>
                      <p className="text-gray-900">••••••••</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-x-4">
                    <Button variant="outline">Change Email</Button>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-1">
                <ProgressTracker />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
