// En el archivo: src/app/main/VideoCarousel.jsx
"use client";

import { useState, useEffect, useRef } from "react";
// El único cambio está aquí: importamos el archivo .module.css
import styles from './VideoCarousel.module.css'; 

export default function VideoCarousel({ slides, autoPlayInterval = 10000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setVideoLoaded(false); // Reinicia la carga del video cuando cambia el slide
  }, [currentIndex]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [currentIndex, autoPlayInterval]);

  const handlePrev = () => {
    setCurrentIndex((idx) => (idx === 0 ? slides.length - 1 : idx - 1));
  };

  const handleNext = () => {
    setCurrentIndex((idx) => (idx === slides.length - 1 ? 0 : idx + 1));
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className={styles.carouselContainer}>
      <img
        src={currentSlide.image}
        alt={`Slide ${currentIndex + 1}`}
        // Aplicamos las clases para la transición de opacidad
        className={`${styles.slideImage} ${videoLoaded ? styles.hide : ''}`}
      />

      {currentSlide.video && (
        <video
          ref={videoRef}
          // Aplicamos las clases para la transición de opacidad
          className={`${styles.slideVideo} ${videoLoaded ? styles.show : ''}`}
          src={currentSlide.video}
          muted
          loop
          playsInline
          onLoadedData={() => {
            setVideoLoaded(true);
            videoRef.current?.play();
          }}
          // Ocultar el video si hay un error de carga
          onError={() => setVideoLoaded(false)} 
        />
      )}

      {/* Flechas de navegación */}
      <button className={`${styles.arrow} ${styles.left}`} onClick={handlePrev} aria-label="Anterior">
        &#10094;
      </button>
      <button className={`${styles.arrow} ${styles.right}`} onClick={handleNext} aria-label="Siguiente">
        &#10095;
      </button>
    </div>
  );
}
