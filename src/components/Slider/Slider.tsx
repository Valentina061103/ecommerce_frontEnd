import styles from './Slider.module.css';
import zapatilla1 from '../../assets/zapatilla1.png';  // Asegúrate de que las rutas de las imágenes sean correctas
import modelo from '../../assets/modelo.png';
import zapatilla2 from '../../assets/zapatilla2.png';

const Slider = () => {
  return (
    <div className={styles.slider}>
      <img src={zapatilla1} alt="Luka 3" />
      <img src={modelo} alt="modelo" />
      <img src={zapatilla2} alt="Luka 3" />
    </div>
  );
};

export default Slider;
