import { useContext } from "react";
import { AuthContext, type User } from "@/contexts/auth.contex";
import { login, register, logout } from "@/api/auth.api";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, loading, setUser, setLoading } = context;

  const handleLogin = async ({ email, password }: LoginData) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      if (data?.user) {
        setUser(data.user as User);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }: RegisterData) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      if (data?.user) {
        setUser(data.user as User);
      }
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    setUser,
    loading,
    handleLogin,
    handleLogout,
    handleRegister,
  };
};