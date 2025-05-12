import Highlight from "../components/Highlight/Highlight";
import Slider from "../components/Slider/Slider";
import Trending from "../components/Trending/Trending";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=> navigate('/Catalogo')} className="bg-black text-white px-6 py-2 rounded-lg"></button>
      <Slider />
      <Highlight />
      <Trending />
    </div>
  );
};

export default Home;
