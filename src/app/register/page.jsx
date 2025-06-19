// En el archivo: src/app/register/page.jsx
"use client";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        register(email, password, name);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center' }}>Crear Cuenta</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required style={{ padding: '10px' }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ padding: '10px' }} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required style={{ padding: '10px' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none' }}>Registrarse</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                ¿Ya tienes una cuenta? <Link href="/login" style={{ color: '#0070f3' }}>Inicia Sesión</Link>
            </p>
        </div>
    );
}