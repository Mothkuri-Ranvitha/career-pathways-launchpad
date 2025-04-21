
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching from localStorage to check session
  useEffect(() => {
    const localUser = localStorage.getItem(LOCAL_USER_KEY);
    const localProfile = localStorage.getItem(LOCAL_PROFILE_KEY);
    if (localUser && localProfile) {
      setUser(JSON.parse(localUser));
      setProfile(JSON.parse(localProfile));
    }
    setLoading(false);
  }, []);

  const fetchProfileFromBackend = async (email: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(email)}`);
      if (!response.ok) throw new Error("Failed to fetch profile");
      const data = await response.json();
      setProfile(data);
      setUser(data);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(data));
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data));
    } catch (error) {
      setProfile(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error("Invalid email or password");
      }
      const data = await res.json();
      setUser(data);
      setProfile(data);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(data));
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data));
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: {
    fullName: string;
    email: string;
    password: string;
    dreamJob: string;
    dailyTime: string;
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to sign up");
      }
      const data = await res.json();
      setUser(data);
      setProfile(data);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(data));
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(data));
    } finally {
      setLoading(false);
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
      await fetch("/api/progress", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          userId: user.email,
          roadmapId,
          progress,
        }),
      });
      // No local update here; profile/progress re-fetched on reload.
    } catch (error) {}
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

// NOTE: This file is getting long, please consider splitting Auth logic/hooks later!
