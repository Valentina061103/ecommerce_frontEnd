import { Header } from "../components/Header/Header";
import Highlight from "../components/Highlight/Highlight";
import Slider from "../components/Slider/Slider";
import Trending from "../components/Trending/Trending";

const Home = () => {
  return (
    <div>
      <Header />
      <Slider />
      <Highlight />
      <Trending />
    </div>
  );
};

export default Home;
