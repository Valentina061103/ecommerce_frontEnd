import { useAdminProducts } from "../../../hooks/useAminProducts";
import { useProductosStore } from "../../../store/ProductStore";
import styles from "./ControlStock.module.css"
import {useState} from "react";

export const ControlStock = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const productos = useProductosStore((state) => state.productos);
    const [productoExpandido, setProductoExpandido] = useState<number | null>(null);

    //carga los productos
    useAdminProducts();

    const handleCategoryClick = (category: string) => {
        // Si vuelven a hacer clic sobre la misma categoría, la cerramos
        setSelectedCategory((prev) => (prev === category ? "" : category));
    };

    const subcategories = {
        Zapatillas: ["Running", "Fútbol", "Básquet", "Jordan", "Moda"],
        Ropa: ["Remera", "Buzo", "Campera", "Short", "Pantalón"]
    };

    const toggleExpand = (id: number) => {
        setProductoExpandido((prev) => (prev === id ? null : id));
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

                <div className={styles.productGrid}>
                    {/* Cabecera */}
                    <div className={styles.tableHeader}>
                        <p></p>
                        <p>Nombre</p>
                        <p>Categoría</p>
                        <p>Producto</p>
                        <p>Género</p>
                        <p>Acciones</p>
                    </div>

                {/* Productos */}
                {productos.map((producto) => (
                    <div key={producto.id} className={styles.tableRow}>
                    {/* Flecha para expandir */}
                    <span
                        className="material-symbols-outlined"
                        onClick={() => toggleExpand(producto.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {productoExpandido === producto.id ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                    </span>

                    <p>{producto.nombre}</p>
                    <p>{producto.categoria?.nombre}</p>
                    <p>{producto.tipoProducto}</p>
                    <p>{producto.sexo}</p>

                    <span className="material-symbols-outlined">visibility_off</span>

                    {/* Detalle expandido */}
                    {productoExpandido === producto.id && (
                        <div className={styles.expandedRow}>
                            {/* Detalles de stock con grid */}
                            <div className={styles.detailGrid}>
                                <div className={styles.detailHeader}>
                                <p>Talle</p>
                                <p>Stock</p>
                                <p>Precio</p>
                                </div>
                                {producto.detalles.map((detalle) => (
                                <div key={detalle.id} className={styles.detailRow}>
                                    <p>{detalle.talle?.talle || '—'}</p>
                                    <p>{detalle.stock}</p>
                                    <p>${detalle.precio?.precioVenta?.toFixed(2) || '0.00'}</p>
                                </div>
                                ))}
                            </div>

                            {/* Imagen del producto */}
                            <div>
                                {producto.imagen?.url && (
                                <img src={producto.imagen.url} alt={producto.nombre} width="120" />
                                )}
                            </div>
                        </div>
                    )}
                    </div>
                ))}
                </div>


            </div>
        </div>
    )
}
