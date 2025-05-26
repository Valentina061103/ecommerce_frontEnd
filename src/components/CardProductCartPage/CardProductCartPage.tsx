import styles from './CardProductCartPage.module.css';

interface Shoe {
    brand: string;
    model: string;
    price: number;
    size: number;
    img: string;
}
interface CardProductCartProps {
    shoe: Shoe;
}

export const CardProductCart = ({shoe}: CardProductCartProps) => {
    return (
        <div className={styles.container_cardProduct}>
            <div className={styles.CardProduct_content_detail}>
                <img src={shoe.img} alt={shoe.model} />
                <div className={styles.cardProduct_detail}>
                    <h3>{shoe.brand}</h3>
                    <div className={styles.cardProduct_detail_model}>
                        <p>Modelo: {shoe.model}</p>
                        <p>Talle: {shoe.size}</p>
                    </div>
                </div>
            </div>
            <div className={styles.cardProduct_price}>
                <p>${shoe.price.toLocaleString()}</p>
                <div className={styles.cardProduct_price_counter}>
                    <span className="material-symbols-outlined">remove</span>
                    <p>1</p>
                    <span className="material-symbols-outlined">add</span>
                </div>
            </div>
            <div className={styles.cardProduct_buttonDelete}>
                <span className="material-symbols-outlined">delete</span>
            </div>
        </div>
    )
}
