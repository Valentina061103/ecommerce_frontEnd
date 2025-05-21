import Slider from "../../components/Slider/Slider";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"
import CarouselCategory from "../../components/CarouselCategory/CarouselCategory";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=> navigate('/Catalogo')} className="bg-black text-white px-6 py-2 rounded-lg"></button>
      <Slider />
      
      {/* texto y boton a catalogo */}
      <div className={styles.container_highlight}>
        <h2>CLASICOS INFALTABLES</h2>
        <p>Comodidad y estilo único</p>
        <button onClick={()=> navigate('/catalogo')}>Ver colección</button>
      </div>

      <CarouselCategory />
    </div>
  );
};

export default Home;
