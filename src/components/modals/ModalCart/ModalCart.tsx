import styles from "./ModalCart.module.css"
import { CardProductCartModal } from '../../CardProductCartModal/CardProductCartModal';
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../../store/cartStore";

interface ModalCartProps {
    onClose: () => void;
}

export const ModalCart = ({ onClose }: ModalCartProps) => {
    const navigate = useNavigate();
    const { items, getTotalPrice } = useCartStore();

    const handleGoToCart = () => {
        onClose();         
        navigate('/Cart'); 
    }

    const subtotal = getTotalPrice();

    
    if (items.length === 0) {
        return (
            <div className={styles.modal} onClick={onClose}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.container_titulo}>
                        <span className="material-symbols-outlined" onClick={onClose}>arrow_back</span>
                        <h2>Mi compra</h2>
                    </div>
                    <div className={styles.empty_cart}>
                        <p>Tu carrito está vacío</p>
                        <button onClick={onClose} className={styles.continue_shopping}>
                            Seguir comprando
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.container_titulo}>
                    <span className="material-symbols-outlined" onClick={onClose}>arrow_back</span>
                    <h2>Mi compra ({items.length} producto{items.length !== 1 ? 's' : ''})</h2>
                </div>
                <div className={styles.container_contentCard}>
                    <div className={styles.container_cardsProducts}>
                        {items.map((item) => (
                            <CardProductCartModal 
                                key={item.detalleId} 
                                cartItem={item} 
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.container_actions}>
                    <div className={styles.container_price}>
                        <p>Total</p>
                        <p>${subtotal.toLocaleString()}</p>
                    </div>
                    <button className={styles.container_button_black}>Finalizar compra</button>
                    <div className={styles.container_buttons}>
                        <p onClick={onClose}>
                            <span className="material-symbols-outlined">chevron_left</span>
                            Seguir comprando
                        </p>
                        <p onClick={handleGoToCart}>
                            Ver carrito
                            <span className="material-symbols-outlined">chevron_right</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}