// En el archivo: src/app/main/page.jsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext'; // Ajusta la ruta si es necesario
import styles from './main.module.css';
import Image from 'next/image'; // Usaremos el componente de Imagen de Next.js

// --- Componente de la Página Principal ---
export default function MainPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // --- Protección de la Ruta ---
  useEffect(() => {
    // Si no está cargando y no hay usuario, redirige a login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Muestra un loader mientras se verifica el estado del usuario
  if (loading || !user) {
    return <div style={{ backgroundColor: '#0c111b', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>Cargando...</div>;
  }

  // --- Renderizado de la Página ---
  return (
    <div className={styles.mainContainer}>
      {/* --- Barra de Navegación --- */}
      <nav className={styles.header}>
        <div className={styles.navMenu}>
          {/* Aquí podrías poner tu logo */}
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>MiPLATAFORMA</span>
          <a><span>HOME</span></a>
          <a><span>SERIES</span></a>
          <a><span>MOVIES</span></a>
        </div>
        <div className={styles.userProfile}>
          <span className={styles.userName}>{user.name}</span>
          <div className={styles.userAvatar}>{user.name[0].toUpperCase()}</div>
          <button onClick={logout} className={styles.logoutButton}>Logout</button>
        </div>
      </nav>

      <main>
        {/* --- Banner Principal --- */}
        <section className={styles.banner}>
          <Image 
            src="https://placehold.co/1400x600/0c111b/white?text=Película+Destacada" 
            alt="Banner principal" 
            layout="fill"
            objectFit="cover"
          />
        </section>

        {/* --- Bloque de Categorías --- */}
        <section className={styles.categories}>
          <div className={styles.categoryBox}>
            <Image src="https://placehold.co/400x225/393e46/f9f9f9?text=DISNEY" alt="Disney" width={400} height={225} />
          </div>
          <div className={styles.categoryBox}>
            <Image src="https://placehold.co/400x225/00a8e1/f9f9f9?text=PIXAR" alt="Pixar" width={400} height={225} />
          </div>
          <div className={styles.categoryBox}>
            <Image src="https://placehold.co/400x225/ec1d24/f9f9f9?text=MARVEL" alt="Marvel" width={400} height={225} />
          </div>
          <div className={styles.categoryBox}>
            <Image src="https://placehold.co/400x225/feda4a/000000?text=STAR+WARS" alt="Star Wars" width={400} height={225} />
          </div>
          <div className={styles.categoryBox}>
            <Image src="https://placehold.co/400x225/ffd200/000000?text=NAT+GEO" alt="National Geographic" width={400} height={225} />
          </div>
        </section>

        {/* --- Carrusel 1: Recomendado para ti --- */}
        <section className={styles.carousel}>
          <h4>Recomendado para Ti</h4>
          <div className={styles.carouselContent}>
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className={styles.movieThumbnail}>
                <Image src={`https://placehold.co/250x140/1a1d29/7a7c85?text=Película+${index + 1}`} alt={`Película ${index + 1}`} width={250} height={140} />
              </div>
            ))}
          </div>
        </section>

        {/* --- Carrusel 2: Nuevos Lanzamientos --- */}
        <section className={styles.carousel}>
          <h4>Nuevos Lanzamientos</h4>
          <div className={styles.carouselContent}>
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className={styles.movieThumbnail}>
                <Image src={`https://placehold.co/250x140/2c3040/9fa1ac?text=Estreno+${index + 1}`} alt={`Estreno ${index + 1}`} width={250} height={140} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}