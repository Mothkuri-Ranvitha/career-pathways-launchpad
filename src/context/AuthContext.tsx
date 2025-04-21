
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

type Profile = {
  id: string;
  fullName: string;
  email: string;
  dreamJob: string;
  dailyTime: string;
};

type AuthContextType = {
  user: Profile | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: {
    fullName: string;
    email: string;
    password: string;
    dreamJob: string;
    dailyTime: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateProgress: (roadmapId: string, progress: number) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const LOCAL_USER_KEY = "careerlaunch_user";
const LOCAL_PROFILE_KEY = "careerlaunch_profile";

// Define a base URL that will work in both development and preview environments
// The backend server needs to be running on port 5000
const API_BASE_URL = "http://localhost:5000";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on startup
  useEffect(() => {
    try {
      const localUser = localStorage.getItem(LOCAL_USER_KEY);
      const localProfile = localStorage.getItem(LOCAL_PROFILE_KEY);
      if (localUser && localProfile) {
        setUser(JSON.parse(localUser));
        setProfile(JSON.parse(localProfile));
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("Attempting to login with:", email);
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid email or password");
      }
      
      const data = await response.json();
      setUser(data);
      setProfile(data);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(data));
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data));
      
      console.log("Login successful:", data.fullName);
      setLoading(false);
      return data;
    } catch (error: any) {
      console.error("Login error:", error);
      setLoading(false);
      throw new Error(error.message || "Login failed");
    }
  };

  const signup = async (userData: {
    fullName: string;
    email: string;
    password: string;
    dreamJob: string;
    dailyTime: string;
  }): Promise<void> => {
    setLoading(true);
    try {
      console.log("Attempting to create account for:", userData.email);
      
      // For debugging - let's try a simple fetch to the health endpoint first
      try {
        const healthCheck = await fetch(`${API_BASE_URL}/health`);
        console.log("Health check response:", healthCheck.ok, await healthCheck.text());
      } catch (error) {
        console.error("Health check failed:", error);
        throw new Error("Cannot connect to server. Please make sure the backend server is running on port 5000.");
      }
      
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData),
      });
      
      console.log("Signup response status:", response.status);
      
      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message;
        } catch (e) {
          errorMessage = "Failed to create account. Please try again.";
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log("Account created successfully:", data.id);
      
      // Set user and profile data and save to localStorage
      setUser(data);
      setProfile(data);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(data));
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data));
      
      toast.success("Account created successfully!");
      setLoading(false);
    } catch (error: any) {
      console.error("Signup error:", error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    console.log("Logging out...");
    setUser(null);
    setProfile(null);
    localStorage.removeItem(LOCAL_USER_KEY);
    localStorage.removeItem(LOCAL_PROFILE_KEY);
    console.log("Logout complete");
  };

  const updateProgress = async (roadmapId: string, progress: number) => {
    if (!user) return;
    try {
      console.log("Updating progress:", roadmapId, progress);
      const response = await fetch(`${API_BASE_URL}/progress`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          userId: user.id,
          roadmapId,
          progress,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update progress");
      }
      console.log("Progress updated successfully");
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
        updateProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
