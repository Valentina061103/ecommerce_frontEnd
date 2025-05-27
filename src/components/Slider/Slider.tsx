import styles from './Slider.module.css';
import hombre from '../../assets/hombrefondo.jpg';
import mujer from '../../assets/mujerfondo.jpg';

const Slider = () => {
  return (
    <div className={styles.container_slider}>
      <div className={styles.container_section}>
        <img src={hombre} alt="imagen ilustrativa para seccion hombre" />
        <button>Hombre</button>
      </div>
      <div className={styles.container_section}>
        <img src={mujer} alt="imagen ilustrativa para seccion mujer" />
        <button>Mujer</button>
      </div>

    </div>
  );
};

export default Slider;
