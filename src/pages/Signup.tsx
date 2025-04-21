import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dreamJob: "",
    dailyTime: "1",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast: uiToast } = useToast();

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.dreamJob) {
      newErrors.dreamJob = "Dream job is required";
    }
    
    if (!formData.dailyTime) {
      newErrors.dailyTime = "Daily time commitment is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setNetworkError(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2 && validateStep2()) {
      setIsLoading(true);
      setNetworkError(null);
      
      try {
        console.log("Submitting signup form...");
        await signup({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          dreamJob: formData.dreamJob,
          dailyTime: formData.dailyTime,
        });
        
        console.log("Signup successful");
        uiToast({
          title: "Account created!",
          description: "Welcome to CareerLaunch. Let's start your journey!",
        });
        toast.success("Account created! Welcome to CareerLaunch.");
        
        // Small delay before navigation to allow toast to be shown
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } catch (error: any) {
        console.error("Signup form submission error:", error);
        
        // Handle network error specifically
        if (error.message === "Failed to fetch") {
          setNetworkError(
            "Cannot connect to the server. Please make sure the backend server is running on port 5000."
          );
        } else {
          setErrors({
            form: error.message || "Failed to create account. Please try again.",
          });
          toast.error(error.message || "Failed to create account");
        }
        
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="flex items-center text-career-blue hover:text-career-teal transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-career-teal hover:text-career-blue"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        {errors.form && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{errors.form}</p>
              </div>
            </div>
          </div>
        )}
        
        {networkError && (
          <Alert variant="destructive" className="my-4">
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>
              {networkError}
              <p className="mt-2 text-sm">
                Make sure to run the backend server with <code>node server/index.js</code>
              </p>
            </AlertDescription>
          </Alert>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-career-teal focus:border-career-teal focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-career-teal focus:border-career-teal focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-career-teal focus:border-career-teal focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-career-teal focus:border-career-teal focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
              
              <div>
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-career-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-career-teal"
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="dreamJob" className="block text-sm font-medium text-gray-700 mb-1">
                  Dream Job
                </label>
                <Select
                  value={formData.dreamJob}
                  onValueChange={(value) => handleSelectChange("dreamJob", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your dream job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend Developer</SelectItem>
                    <SelectItem value="backend">Backend Developer</SelectItem>
                    <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                    <SelectItem value="data">Data Scientist</SelectItem>
                    <SelectItem value="ui-ux">UI/UX Designer</SelectItem>
                    <SelectItem value="pm">Product Manager</SelectItem>
                    <SelectItem value="swe">Software Engineer</SelectItem>
                    <SelectItem value="sde">SDE (Software Development Engineer)</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.dreamJob && <p className="mt-1 text-sm text-red-600">{errors.dreamJob}</p>}
              </div>
              
              <div>
                <label htmlFor="dailyTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Daily Time Commitment (hours)
                </label>
                <Select
                  value={formData.dailyTime}
                  onValueChange={(value) => handleSelectChange("dailyTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select daily time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="5">5+ hours</SelectItem>
                  </SelectContent>
                </Select>
                {errors.dailyTime && <p className="mt-1 text-sm text-red-600">{errors.dailyTime}</p>}
              </div>
              
              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  variant="outline"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-career-teal"
                >
                  Back
                </Button>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-career-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-career-teal"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
