// En el archivo: src/app/login/page.jsx
"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext'; // Importamos nuestro "cerebro"
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Usamos la función de login del contexto

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Por favor, introduce tu email y contraseña.");
            return;
        }
        login(email, password);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center' }}>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} // <-- Corregido aquí
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: 'white', cursor: 'pointer' }}>
                    Login
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                ¿No tienes una cuenta? <Link href="/register" style={{ color: '#0070f3' }}>Regístrate</Link>
            </p>
        </div>
    );
}