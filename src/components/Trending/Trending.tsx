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
];

const Trending = () => {
  return (
    <div className={styles.trending}>
      <h2>En tendencia</h2>
      <div className={styles.grid}>
        {categories.map((cat, i) => (
          <div key={i} className={styles.card}>
            <img src={cat.img} alt={cat.label} />
            <p>{cat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
