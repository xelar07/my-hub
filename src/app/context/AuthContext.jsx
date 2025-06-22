"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { account, ID } from '../../lib/appwrite';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const login = async (email, password) => {
    try {
      // Verifica si ya hay una sesión activa
      const existingSession = await account.get();
      if (existingSession) {
        setUser(existingSession);
        return { success: true };
      }
    } catch (_) {
      // Si no hay sesión, continúa con login
    }

    try {
      await account.createEmailPasswordSession(email, password);
      const loggedInUser = await account.get();
      setUser(loggedInUser);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const register = async (email, password, name) => {
    try {
      await account.create(ID.unique(), email, password, name);
      return await login(email, password);
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const checkUserStatus = async () => {
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
