import styles from "./CardProductCartPage.module.css";
import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../../types/cart";

interface CardProductCartProps {
  cartItem: CartItem;
}

export const CardProductCart = ({ cartItem }: CardProductCartProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrement = () => {
    if (cartItem.cantidad < cartItem.detalle.stock) {
      updateQuantity(cartItem.detalleId, cartItem.cantidad + 1);
    }
  };

  const handleDecrement = () => {
    if (cartItem.cantidad > 1) {
      updateQuantity(cartItem.detalleId, cartItem.cantidad - 1);
    } else {
      removeItem(cartItem.detalleId);
    }
  };

  const handleRemove = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      removeItem(cartItem.detalleId);
    }
  };

  const totalPrice = cartItem.detalle.precio * cartItem.cantidad;

  return (
    <div className={styles.container_cardProduct}>
      <div className={styles.cardProduct_content}>
        <div className={styles.CardProduct_content_detail}>
          <img 
            src={cartItem.detalle.imagenUrl} 
            alt={cartItem.producto.nombre}
            onError={(e) => {
              e.currentTarget.src = '/default-product-image.png'; 
            }}
          />
          <div className={styles.cardProduct_detail}>
            <div className={styles.cardProduct_detail_model}>
              <p className={styles.product_name}>
                {cartItem.producto.nombre}
              </p>
              <p className={styles.product_details}>
                {cartItem.detalle.marca} - {cartItem.detalle.color}
              </p>
              <p className={styles.product_size}>
                Talle: {cartItem.detalle.talle}
              </p>
              <p className={styles.product_type}>
                {cartItem.producto.tipoProducto}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className={styles.unit_price}>
            ${cartItem.detalle.precio.toLocaleString()} 
          </p>
        </div>
        <div className={styles.cardProduct_price}>
              <div className={styles.cardProduct_detail_counter}>
                <button 
                  onClick={handleDecrement}
                  className={styles.counter_button}
                  disabled={cartItem.cantidad <= 1}
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <p className={styles.quantity}>{cartItem.cantidad}</p>
                <button 
                  onClick={handleIncrement}
                  className={styles.counter_button}
                  disabled={cartItem.cantidad >= cartItem.detalle.stock}
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
          {/* <div className={styles.stock_info}>
            <p className={styles.stock_text}>
              Stock: {cartItem.detalle.stock}
            </p>
          </div> */}
        </div>
        <div className={styles.price_section}>
          <p className={styles.total_price}><strong>
            ${totalPrice.toLocaleString()}</strong>
          </p>
        </div>
        <div className={styles.cardProduct_buttonDelete}>
          <button 
            onClick={handleRemove}
            className={styles.delete_button}
            title="Eliminar producto"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};