import styles from './Slider.module.css';
import hombre from '../../assets/hombrefondo.jpg';
import mujer from '../../assets/mujerfondo.jpg';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
  const navigate = useNavigate();

  // Mapeo de los textos del botón al valor real del enum
  const generoMap: Record<string, string> = {
    Hombre: 'MASCULINO',
    Mujer: 'FEMENINO',
  };
  
  const handleGeneroClick = (visibleLabel: 'Hombre' | 'Mujer') => {
    const generoReal = generoMap[visibleLabel];
    navigate(`/catalogo?genero=${encodeURIComponent(generoReal)}`);
  };

  return (
    <div className={styles.container_slider}>
      <div className={styles.container_section}>
        <img src={hombre} alt="imagen ilustrativa para seccion hombre" />
        <button onClick={() => handleGeneroClick('Hombre')}>Hombre</button>
      </div>
      <div className={styles.container_section}>
        <img src={mujer} alt="imagen ilustrativa para seccion mujer" />
        <button onClick={() => handleGeneroClick('Mujer')}>Mujer</button>
      </div>

    </div>
  );
};

export default Slider;
