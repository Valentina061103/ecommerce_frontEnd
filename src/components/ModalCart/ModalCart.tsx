import styles from "./ModalCart.module.css"
import { CardProductCartModal } from '../CardProductCartModal/CardProductCartModal';
import { useNavigate } from "react-router-dom";

interface Shoe {
    brand: string;
    model: string;
    price: number;
    size: number;
    img: string;
}
const Shoes: Shoe[] = [
    { brand: "Nike",model: "Lather", price: 179999, size:8, img: "src/assets/zapatilla1.png" },
    { brand: "Nike",model: "Low Next", price: 139999, size:8, img: "src/assets/zapatilla2.png" },
];

interface ModalCartProps {
    onClose: () => void;
}

export const ModalCart = ({ onClose }: ModalCartProps) => {

    const navigate = useNavigate();

    const handleGoToCart = () => {
        onClose();       // Cierra el modal
        navigate('/Cart'); // Navega a la página del carrito
    }

    const subtotal = Shoes.reduce((acc, shoe) => acc + shoe.price, 0);

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.container_titulo}>
                    <span className="material-symbols-outlined" onClick={onClose}>arrow_back</span>
                    <h2>Mi compra</h2>
                </div>
                <div className={styles.container_contentCard}>
                    <div className={styles.container_cardsProducts}>
                        {Shoes.map((shoe, index) => (
                            <CardProductCartModal key={index} shoe={shoe} />
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
                            <p onClick={onClose}><span className="material-symbols-outlined">chevron_left</span>
                            Seguir comprando</p>
                            <p onClick={handleGoToCart}>Ver carrito
                            <span className="material-symbols-outlined">chevron_right</span></p>
                        </div>
                    </div>
            </div>
        </div>
    )
}
