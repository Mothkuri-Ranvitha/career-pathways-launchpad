
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

const API_BASE_URL = "http://localhost:5000/api";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on startup
  useEffect(() => {
    const localUser = localStorage.getItem(LOCAL_USER_KEY);
    const localProfile = localStorage.getItem(LOCAL_PROFILE_KEY);
    if (localUser && localProfile) {
      setUser(JSON.parse(localUser));
      setProfile(JSON.parse(localProfile));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
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
      
      setLoading(false);
      return data;
    } catch (error: any) {
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
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message;
        } catch (e) {
          errorMessage = errorText || "Failed to create account";
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      // Set user and profile data and save to localStorage
      setUser(data);
      setProfile(data);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(data));
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data));
      
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem(LOCAL_USER_KEY);
    localStorage.removeItem(LOCAL_PROFILE_KEY);
  };

  const updateProgress = async (roadmapId: string, progress: number) => {
    if (!user) return;
    try {
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
