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
    <div className={styles.container}>
      <h2>Editar Producto</h2>
      {mensaje && <p>{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        <input name="nombre" value={producto.nombre} onChange={handleInputChange} placeholder="Nombre" />
        
        <input name="color" value={producto.color} onChange={handleInputChange} placeholder="Color" />

        <select name="sexo" value={producto.sexo} onChange={handleInputChange}>
          {Object.values(ProductGender).map((genero) => (
            <option key={genero} value={genero}>{genero}</option>
          ))}
        </select>

        <select name="tipoProducto" value={producto.tipoProducto} onChange={handleInputChange}>
          {Object.values(ProductType).map((tipo) => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>

        {producto.detalles.map((detalle, i) => (
          <div key={detalle.id} className={styles.detalle}>
            <h4>Detalle {i + 1}</h4>

            <label>Talle:</label>
            <select
              value={detalle.talle.talle}
              onChange={(e) => handleDetalleChange(i, "talle", e.target.value)}
            >
              {ProductSizeValues.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <label>Stock:</label>
            <input
              type="number"
              value={detalle.stock}
              onChange={(e) => handleDetalleChange(i, "stock", e.target.value)}
            />

            <label>Precio Compra:</label>
            <input
              type="number"
              value={detalle.precio.precioCompra}
              onChange={(e) => handleDetalleChange(i, "precioCompra", e.target.value)}
            />

            <label>Precio Venta:</label>
            <input
              type="number"
              value={detalle.precio.precioVenta}
              onChange={(e) => handleDetalleChange(i, "precioVenta", e.target.value)}
            />

            <label>Estado:</label>
            <select
              value={detalle.estado ? "true" : "false"}
              onChange={(e) => handleDetalleChange(i, "estado", e.target.value)}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
        ))}

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};
