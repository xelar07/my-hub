// En el archivo: src/context/AuthContext.jsx
"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { account, ID } from '@/lib/appwrite';
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
            await account.createEmailPasswordSession(email, password);
            const loggedInUser = await account.get();
            setUser(loggedInUser);
            router.push('/dashboard');
        } catch (error) {
            alert("Error al iniciar sesión. Revisa tu email y contraseña.");
        }
    };

    const register = async (email, password, name) => {
        try {
            await account.create(ID.unique(), email, password, name);
            await login(email, password);
        } catch (error) {
            alert("Error al registrar. El email puede que ya esté en uso.");
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            router.push('/login');
        } catch (error) {
            alert("Error al cerrar sesión.");
        }
    };

    const checkUserStatus = async () => {
        try {
            const loggedInUser = await account.get();
            setUser(loggedInUser);
        } catch (error) {
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