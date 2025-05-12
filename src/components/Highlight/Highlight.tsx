import styles from './Highlight.module.css';
import { useNavigate } from 'react-router-dom';

const Highlight = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container_highlight}>
      <h2>CLASICOS INFALTABLES</h2>
      <p>Comodidad y estilo único</p>
      <button onClick={()=> navigate('/catalogo')}>Ver colección</button>
    </div>
  );
};

export default Highlight;
