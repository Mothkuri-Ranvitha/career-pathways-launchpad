
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  fullName: string;
  email: string;
  dreamJob: string;
  dailyTime: string;
  progress: {
    [key: string]: number;
  };
};

type AuthContextType = {
  user: User | null;
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
  logout: () => void;
  updateProgress: (roadmapId: string, progress: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on initial load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app, this would connect to a backend
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just check if user exists in localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const matchedUser = storedUsers.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (!matchedUser) {
        throw new Error("Invalid credentials");
      }
      
      // Remove password before setting user
      const { password: _, ...userWithoutPassword } = matchedUser;
      
      // Ensure progress object exists
      const userWithProgress = {
        ...userWithoutPassword,
        progress: userWithoutPassword.progress || {}
      };
      
      // Save to state and localStorage
      setUser(userWithProgress);
      localStorage.setItem("user", JSON.stringify(userWithProgress));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock signup function
  const signup = async (userData: {
    fullName: string;
    email: string;
    password: string;
    dreamJob: string;
    dailyTime: string;
  }) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing users
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if email already exists
      if (storedUsers.some((u: any) => u.email === userData.email)) {
        throw new Error("Email already in use");
      }
      
      // Create new user with ID and empty progress
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        progress: {}
      };
      
      // Save to users array
      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      
      // Remove password before setting user
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Set as current user
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProgress = (roadmapId: string, progress: number) => {
    if (!user) return;
    
    console.log("Updating progress in AuthContext:", roadmapId, progress);
    
    // Create updated user object
    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        [roadmapId]: progress
      }
    };
    
    // Update state and localStorage
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    // Update in users array too
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = storedUsers.map((u: any) => 
      u.id === user.id ? { ...u, progress: updatedUser.progress } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    console.log("Progress updated. New user state:", updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
        updateProgress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
