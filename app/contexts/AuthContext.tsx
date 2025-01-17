'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

// Explicitly type the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        setError(error instanceof Error ? error : new Error('Failed to detect auth state'));
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const normalizeError = (err: unknown): Error =>
    err instanceof Error ? err : new Error('An unexpected error occurred.');

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(normalizeError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(normalizeError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await firebaseSignOut(auth);
    } catch (err) {
      setError(normalizeError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(normalizeError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      signIn,
      signUp,
      signOut,
      resetPassword,
      clearError,
    }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthStatus = () => {
  const { user, loading } = useAuth();
  return { isAuthenticated: !!user, loading };
};

export default AuthProvider;
