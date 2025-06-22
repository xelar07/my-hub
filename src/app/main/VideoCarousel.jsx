"use client";

import { useState, useEffect } from "react";
import styles from './VideoCarousel.module.css'; 
import { useRouter } from "next/navigation";

export default function VideoCarousel({ slides, autoPlayInterval = 10000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // Autoplay para cambiar slide automáticamente
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

  // Cuando se hace clic en la imagen redirige con el id del archivo
  const handleClick = () => {
    if (currentSlide.id) {
      router.push(`/video?id=${currentSlide.id}`);
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <img
        src={currentSlide.image}
        alt={`Slide ${currentIndex + 1}`}
        className={styles.slideImage}
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      />

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

