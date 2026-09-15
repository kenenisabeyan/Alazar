import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'alazar_admin_token';
const ADMIN_KEY = 'alazar_admin_user';

export function AuthProvider({ children }) {
  const [token, setToken]       = useState(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin]       = useState(() => {
    try { return JSON.parse(localStorage.getItem(ADMIN_KEY)); } catch { return null; }
  });
  const [isChecking, setIsChecking] = useState(false);

  const isLoggedIn = !!token && !!admin;

  const login = useCallback((newToken, adminData) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(adminData));
    setToken(newToken);
    setAdmin(adminData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    setToken(null);
    setAdmin(null);
  }, []);

  // Validate existing token on mount
  useEffect(() => {
    if (!token) return;
    setIsChecking(true);
    fetch(`${import.meta.env.VITE_API_URL || '/api'}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        if (!data.success) logout();
        else setAdmin(data.admin);
      })
      .catch(() => logout())
      .finally(() => setIsChecking(false));
  }, []);  // eslint-disable-line

  return (
    <AuthContext.Provider value={{ isLoggedIn, admin, token, login, logout, isChecking }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
