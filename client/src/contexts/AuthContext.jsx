import { createContext, useContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants';
import { mockUsers } from '../data/mockData';
import api from '../services/axios';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const savedToken = localStorage.getItem(STORAGE_KEYS.AUTH);
    // const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    // if (savedToken && savedUser) {
    //   setToken(savedToken);
    //   setUser(JSON.parse(savedUser));
    // }
    // setLoading(false);


    const checkAuthStatus = async() => {
      try {
        const {data}= await api.get('/api/me')
        setUser(data)

      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, []);

  const login = async payload => {
    await new Promise(r => setTimeout(r, 600));
    if (!payload.email || !payload.password) {
      throw new Error('Please enter both email and password.');
    }

    try {
      
      const result = await authService.login(payload);
      setUser(result.data)
    } catch (error) {
      throw new Error("plz try again")
    }


  };

  const register = async payload => {
    await new Promise(r => setTimeout(r, 800));

    if (!payload.name || !payload.email || !payload.password) {
      throw new Error('All fields are required.');
    }

    try {
      const result = await authService.register(payload);
    setUser(result.data);

      return result;
    } catch (error) {
    setUser(null);

      throw new Error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  };

  const updateProfile = updates => {
    setUser(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
