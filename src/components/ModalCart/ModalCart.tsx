import styles from "./ModalCart.module.css"
import { CardProductCartModal } from '../CardProductCartModal/CardProductCartModal';

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

export const ModalCart = () => {
    const subtotal = Shoes.reduce((acc, shoe) => acc + shoe.price, 0);
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Mi compra</h2>
                <div className={styles.container_contentCard}>
                    <div className={styles.container_cardsProducts}>
                        {Shoes.map((shoe, index) => (
                            <CardProductCartModal key={index} shoe={shoe} />
                        ))}
                    </div>
                    <div className={styles.container_price}>
                        <div className={styles.container_detailPrice}>
                            <div className={styles.detailPrice_description}>
                                <div className={styles.detailPrice_text}>
                                    <p>Subtotal: </p>
                                    <p>${subtotal.toLocaleString()}</p>
                                </div>
                                <div className={styles.detailPrice_text}>
                                    <p>Envio: </p>
                                    <p>Free</p>
                                </div>
                                <div className={styles.detailPrice_text}>
                                    <p>Inpuestos: </p>
                                    <p>-</p>
                                </div>
                            </div>
                            <div className={styles.detailPrice_total}>
                                <p>Total: </p>
                                <p>${subtotal.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className={styles.container_actions}>
                            <button>Iniciar pago</button>
                            <p>Seguir comprando</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
