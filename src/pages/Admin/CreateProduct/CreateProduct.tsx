import React, { useState } from 'react';
import styles from './CreateProduct.module.css';


enum ProductCategory {
  ZAPATILLAS = "ZAPATILLAS",
  REMERAS = "REMERAS",
  SHORTS = "SHORTS",
  ACCESORIOS = "ACCESORIOS",
}

enum ProductGender {
  HOMBRE = "HOMBRE",
  MUJER = "MUJER",
  UNISEX = "UNISEX",
}

type ProductSize = "S" | "M" | "L" | "XL" | "XXL" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45";

const zapatillaSizes = ["38", "39", "40", "41", "42", "43", "44", "45"];
const defaultSizes = ["S", "M", "L", "XL", "XXL"];


const CreateProduct = () => {
  // Los estados del formulario
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [genero, setGenero] = useState('');
  const [talle, setTalle] = useState('');
  const [modelo, setModelo] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [sizeOptions, setSizeOptions] = useState<string[]>(defaultSizes);



  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value as ProductCategory;
    setCategory(selectedCategory);

    if (selectedCategory === ProductCategory.ZAPATILLAS) {
      setSizeOptions(zapatillaSizes);
    } else {
      setSizeOptions(defaultSizes);
    }
    setTalle("");
  };

  

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Por favor selecciona una imagen');
      return;
    }

   
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'ramardoh'); //Despues podemos usar otro preset pero era para probar

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/cloudrama/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error('Error al subir la imagen');
      }

      const cloudinaryData = await res.json();
      const imageUrl = cloudinaryData.secure_url;

      // Construimos el objeto para el back
      const productData = {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        genero,
        talle,
        modelo,
        imageUrl,
      };

      // Llamada al back
      const response = await fetch('http://localhost:8080/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      alert('Producto creado correctamente');

      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategory('');
      setGenero('');
      setTalle('');
      setModelo('');
      setImageFile(null);
      setImagePreview(null);
    } catch (error: any) {
      alert(error.message || 'Ocurrió un error');
    }
  };

  return (
    <div className={styles.containerForm}>
      <h2>Crear nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Descripción */}
        <div className={styles.formGroup}>
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Precio */}
        <div className={styles.formGroup}>
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>


        {/* Categoría */}
        <div className={styles.formGroup}>
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {Object.values(ProductCategory).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Género */}
        <div className={styles.formGroup}>
          <label htmlFor="genero">Género</label>
          <select
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value as ProductGender)}
            required
          >
            <option value="">Seleccione un género</option>
            {Object.values(ProductGender).map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>
        </div>

        {/* Talle */}
        <div className={styles.formGroup}>
          <label htmlFor="talle">Talle</label>
          <select
            id="talle"
            value={talle}
            onChange={(e) => setTalle(e.target.value as ProductSize)}
            required
          >
            <option value="">Seleccione un talle</option>
            {sizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Stock */}
        <div className={styles.formGroup}>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min="0"
            required
          />
        </div>

        {/* Modelo */}
        <div className={styles.formGroup}>
          <label htmlFor="modelo">Modelo</label>
          <input
            type="text"
            id="modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="image">Imagen</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!imagePreview}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Vista previa"
              style={{ marginTop: '10px', maxWidth: '100%', borderRadius: '8px' }}
            />
          )}
        </div>

        <div className={styles.submitContainer}>
          <button type="submit">Crear producto</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
