'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { databases, Query } from '../../lib/appwrite';
import styles from './video.module.css';

const DATABASE_ID = '6857a42f002c83d73b96';
const COLLECTION_ID = '6857a43c00120bc55a7e';

export default function VideoPage() {
  const searchParams = useSearchParams();
  const fileId = searchParams.get('id');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!fileId) {
        setErrorMsg('No se proporcionó ningún ID.');
        setLoading(false);
        return;
      }

      try {
        const res = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal('id-carrusel', fileId)]
        );

        if (res.total > 0) {
          setData(res.documents[0]);
        } else {
          setErrorMsg(`No se encontró documento con id-carrusel = ${fileId}`);
        }
      } catch (err) {
        setErrorMsg(`Error al obtener datos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fileId]);

  const handlePlayVideo = () => setShowVideo(true);
  const handleCloseVideo = () => setShowVideo(false);

  if (loading) return <p className={styles.loading}>Cargando...</p>;
  if (errorMsg) return <p className={styles.error}>{errorMsg}</p>;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.logo}>Disney+</div>
          <nav className={styles.navItems}>
            <a href="#" className={styles.navItem}>🏠 HOME</a>
            <a href="#" className={styles.navItem}>🔍 SEARCH</a>
            <a href="#" className={styles.navItem}>➕ WATCHLIST</a>
            <a href="#" className={styles.navItem}>⭐ ORIGINALS</a>
            <a href="#" className={styles.navItem}>🎬 MOVIES</a>
            <a href="#" className={styles.navItem}>📺 SERIES</a>
          </nav>
          <div className={styles.userSection}><span>Usuario</span></div>
        </div>
      </header>

      <main className={styles.main}>
        <div
          className={styles.hero}
          style={{
            backgroundImage: showVideo ? 'none' : `linear-gradient(to right, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 70%, transparent), url(${data.portada})`,
          }}
        >
          {showVideo && data.link ? (
            <div className={styles.heroVideoContainer}>
              <button className={styles.closeVideoButton} onClick={handleCloseVideo}>✕</button>
              <iframe
                width="1920"
                height="1080"
                src={data.link}
                frameBorder="0"
                allowFullScreen
                className={styles.heroVideo}
              ></iframe>
            </div>
          ) : (
            <div className={styles.heroContent}>
              <div className={styles.contentLogo}>
                <h1 className={styles.title}>{data['video-name']}</h1>
              </div>

              <div className={styles.metadata}>
                <span className={styles.rating}>13+</span>
                <span className={styles.year}>{data.date}</span>
                <span className={styles.duration}>{data.time}m</span>
                <span className={styles.quality}>4K</span>
                <span className={styles.audio}>CC</span>
              </div>

              <div className={styles.genres}>{data.categories}</div>
              <p className={styles.description}>{data.description}</p>

              <div className={styles.additionalInfo}>
                <p><strong>Estudio:</strong> {data.studio}</p>
                <p><strong>Reparto:</strong> {data['actress-1']}, {data['actress-2']}</p>
              </div>

              <div className={styles.actions}>
                <button className={styles.playButton} onClick={handlePlayVideo}>▶️ PLAY</button>
                <button className={styles.trailerButton}>TRAILER</button>
                <button className={styles.addButton}>➕</button>
                <button className={styles.shareButton}>👥</button>
              </div>
            </div>
          )}
        </div>

        <section className={styles.additionalSections}>
          <div className={styles.container}>
            <div className={styles.tabs}>
              <button className={`${styles.tab} ${styles.active}`}>SUGGESTED</button>
              <button className={styles.tab}>DETAILS</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
