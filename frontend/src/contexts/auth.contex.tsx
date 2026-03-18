import { createContext, useState, useEffect, type Dispatch, type SetStateAction, type ReactNode } from "react";
import { getCurrentUser } from "@/api/auth.api";

export interface User {
  _id?: string;
  id?: string;
  username?: string;
  email?: string;
  tokens?: number;
  unlimitedExpiresAt?: Date | string | null;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const data = await getCurrentUser();
        if (data?.user) {
          setUser(data.user as User);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};