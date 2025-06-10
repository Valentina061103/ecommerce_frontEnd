import styles from "./CardProductCartModal.module.css";
import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../../types/cart";

interface CardProductCartModalProps {
    cartItem: CartItem;
}

export const CardProductCartModal = ({ cartItem }: CardProductCartModalProps) => {
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
        removeItem(cartItem.detalleId);
    };

    const totalPrice = cartItem.detalle.precio * cartItem.cantidad;

    return (
        <div className={styles.container_cardProduct}>
            <div className={styles.cardProduct_content}>
                <img 
                    src={cartItem.detalle.imagenUrl} 
                    alt={cartItem.producto.nombre}
                    onError={(e) => {
                        e.currentTarget.src = '/default-product-image.png'; 
                    }}
                />
                <div className={styles.CardProduct_content_detail}>
                    <div className={styles.cardProduct_detail}>
                        <div className={styles.cardProduct_detail_model}>
                            <p className={styles.product_brand}>
                                {cartItem.detalle.marca}
                            </p>
                            <p className={styles.product_name}>
                                {cartItem.producto.nombre}
                            </p>
                            <p className={styles.product_details}>
                                {cartItem.detalle.color} - Talle {cartItem.detalle.talle}
                            </p>
                        </div>
                        <div className={styles.cardProduct_price}>
                            <p className={styles.price}>
                                ${cartItem.detalle.precio.toLocaleString()}
                            </p>
                            <p className={styles.total_price}>
                                Total: ${totalPrice.toLocaleString()}
                            </p>
                        </div>
                    </div>
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
                </div>
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
    );
};