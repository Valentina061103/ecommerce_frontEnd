import styles from './CarouselCategory.module.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Category {
  label: string;
  img: string;
}

const categories: Category[] = [
  { label: "MODA", img: "src/assets/accesorios.jpg" },
  { label: "RUNNING", img: "src/assets/entrenamiento.jpg" },
  { label: "FUTBOL", img: "src/assets/futbol.png" },
  { label: "JORDAN", img: "src/assets/jordan.jpg" },
  { label: "BASQUET", img: "src/assets/basquet.png" },
];

const CarouselCategory = () => {
  const carouselRef = useRef<HTMLDivElement>(null); //para acceder al contenedor del carrusel
  const navigate = useNavigate();

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

  const handleCategoryClick = (category: string) => {
    navigate(`/catalogo?categoria=${encodeURIComponent(category)}`);
  };

  return (
    <div className={styles.trending}>
      <div className={styles.carouselContainer}>
        <button className={styles.arrow} onClick={scrollLeft}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className={styles.trending_carousel} ref={carouselRef}>
          {[...categories, ...categories].map((cat, i) => (
            <div 
            key={i} 
            className={styles.card}
            onClick={()=>handleCategoryClick(cat.label)}
            >
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

export default CarouselCategory;
