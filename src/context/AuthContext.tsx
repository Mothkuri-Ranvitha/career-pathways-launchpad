
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";

type Profile = {
  id: string;
  fullName: string;
  email: string;
  dreamJob: string;
  dailyTime: string;
};

type AuthContextType = {
  user: User | null;
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      if (data) {
        setProfile({
          id: data.id,
          fullName: data.full_name,
          email: data.email,
          dreamJob: data.dream_job,
          dailyTime: data.daily_time,
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to fetch user profile");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (userData: {
    fullName: string;
    email: string;
    password: string;
    dreamJob: string;
    dailyTime: string;
  }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.fullName,
            dream_job: userData.dreamJob,
            daily_time: userData.dailyTime,
          },
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const updateProgress = async (roadmapId: string, progress: number) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from("roadmap_progress")
        .upsert({
          user_id: user.id,
          roadmap_id: roadmapId,
          progress: progress,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error updating progress:", error);
      toast.error("Failed to update progress");
      throw error;
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
