import styles from "./ControlStock.module.css"
import {useState} from "react";

export const ControlStock = () => {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleCategoryClick = (category) => {
        // Si vuelven a hacer clic sobre la misma categoría, la cerramos
        setSelectedCategory(prev => prev === category ? "" : category);
    };

    const subcategories = {
        Zapatillas: ["Running", "Fútbol", "Básquet", "Jordan", "Moda"],
        Ropa: ["Remera", "Buzo", "Campera", "Short", "Pantalón"]
    };


    return (
        <div className={styles.containerPage}>
            <div className={styles.containerTitlePage}>
                <span className="material-symbols-outlined">arrow_back_ios</span>
                <h2>Control stock</h2>
            </div>
            <div className={styles.containerContent}>
            <div className={styles.containerFilter}>
                {["Todos", "Zapatillas", "Ropa", "Accesorios"].map((category) => (
                    <p
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={selectedCategory === category ? styles.selected : ""}
                    >
                        {category}
                    </p>
                ))}
            </div>
                {subcategories[selectedCategory] && (
                    <div className={styles.containerSubFilter}>
                        {subcategories[selectedCategory].map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
