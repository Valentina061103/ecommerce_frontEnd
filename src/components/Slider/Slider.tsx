import styles from './Slider.module.css';
import zapatilla1 from '../../assets/zapatilla1.png';  // Asegúrate de que las rutas de las imágenes sean correctas
import modelo from '../../assets/modelo.png';
import modelo2 from '../../assets/modelo2.png';
import zapatilla2 from '../../assets/zapatilla2.png';
import zapatilla3 from '../../assets/zapatilla3.png';

const Slider = () => {
  return (
    <div className={styles.container_slider}>
      <img src={zapatilla1} alt="Luka 3" />
      <img src={modelo} alt="modelo" />
      <img src={zapatilla3} alt="Luka 3" />
      <img src={modelo2} alt="modelo" />
      <img src={zapatilla2} alt="Luka 3" />
    </div>
  );
};

export default Slider;
