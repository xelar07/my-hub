"use client";

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ✅ Importar router
import styles from './login.module.css';
import { FiUser, FiLock } from 'react-icons/fi';
import { storage } from '../../lib/appwrite';

const BUCKET_ID = '685633420033dba64f36';

export default function LoginPage() {
  const router = useRouter(); // ✅ Definir router

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const [backgrounds, setBackgrounds] = useState([]);
  const [currentBackground, setCurrentBackground] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginBoxRef = useRef(null);
  const lastBackgroundIndex = useRef(null);

  // Cargar imágenes desde Appwrite
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fileList = await storage.listFiles(BUCKET_ID);
        const imageUrls = fileList.files.map((file) =>
          storage.getFileView(BUCKET_ID, file.$id)
        );
        setBackgrounds(imageUrls);

        if (imageUrls.length > 0) {
          const randomIndex = Math.floor(Math.random() * imageUrls.length);
          lastBackgroundIndex.current = randomIndex;
          setCurrentBackground(imageUrls[randomIndex]);
        }
      } catch (error) {
        console.error("Error al obtener imágenes:", error);
        alert("No se pudieron cargar las imágenes de fondo.");
      }
    };
    fetchImages();
  }, []);

  // Cambiar imagen cada 5 segundos sin repetir consecutivamente
  useEffect(() => {
    if (backgrounds.length <= 1) return;

    const interval = setInterval(() => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * backgrounds.length);
      } while (randomIndex === lastBackgroundIndex.current);

      lastBackgroundIndex.current = randomIndex;
      setCurrentBackground(backgrounds[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgrounds]);

  // Cerrar login al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginBoxRef.current && !loginBoxRef.current.contains(event.target)) {
        setShowLogin(false);
      }
    };
    if (showLogin) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogin]);

  // Manejar envío de formulario con control de loading y errores
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        router.push('../main'); // ✅ Ya no da error
      } else {
        const message = result.error?.message || "Error desconocido al iniciar sesión";
        alert("Error al iniciar sesión: " + message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Imagen desenfocada que rellena los bordes */}
      {currentBackground && (
        <>
          <img
            src={currentBackground}
            alt="Fondo desenfocado"
            className={styles.backgroundBlur}
          />
          <img
            src={currentBackground}
            alt="Fondo principal"
            className={styles.backgroundImage}
          />
        </>
      )}

      <div className={styles.backgroundOverlay}></div>

      {!showLogin && (
        <button
          className={styles.loginToggleButton}
          onClick={() => setShowLogin(true)}
          aria-label="Mostrar formulario de login"
        >
          Login
        </button>
      )}

      {showLogin && (
        <div
          className={styles.loginBox}
          ref={loginBoxRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
        >
          <h1 id="login-title" className={styles.logo}>My Hub</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className="sr-only">Correo electrónico</label>
              <FiUser className={styles.icon} aria-hidden="true" />
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                autoComplete="username"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <FiLock className={styles.icon} aria-hidden="true" />
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className={styles.loginButton} disabled={loading}>
              {loading ? 'Cargando...' : 'ENTRAR'}
            </button>
          </form>
          <div className={styles.links}>
            <span>¿No tienes una cuenta? </span>
            <Link href="/register">Regístrate</Link>
          </div>
        </div>
      )}
    </div>
  );
}
