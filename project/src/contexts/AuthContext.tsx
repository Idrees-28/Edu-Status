import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

// Temporary backend storage
const USERS_STORAGE_KEY = 'edu_status_users';
const ADMIN_USER = {
  _id: 'admin',
  email: 'admin@edustatus.com',
  password: 'admin123',
  name: 'Admin',
  role: 'admin' as const,
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  rollNo: string;
  department: string;
  year: number;
  semester: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const getStoredUsers = () => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUser = (userData: any) => {
    const users = getStoredUsers();
    users.push(userData);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    // Check admin credentials
    if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
      setUser(ADMIN_USER);
      localStorage.setItem('current_user', JSON.stringify(ADMIN_USER));
      return;
    }

    // Check regular users
    const users = getStoredUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      rollNo: user.rollNo,
      role: 'student' as const,
    };

    setUser(userData);
    localStorage.setItem('current_user', JSON.stringify(userData));
  };

  const signup = async (data: SignupData) => {
    const users = getStoredUsers();
    
    // Check if email already exists
    if (users.some((u: any) => u.email === data.email)) {
      throw new Error('Email already registered');
    }

    // Check if roll number already exists
    if (users.some((u: any) => u.rollNo === data.rollNo)) {
      throw new Error('Roll number already registered');
    }

    // Validate year and semester
    if (data.year !== 3 || data.semester !== 5) {
      throw new Error('Only 3rd year, 5th semester students can register');
    }

    const newUser = {
      _id: `user_${Date.now()}`,
      ...data,
      role: 'student',
    };

    saveUser(newUser);
    
    const userData = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      rollNo: newUser.rollNo,
      role: 'student' as const,
    };

    setUser(userData);
    localStorage.setItem('current_user', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('current_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};