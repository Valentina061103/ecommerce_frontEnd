import React from 'react'
import styles from "./CardProductCartModal.module.css"

interface Shoe {
    brand: string;
    model: string;
    price: number;
    size: number;
    img: string;
}
interface CardProductCartModalProps {
    shoe: Shoe;
}

export const CardProductCartModal = ({shoe}: CardProductCartModalProps) => {
    return (
        <div className={styles.container_cardProduct}>
            <img src={shoe.img} alt={shoe.model} />
            <div className={styles.CardProduct_content_detail}>
                <div className={styles.cardProduct_detail}>
                    <div className={styles.cardProduct_detail_model}>
                        <p>{shoe.brand} {shoe.model}</p>
                        <p>Talle: {shoe.size}</p>
                    </div>
                    <div className={styles.cardProduct_price}>
                        <div className={styles.cardProduct_detail_counter}>
                            <span className="material-symbols-outlined">remove</span>
                            <p>1</p>
                            <span className="material-symbols-outlined">add</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.cardProduct_buttonDelete}>
                <p>${shoe.price.toLocaleString()}</p>
                <span className="material-symbols-outlined">delete</span>
            </div>
        </div>
    )
}
