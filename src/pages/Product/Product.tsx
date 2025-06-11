import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './Product.module.css';
import { useAddToCart } from '../../hooks/useAddToCart';




interface ProductoVista {
  id: number;
  nombre: string;
  marca: string;
  color: string;
  imagen: string;
  tipoProducto: string;
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

  
 console.log("=== DEBUG PRODUCTO ===");
console.log("Producto completo:", JSON.stringify(producto, null, 2));
console.log("tipoProducto:", producto?.tipoProducto);
console.log("Tipo de tipoProducto:", typeof producto?.tipoProducto);
console.log("¿Es string?", typeof producto?.tipoProducto === 'string');
console.log("¿Es ZAPATILLA?", producto?.tipoProducto === "ZAPATILLA");
console.log("=== FIN DEBUG ===");

 
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
    } , 3000);
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

    </div>
);
};


export default Product;