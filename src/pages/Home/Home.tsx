import Slider from "../../components/Slider/Slider";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"
import CarouselCategory from "../../components/CarouselCategory/CarouselCategory";
import fondo from '../../assets/imagenfondo.jpg';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* <Slider /> */}
      <div className={styles.container_imagen}>
        <img src={fondo} alt="" />
      </div>

      {/* texto y boton a catalogo */}
      <div className={styles.container_highlight}>
        <h2>CLASICOS INFALTABLES</h2>
        <p>Comodidad y estilo único</p>
        <button onClick={()=> navigate('/catalogo')}>Ver colección</button>
      </div>

      <CarouselCategory />

      <h3>Aca va un carrosusel de productos</h3>
    </div>
  );
};

export default Home;
