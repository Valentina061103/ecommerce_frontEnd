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
    
    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span className="material-symbols-outlined" onClick={onClose}>arrow_back</span>
                <h2>Mi compra</h2>
                <div className={styles.container_contentCard}>
                    <div className={styles.container_cardsProducts}>
                        {Shoes.map((shoe, index) => (
                            <CardProductCartModal key={index} shoe={shoe} />
                        ))}
                    </div>
                    <div className={styles.container_price}>
                    </div>
                    <button onClick={onClose}>Seguir comprando</button>
                    <button onClick={handleGoToCart}>Ver carrito</button>
                </div>
            </div>
        </div>
    )
}
