import { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEYS.AUTH);
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async ({ username, password }) => {
    // Mock auth: accept any non-empty credentials, default to admin user.
    await new Promise((r) => setTimeout(r, 600));
    if (!username || !password) {
      throw new Error('Please enter both username and password.');
    }
    const found = mockUsers.find((u) => u.username === username) || mockUsers[0];
    const mockToken = 'mock.jwt.' + btoa(found.id);
    localStorage.setItem(STORAGE_KEYS.AUTH, mockToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(found));
    setToken(mockToken);
    setUser(found);
    return found;
  };

  const register = async ({ name, username, email, password }) => {
    await new Promise((r) => setTimeout(r, 800));
    if (!name || !username || !email || !password) {
      throw new Error('All fields are required.');
    }
    const newUser = {
      id: 'u' + (mockUsers.length + 1),
      name,
      username,
      email,
      role: 'developer',
      status: 'active',
      avatar: `https://i.pravatar.cc/150?u=${username}`,
      joined: new Date().toISOString().slice(0, 10),
    };
    const mockToken = 'mock.jwt.' + btoa(newUser.id);
    localStorage.setItem(STORAGE_KEYS.AUTH, mockToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    setToken(mockToken);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
