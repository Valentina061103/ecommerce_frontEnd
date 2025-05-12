import { useRef } from 'react';
import styles from './Trending.module.css';

interface Category {
  label: string;
  img: string;
}

const categories: Category[] = [
  { label: "Accesorios", img: "src/assets/accesorios.jpg" },
  { label: "Entrenamiento", img: "src/assets/entrenamiento.jpg" },
  { label: "Futbol", img: "src/assets/futbol.png" },
  { label: "Jordan", img: "src/assets/jordan.jpg" },
  { label: "Basquet", img: "src/assets/basquet.png" },
];

const Trending = () => {
  const carouselRef = useRef<HTMLDivElement>(null); //para acceder al contenedor del carrusel

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ // para desplazar el contenido hacia un lado
        left: -300, //la dispancia que se desplaza
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.trending}>
      <h2>En tendencia</h2>
      <div className={styles.carouselContainer}>
        <button className={styles.arrow} onClick={scrollLeft}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className={styles.trending_carousel} ref={carouselRef}>
          {categories.map((cat, i) => (
            <div key={i} className={styles.card}>
              <img src={cat.img} alt={cat.label} />
              <p>{cat.label}</p>
            </div>
          ))}
        </div>
        <button className={styles.arrow} onClick={scrollRight}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
};

export default Trending;
