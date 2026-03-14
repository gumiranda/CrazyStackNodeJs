import { useState, useCallback, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AuthContext } from "./AuthContext";
import { authApi } from "../api/endpoints";
import { setAccessToken } from "../api/client";
import type { User } from "../api/types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.role === "admin") {
          setUser(parsed);
        }
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await authApi.login({
        email,
        password,
        passwordConfirmation: password,
      });
      if (data.user.role !== "admin") {
        throw new Error("Acesso restrito a administradores");
      }
      setAccessToken(data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/");
    },
    [navigate],
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logout realizado");
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
