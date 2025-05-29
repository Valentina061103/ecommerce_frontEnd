import React, { useState } from 'react';
import styles from './CreateProduct.module.css';

// Enums para las opciones del formulario
enum ProductType {
  ZAPATILLAS = "ZAPATILLAS",
  REMERAS = "REMERAS",
  BUZO = "BUZO",
  SHORTS = "SHORTS",
  PANTALON = "PANTALÓN",
  ACCESORIOS = "ACCESORIOS",
}

enum ProductCategory {
  RUNNING = "RUNNING",
  JORDAN = "JORDAN",
  MODA = "MODA",
  FUTBOL = "FUTBOL",
  BASQUET = "BASQUET",
}

enum ProductGender {
  HOMBRE = "HOMBRE",
  MUJER = "MUJER",
  UNISEX = "UNISEX",
}

enum ProductColor {
  NEGRO = "NEGRO",
  BLANCO = "BLANCO",
  GRIS = "GRIS",
  VERDE = "VERDE",
  ROJO = "ROJO",
  AZUL = "AZUL",
  AMARILLO = "AMARILLO",
  ROSA = "ROSA",
  VIOLETA = "VIOLETA",
  MULTICOLOR = "MULTICOLOR",
}

enum ProductEstado {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO",
}

// Talles y stock
type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45";
type StockPorTalle = {
  talle: ProductSize;
  cantidad: number;
};

// Listas de talles según el producto
const zapatillaSizes = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
const defaultSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const CreateProduct = () => {
  // Estados para cada campo del formulario
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [genero, setGenero] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [estado, setEstado] = useState('');
  const [tipoProducto, setTipoProducto] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [talle, setTalle] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [tallesStock, setTallesStock] = useState<StockPorTalle[]>([]);
  const [sizeOptions, setSizeOptions] = useState<string[]>(defaultSizes);

  // Cambia los talles según la categoría (si es zapatilla, se muestran números)
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value as ProductType;
    setCategory(selectedType);

    if (selectedType === ProductType.ZAPATILLAS) {
      setSizeOptions(zapatillaSizes);
    } else {
      setSizeOptions(defaultSizes);
    }
    setTalle("");
  };

  // Carga de imagen y vista previa
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Agrega talle y cantidad al stock
  const handleAddTalleStock = () => {
    if (!talle || !cantidad) return;
    if (tallesStock.some((item) => item.talle === talle)) {
      alert("Este talle ya fue agregado.");
      return;
    }

    setTallesStock((prev) => [
      ...prev,
      { talle: talle as ProductSize, cantidad: parseInt(cantidad) }
    ]);
    setTalle('');
    setCantidad('');
  };

  // Elimina un talle del stock
  const handleRemoveTalle = (talleToRemove: string) => {
    setTallesStock((prev) => prev.filter((item) => item.talle !== talleToRemove));
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Por favor selecciona una imagen');
      return;
    }

    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'ramardoh');

    try {
      // Subida a Cloudinary
      const res = await fetch('https://api.cloudinary.com/v1_1/cloudrama/image/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error('Error al subir la imagen');

      const cloudinaryData = await res.json();
      const imageUrl = cloudinaryData.secure_url;

      // Datos finales del producto
      const productData = {
        name,
        description,
        price: parseFloat(price),
        estado,
        category,
        genero,
        modelo,
        color,
        imageUrl,
        talles: tallesStock,
      };

      // Enviar al backend
      const response = await fetch('http://localhost:8080/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Error al crear el producto');

      alert('Producto creado correctamente');

      // Resetear formulario
      setName('');
      setDescription('');
      setPrice('');
      setEstado('');
      setCategory('');
      setGenero('');
      setModelo('');
      setColor('');
      setImageFile(null);
      setImagePreview(null);
      setTalle('');
      setCantidad('');
      setTallesStock([]);

    } catch (error: any) {
      alert(error.message || 'Ocurrió un error');
    }
  };

  return (
    <div className={styles.containerForm}>
      <h2>Crear nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        {/* Tipo de Producto */}
        <div className={styles.formGroup}>
          <label htmlFor="tipoProducto">Tipo de Producto</label>
          <select
            id="tipoProducto"
            value={tipoProducto}
            onChange={(e) => {
              const selectedType = e.target.value as ProductType;
              setTipoProducto(selectedType);
              if (selectedType === ProductType.ZAPATILLAS) {
                setSizeOptions(zapatillaSizes);
              } else {
                setSizeOptions(defaultSizes);
              }
              setTalle("");
            }}
            required
          >
            <option value="">Seleccione un tipo</option>
            {Object.values(ProductType).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Nombre */}
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        {/* Descripción */}
        <div className={styles.formGroup}>
          <label htmlFor="description">Descripción</label>
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        {/* Precio */}
        <div className={styles.formGroup}>
          <label htmlFor="price">Precio</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="0.01" required />
        </div>

        {/* Categoría */}
        <div className={styles.formGroup}>
          <label htmlFor="category">Categoría</label>
          <select id="category" value={category} onChange={handleCategoryChange} required>
            <option value="">Seleccione una categoría</option>
            {Object.values(ProductCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Género */}
        <div className={styles.formGroup}>
          <label htmlFor="genero">Género</label>
          <select id="genero" value={genero} onChange={(e) => setGenero(e.target.value as ProductGender)} required>
            <option value="">Seleccione un género</option>
            {Object.values(ProductGender).map((gen) => (
              <option key={gen} value={gen}>{gen}</option>
            ))}
          </select>
        </div>

        {/* Modelo */}
        <div className={styles.formGroup}>
          <label htmlFor="modelo">Modelo</label>
          <input type="text" id="modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
        </div>

        {/* Color */}
        <div className={styles.formGroup}>
          <label htmlFor="color">Color</label>
          <select id="color" value={color} onChange={(e) => setColor(e.target.value as ProductColor)} required>
            <option value="">Seleccione un color</option>
            {Object.values(ProductColor).map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>

        {/* Imagen */}
        <div className={styles.formGroup}>
          <label htmlFor="image">Imagen</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Vista previa" width="100" />}
        </div>

        {/* Talle y cantidad */}
        <div className={styles.formGroup}>
          <label>Talle</label>
          <select value={talle} onChange={(e) => setTalle(e.target.value)}>
            <option value="">Seleccione un talle</option>
            {sizeOptions.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            min="0"
          />
          <button type="button" onClick={handleAddTalleStock}>Agregar</button>
        </div>

        {/* Lista de talles agregados */}
        {tallesStock.length > 0 && (
          <div className={styles.formGroup}>
            <h4>Talles agregados:</h4>
            <ul>
              {tallesStock.map(({ talle, cantidad }) => (
                <li key={talle}>
                  {talle}: {cantidad}
                  <button type="button" onClick={() => handleRemoveTalle(talle)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Estado */}
        <div className={styles.formGroup}>
          <label htmlFor="estado">Estado</label>
          <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value as ProductEstado)} required>
            <option value="">Seleccione un estado</option>
            {Object.values(ProductEstado).map((est) => (
              <option key={est} value={est}>{est}</option>
            ))}
          </select>
        </div>

        {/* Botón de envío */}
        <div className={styles.formGroup}>
          <button type="submit">Crear producto</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
