"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import styles from "./main.module.css";
import Image from "next/image";
import VideoCarousel from "./VideoCarousel";
import { storage } from '../../lib/appwrite';

export default function MainPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [slides, setSlides] = useState([]);

  const bucketId = "6857514b003101d6afe4"; // <- Verifica que este ID sea correcto

  useEffect(() => {
    if (!loading && !user) {
      console.log("Usuario no autenticado, redirigiendo a /login");
      router.push("/login");
    } else {
      console.log("Usuario autenticado:", user);
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchSlides = async () => {
      console.log("Intentando obtener archivos del bucket:", bucketId);

      try {
        const response = await storage.listFiles(bucketId);
        console.log("Respuesta de Appwrite:", response);

        if (!response || !response.files || response.files.length === 0) {
          console.warn("No se encontraron archivos en el bucket");
        }

        const newSlides = response.files.map((file) => {
          const url = storage.getFilePreview(bucketId, file.$id).toString();
          console.log("Archivo encontrado:", file.name, "| URL:", url);
          return {
            id: file.$id,    // <-- Aquí guardas el id real del archivo
            image: url,
            video: null,
          };
        });

        setSlides(newSlides);
      } catch (error) {
        console.error("Error al obtener imágenes del bucket:", error);
      }
    };

    fetchSlides();
  }, []);

  if (loading || !user) {
    return (
      <div
        style={{
          backgroundColor: "#0c111b",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        Cargando...
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      {/* --- Barra de Navegación --- */}
      <nav className={styles.header}>
        <div className={styles.navMenu}>
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>MY HUB</span>
          <a><span>INICIO</span></a>
          <a><span>SERIES</span></a>
          <a><span>PELÍCULAS</span></a>
        </div>
        <div className={styles.userProfile}>
          <span className={styles.userName}>{user.name}</span>
          <div className={styles.userAvatar}>{user.name[0].toUpperCase()}</div>
          <button onClick={logout} className={styles.logoutButton}>Logout</button>
        </div>
      </nav>

      <main>
        {/* --- Carrusel de Video/Imagen --- */}
        <section className={styles.banner}>
          {slides.length > 0 ? (
            <VideoCarousel slides={slides} />
          ) : (
            <p style={{ color: "white", textAlign: "center" }}>
              No hay imágenes disponibles en el bucket.
            </p>
          )}
        </section>

        {/* --- Categorías --- */}
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

        {/* --- Carruseles adicionales --- */}
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
