// En el archivo: src/app/dashboard/page.jsx
"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <p>Cargando...</p>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center' }}>Panel de Control</h1>
            <h2>¡Bienvenido, {user.name}!</h2>
            <ul>
                <li><strong>ID de Usuario:</strong> {user.$id}</li>
                <li><strong>Email:</strong> {user.email}</li>
            </ul>
            <button onClick={logout} style={{ width: '100%', padding: '10px', marginTop: '20px', backgroundColor: '#e63946', color: 'white', border: 'none' }}>
                Cerrar Sesión
            </button>
        </div>
    );
}