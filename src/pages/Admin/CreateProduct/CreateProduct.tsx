import { useState } from 'react';
import styles from './CreateProduct.module.css';
import { useCategorias } from '../../../hooks/useCategorias';
import { useCategoriaStore } from '../../../store/categoriaStore';

const marcasDisponibles = ["Nike"];
const coloresDisponibles = ["NEGRO", "BLANCO", "GRIS", "VERDE", "ROJO", "AZUL", "AMARILLO", "ROSA", "VIOLETA", "MULTICOLOR"];
const tallesZapatilla = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"];
const tallesRopa = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const CreateProduct = () => {
  const [productoId, setProductoId] = useState<number | null>(null);
  const [detalles, setDetalles] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [tallesDisponibles, setTallesDisponibles] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    nombre: '',
    sexo: '',
    tipoProducto: '',
    categoriaNombre: '',
  });

  const [detalleData, setDetalleData] = useState({
    talle: '',
    stock: '',
    precioCompra: '',
    precioVenta: '',
    estado: '',
    color: '',
    marca: '',
  });

  useCategorias();
  const categorias = useCategoriaStore((state) => state.categorias);

  const handleResetAll = () => {
    setProductoId(null);
    setDetalles([]);
    setImageFile(null);
    setImageUrl('');
    setFormData({
      nombre: '',
      sexo: '',
      tipoProducto: '',
      categoriaNombre: '',
    });
    setDetalleData({
      talle: '',
      stock: '',
      precioCompra: '',
      precioVenta: '',
      estado: '',
      color: '',
      marca: '',
    });
    setTallesDisponibles([]);
  };

  const handleTipoProductoChange = (tipo: string) => {
    setFormData({ ...formData, tipoProducto: tipo });
    setTallesDisponibles(tipo === "ZAPATILLA" ? tallesZapatilla : tallesRopa);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return alert('Selecciona una imagen');
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'ramardoh');

    const res = await fetch('https://api.cloudinary.com/v1_1/cloudrama/image/upload', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    setImageUrl(result.secure_url);
    alert('Imagen subida correctamente');
  };

  const handleCrearProducto = async () => {
    console.log(formData)
    const res = await fetch('http://localhost:8080/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) return alert('Error al crear producto');
    const prod = await res.json();
    setProductoId(prod.id);
    alert('Producto creado');
  };

  const handleAgregarDetalle = async () => {
    if (!productoId || !imageUrl) return alert('Falta imagen o producto');

    const detallePayload = {
      ...detalleData,
      precioCompra: parseFloat(detalleData.precioCompra),
      precioVenta: parseFloat(detalleData.precioVenta),
      estado: detalleData.estado === 'ACTIVO',
      imagenesUrls: [imageUrl],
    };

    const res = await fetch(`http://localhost:8080/api/productos/${productoId}/detalles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(detallePayload),
    });

    if (!res.ok) return alert('Error al agregar detalle');
    const nuevoDetalle = await res.json();
    setDetalles((prev) => [...prev, nuevoDetalle]);
    alert('Detalle agregado');
  };

  const handleActivarProducto = async () => {
    if (!productoId) return;
    const res = await fetch(`http://localhost:8080/api/productos/${productoId}/activar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (res.ok) alert('Producto activado');
  };

  return (
    <div className={styles.containerPage}>
      <div className={styles.containerTitlePage}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
        <h2>Crear producto</h2>
      </div>

      {/* Paso 1: Crear Producto */}
      <section className={styles.formulario}>
        <h3>Datos del producto</h3>
        <div className={styles.conteinerForm}>
          <div className={styles.formGroup}>
            <label>Nombre</label>
            <input value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
          </div>

          <div className={styles.formGroup}>
            <label>Sexo</label>
            <select value={formData.sexo} onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}>
              <option value="">Sexo</option>
              <option value="MASCULINO">MASCULINO</option>
              <option value="FEMENINO">FEMENINO</option>
              <option value="UNISEX">UNISEX</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Tipo de Producto</label>
            <select value={formData.tipoProducto} onChange={(e) => handleTipoProductoChange(e.target.value)}>
              <option value="">Tipo</option>
              <option value="ZAPATILLA">ZAPATILLA</option>
              <option value="REMERA">REMERA</option>
              <option value="BUZO">BUZO</option>
              <option value="SHORT">SHORT</option>
              <option value="PANTALON">PANTALON</option>
              <option value="ACCESORIO">ACCESORIO</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Categoría</label>
            <select value={formData.categoriaNombre} onChange={(e) => setFormData({ ...formData, categoriaNombre: e.target.value })}>
              <option value="">Categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.conteinerActions}>
          <button onClick={handleCrearProducto}>Crear producto</button>
        </div>
      </section>

      {productoId && (
        <>
          {/* Paso 2: Subir Imagen */}
          <section className={styles.formulario}>
            <h3>Subir imagen</h3>
            <label>Imagen</label>
            <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            {imageUrl && <img src={imageUrl} width="100" />}
            <div className={styles.conteinerActions}>
              <button onClick={handleImageUpload}>Subir a Cloudinary</button>
            </div>
          </section>

          {/* Paso 3: Agregar Detalle */}
          <section className={styles.formulario}>
            <h3>Agregar detalle</h3>

            <div className={styles.conteinerForm}>
              <div className={styles.formGroup}>
                <label>Talle</label>
                <select value={detalleData.talle} onChange={(e) => setDetalleData({ ...detalleData, talle: e.target.value })}>
                  <option value="">Talle</option>
                  {tallesDisponibles.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Stock</label>
                <input type="number" value={detalleData.stock} onChange={(e) => setDetalleData({ ...detalleData, stock: e.target.value })} />
              </div>

              <div className={styles.formGroup}>
                <label>Precio compra</label>
                <input value={detalleData.precioCompra} onChange={(e) => setDetalleData({ ...detalleData, precioCompra: e.target.value })} />
              </div>

              <div className={styles.formGroup}>
                <label>Precio venta</label>
                <input value={detalleData.precioVenta} onChange={(e) => setDetalleData({ ...detalleData, precioVenta: e.target.value })} />
              </div>

              <div className={styles.formGroup}>
                <label>Color</label>
                <select value={detalleData.color} onChange={(e) => setDetalleData({ ...detalleData, color: e.target.value })}>
                  <option value="">Seleccione un color</option>
                  {coloresDisponibles.map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Marca</label>
                <select value={detalleData.marca} onChange={(e) => setDetalleData({ ...detalleData, marca: e.target.value })}>
                  <option value="">Marca</option>
                  {marcasDisponibles.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Estado</label>
                <select value={detalleData.estado} onChange={(e) => setDetalleData({ ...detalleData, estado: e.target.value })}>
                  <option value="">Estado</option>
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                </select>
              </div>
            </div>

            <div className={styles.conteinerActions}>
              <button onClick={handleAgregarDetalle}>Agregar detalle</button>
            </div>
          </section>

          {/* Detalles */}
          {detalles.length > 0 && (
            <section className={styles.formulario}>
              <h4>Detalles agregados</h4>
              <ol>
                {detalles.map((d, i) => (
                  <li key={i}>
                    Talle: {d.talle?.talle || '—'} - Stock: {d.stock} - Marca: {d.marca} - Precio: ${d.precio?.precioVenta || 0}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Paso 4: Activar / Resetear */}
          <div className={styles.botonEnviar}>
            <button onClick={handleActivarProducto}>Activar producto</button>
            <button type="button" onClick={handleResetAll} className={styles.resetBtn}>Resetear todo</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProduct;
