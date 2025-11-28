import React, { createContext, useState, useEffect, useContext, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ UseCallback prevents re-creation of function on every render
  const verifyUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        method: "GET",
        credentials: "include", // 🚨 Send cookies with request
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      console.log("data",data)
      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("🔴 Verification error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Run verification on mount
  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  // 🚪 Logout handler
  const logout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        console.warn("Logout failed:", res.status);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  // 🧠 Optional: Manual refresh (useful after login or OAuth redirect)
  const refreshUser = async () => {
    await verifyUser();
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🪄 Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
