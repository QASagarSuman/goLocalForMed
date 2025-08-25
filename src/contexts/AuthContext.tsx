import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, userType: 'customer' | 'pharmacy') => Promise<void>;
  register: (userData: any, userType: 'customer' | 'pharmacy') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, userType: 'customer' | 'pharmacy') => {
    // Simulate login API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      full_name: userType === 'customer' ? 'John Doe' : 'City Pharmacy',
      phone: '+1234567890',
      user_type: userType,
      created_at: new Date().toISOString(),
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = async (userData: any, userType: 'customer' | 'pharmacy') => {
    // Simulate registration API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      full_name: userData.full_name || userData.pharmacy_name,
      phone: userData.phone,
      user_type: userType,
      created_at: new Date().toISOString(),
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};