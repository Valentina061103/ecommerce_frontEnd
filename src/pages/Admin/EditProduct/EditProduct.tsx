import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./EditProduct.module.css";
import {
  Producto,
  Detalle,
} from "../../../types/IProduct"; 
import { ProductGender, ProductType, ProductSizeValues } from "../../../types/productEnums";

export const EditarProducto = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [producto, setProducto] = useState<Producto | null>(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    axios.get(`/api/productos/${id}`)
      .then((res) => setProducto(res.data))
      .catch(() => setMensaje("Error al cargar el producto"));
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!producto) return;
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  type DetalleField = keyof Detalle | "precioCompra" | "precioVenta";

const handleDetalleChange = (
  index: number,
  field: DetalleField,
  value: string | number | boolean
) => {
  if (!producto) return;

  const nuevosDetalles = [...producto.detalles];
  const detalle = { ...nuevosDetalles[index] };

  switch (field) {
    case "stock":
      detalle.stock = Number(value);
      break;
    case "estado":
      detalle.estado = value === "true" || value === true;
      break;
    case "precioCompra":
      if (!detalle.precio) detalle.precio = { id: 0, precioCompra: 0, precioVenta: 0 };
      detalle.precio.precioCompra = Number(value);
      break;
    case "precioVenta":
      if (!detalle.precio) detalle.precio = { id: 0, precioCompra: 0, precioVenta: 0 };
      detalle.precio.precioVenta = Number(value);
      break;
    case "talle":
      if (!detalle.talle) detalle.talle = { id: 0, talle: "" };
      detalle.talle.talle = value as string;
      break;
    default:
      // Para manejar otros campos directos de Detalle si los hay
      (detalle as any)[field] = value;
  }

  nuevosDetalles[index] = detalle;
  setProducto({ ...producto, detalles: nuevosDetalles });
};

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!producto) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/productos/${producto.id}`, producto, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });
      setMensaje("Producto actualizado correctamente");
      navigate("/stock");
    } catch (error) {
      setMensaje("Error al actualizar el producto");
    }
  };

  if (!producto) return <p>Cargando...</p>;

  return (
  <div className={styles.pageWrapper}>
    <div className={styles.mainContainer}>
      <h2 className={styles.title}>Editar Producto</h2>
      {mensaje && <p>{mensaje}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Sección de Producto */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Producto</h3>

          <div className={styles.inputGroup}>
            <label>Nombre</label>
            <input name="nombre" value={producto.nombre} onChange={handleInputChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Color</label>
            <input name="color" value={producto.color} onChange={handleInputChange} />
          </div>

          <div className={styles.inputGroup}>
            <label>Sexo</label>
            <select name="sexo" value={producto.sexo} onChange={handleInputChange}>
              {Object.values(ProductGender).map((genero) => (
                <option key={genero} value={genero}>{genero}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Tipo de Producto</label>
            <select name="tipoProducto" value={producto.tipoProducto} onChange={handleInputChange}>
              {Object.values(ProductType).map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sección de Detalle */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Detalle</h3>

            {producto.detalles.map((detalle, i) => (
              <div key={detalle.id} className={styles.detalleGroup}>
                <h4>Detalle {i + 1}</h4>

                <div className={styles.inputGroup}>
                  <label>Talle</label>
                  <select value={detalle.talle.talle} onChange={(e) => handleDetalleChange(i, "talle", e.target.value)}>
                    {ProductSizeValues.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Stock</label>
                  <input type="number" value={detalle.stock} onChange={(e) => handleDetalleChange(i, "stock", e.target.value)} />
                </div>

                <div className={styles.inputGroup}>
                  <label>Precio Compra</label>
                  <input type="number" value={detalle.precio.precioCompra} onChange={(e) => handleDetalleChange(i, "precioCompra", e.target.value)} />
                </div>

                <div className={styles.inputGroup}>
                  <label>Precio Venta</label>
                  <input type="number" value={detalle.precio.precioVenta} onChange={(e) => handleDetalleChange(i, "precioVenta", e.target.value)} />
                </div>

                <div className={styles.inputGroup}>
                  <label>Estado</label>
                  <select value={detalle.estado ? "true" : "false"} onChange={(e) => handleDetalleChange(i, "estado", e.target.value)}>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
      </form>
          <button type="submit" className={styles.GuardarButton}>Guardar Cambios</button>
    </div>
  </div>
  );
};
