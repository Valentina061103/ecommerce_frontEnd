import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './Product.module.css';
import { Footer } from '../../components/Footer/Footer';
import { useAddToCart } from '../../hooks/useAddToCart';

// Define la interfaz para los datos del producto que se reciben a través de location.state
// Es importante que esta interfaz coincida con lo que pasas desde CardProductCatalog
interface ProductoVista {
  id: number;
  nombre: string;
  marca: string;
  color: string;
  imagen: string;
  tipoProducto: string; // <-- ¡Este campo es crucial y ahora llega correctamente!
}

interface TalleOption {
  talle: string;
}

export const Product = () => {
  const location = useLocation();
  const producto = location.state as ProductoVista;

  const { addToCart, isLoading } = useAddToCart();
  const [selectedTalle, setSelectedTalle] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Log para depuración: verifica el valor de producto y tipoProducto
  console.log("Producto en Product.tsx:", producto);
  console.log("Tipo de Producto en Product.tsx:", producto?.tipoProducto);


  // La lógica del operador ternario ahora debería funcionar correctamente
  // ya que `producto?.tipoProducto` tendrá el valor esperado.
  const talles: TalleOption[] = producto?.tipoProducto === "ZAPATILLA"
    ? [
        { talle: "37" }, { talle: "38" }, { talle: "39" }, { talle: "40" }, { talle: "41" },
        { talle: "42" }, { talle: "43" }, { talle: "44" }, { talle: "45" }, { talle: "46" }, { talle: "47" },
        { talle: "48" }
      ]
    : [
        { talle: "XS" }, { talle: "S" }, { talle: "M" }, { talle: "L" }, { talle: "XL" }, { talle: "XXL" }
      ];

  if (!producto) {
    return <div>No se encontró el producto</div>;
  }

  const handleTalleSelect = (talle: string) => {
    setSelectedTalle(talle);
    setMessage('');
  };

  const handleAddToCart = async () => {
    if (!selectedTalle) {
      setMessage('Por favor selecciona un talle');
      return;
    }

    const detalle = await addToCart(producto.id, selectedTalle);

    if (detalle.success) {
      setMessage('¡Producto agregado al carrito!');
    } else {
      setMessage(detalle.message || '');
    }

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className={styles.container_content}>
      <div className={styles.ProductDetailContainer}>
        <div className={styles.product_imagesSection}>
          <div className={styles.product_imagesSection_imagen}>1</div>
          <div className={styles.product_imagesSection_imagen}>2</div>
          <div className={styles.product_imagesSection_imagen}>3</div>
          <div className={styles.product_imagesSection_imagen}>4</div>
        </div>
        <div className={styles.product_imagenPricipalSection}>
          <img src={producto.imagen} alt={producto.nombre} className={styles.product_imagenPricipalSection_imagen} />
        </div>
        <div className={styles.product_infoSection}>
          <h1>{producto.nombre}</h1>
          <p>{producto.marca} - {producto.color}</p>

          <div className={styles.product_infoSection_talles}>
            <p className={styles.titulo}>Seleccionar un talle</p>
            <div className={styles.container_talles}>
              {talles.map((talle, index) => (
                <div
                  key={index}
                  className={`${styles.talle} ${selectedTalle === talle.talle ? styles.talle_selected : ''}`}
                  onClick={() => handleTalleSelect(talle.talle)}
                >
                  <p>{talle.talle}</p>
                </div>
              ))}
            </div>
          </div>

          {message && (
            <p className={`${styles.message} ${message.includes('Error') ? styles.error : styles.success}`}>
              {message}
            </p>
          )}

          <button
            className={styles.AddToCartButton}
            onClick={handleAddToCart}
            disabled={isLoading || !selectedTalle}
          >
            {isLoading ? 'Agregando...' : 'Agregar al Carrito'}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;