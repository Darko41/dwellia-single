import { createContext, useEffect, useMemo, useState } from "react";
import {
  loginRequest,
  getCurrentUser,
} from "@/features/auth/api/authApi";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    const initialize = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        setToken(savedToken);

        const currentUser = await getCurrentUser();

        setUser(currentUser);
      } catch (err) {
        console.error("Failed to restore session:", err);

        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
      }

      setLoading(false);
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const data = await loginRequest({
      email,
      password,
    });

    localStorage.setItem("token", data.token);

    setToken(data.token);

    const currentUser = await getCurrentUser();

    setUser(currentUser);

    return currentUser;
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [user, token, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}