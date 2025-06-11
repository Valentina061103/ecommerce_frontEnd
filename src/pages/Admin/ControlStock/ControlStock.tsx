import { useEffect, useState, useCallback } from "react";
import { useAdminProductosStore } from "../../../hooks/useAdminProducts";
import styles from "./ControlStock.module.css";

type Subcategories = {
  [key: string]: string[];
};

export const ControlStock = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [productoExpandido, setProductoExpandido] = useState<number | null>(null);

  const {
    productos,
    loading,
    error,
    fetchProductos,
    toggleActivo
  } = useAdminProductosStore();

  // Subcategorías: para Zapatillas son categorías (estilos), para Ropa son tipos de prenda
  const subcategories: Subcategories = {
    Zapatillas: ["Running", "Fútbol", "Básquet", "Jordan", "Moda"], // Estas son categorías
    Ropa: ["Remera", "Buzo", "Short", "Pantalón"], // Estos son tipos de producto
    Accesorios: [] // Sin subcategorías
  };

  // Mapeo de tipos de ropa a TipoProducto del backend
  const tipoRopaMapping: Record<string, string> = {
    "Remera": "REMERA",
    "Buzo": "BUZO",
    "Short": "SHORT", 
    "Pantalón": "PANTALON"
  };

  useEffect(() => {
    fetchProductos(); // Carga inicial
  }, []);

  useEffect(() => {
    const filtros: Record<string, any> = {};

    if (selectedCategory === "Zapatillas") {
      // Para zapatillas: filtrar por tipoProducto = ZAPATILLA
      filtros.tipoProducto = "ZAPATILLA";
      
      // Si hay subcategoría seleccionada, es una categoría (estilo)
      if (selectedSubcategory) {
        filtros.categoria = selectedSubcategory;
      }
    } 
    else if (selectedCategory === "Ropa") {
      // Para ropa: si hay subcategoría, filtrar por ese tipo específico
      if (selectedSubcategory) {
        const tipoProducto = tipoRopaMapping[selectedSubcategory];
        if (tipoProducto) {
          filtros.tipoProducto = tipoProducto;
        }
      } else {
        // Si no hay subcategoría, mostrar toda la ropa
        // Podrías filtrar por múltiples tipos, pero necesitarías modificar el backend
        // Por ahora, sin filtro específico mostrará todo
      }
    }
    else if (selectedCategory === "Accesorios") {
      filtros.tipoProducto = "ACCESORIO";
    }
    // Si selectedCategory === "Todos", no agregamos filtros

    console.log("Filtros enviados:", filtros);

    fetchProductos(filtros);
  }, [selectedCategory, selectedSubcategory]); // Removido fetchProductos de las dependencias

  const handleCategoryClick = (cat: string) => {
    if (cat === "Todos") {
      setSelectedCategory("Todos");
      setSelectedSubcategory("");
    } else {
      setSelectedCategory(prev => prev === cat ? "Todos" : cat);
      setSelectedSubcategory(""); // Limpiar subcategoría al cambiar categoría
    }
  };

  const handleSubcategoryClick = (sub: string) => {
    setSelectedSubcategory(prev => prev === sub ? "" : sub);
  };

  const toggleExpand = (id: number) => {
    setProductoExpandido(prev => prev === id ? null : id);
  };

  const handleToggleActivo = (id: number) => {
    toggleActivo(id);
  };

  return (
    <div className={styles.containerPage}>
      <div className={styles.containerTitlePage}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
        <h2>Control stock</h2>
      </div>

      <div className={styles.containerContent}>
        <div className={styles.containerFilter}>
          {["Todos", "Zapatillas", "Ropa", "Accesorios"].map(cat => (
            <p
              key={cat}
              className={selectedCategory === cat ? styles.selected : ""}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </p>
          ))}
        </div>

        {selectedCategory && selectedCategory !== "Todos" && subcategories[selectedCategory] && subcategories[selectedCategory].length > 0 && (
          <div className={styles.containerSubFilter}>
            {subcategories[selectedCategory].map(sub => (
              <p
                key={sub}
                className={selectedSubcategory === sub ? styles.selected : ""}
                onClick={() => handleSubcategoryClick(sub)}
              >
                {sub}
              </p>
            ))}
          </div>
        )}

        {loading && <p>Cargando productos...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}

        <div className={styles.productGrid}>
          <div className={styles.tableHeader}>
            <p></p>
            <p>Nombre</p>
            <p>Categoría</p>
            <p>Producto</p>
            <p>Género</p>
            <p>Acciones</p>
          </div>

          {productos.length > 0 ? (
            productos.map(prod => (
              <div key={prod.id} className={styles.tableRow}>
                <span
                  className="material-symbols-outlined"
                  onClick={() => toggleExpand(prod.id)}
                  style={{ cursor: "pointer" }}
                >
                  {productoExpandido === prod.id ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                </span>

                <p>{prod.nombre}</p>
                <p>{prod.categoria?.nombre || "—"}</p>
                <p>{prod.tipoProducto}</p>
                <p>{prod.sexo}</p>

                <span
                  className="material-symbols-outlined"
                  onClick={() => handleToggleActivo(prod.id)}
                  style={{ cursor: "pointer" }}
                  title={prod.activo ? "Ocultar" : "Mostrar"}
                >
                  {prod.activo ? "visibility_off" : "visibility"}
                </span>

                {productoExpandido === prod.id && (
                  <div className={styles.expandedRow}>
                    <div className={styles.detailGrid}>
                      <div className={styles.detailHeader}>
                        <p>Talle</p>
                        <p>Stock</p>
                        <p>Precio</p>
                      </div>
                      {prod.detalles?.map(det => (
                        <div key={det.id} className={styles.detailRow}>
                          <p>{det.talle?.talle ?? "—"}</p>
                          <p>{det.stock}</p>
                          <p>${det.precio?.precioVenta?.toFixed(2) ?? "0.00"}</p>
                        </div>
                      )) || <p>No hay detalles disponibles</p>}
                    </div>
                    {prod.imagen && (
                        <img src={prod.imagen} alt={prod.nombre} width="120" />
                        )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No hay productos para mostrar.</p>
          )}
        </div>
      </div>
    </div>
  );
};