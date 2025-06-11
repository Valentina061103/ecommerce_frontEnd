import styles from './ProductoCarrusel.module.css';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

    interface Producto {
    id: number;
    nombre: string;
    marca: string;
    color: string;
    precio: number;
    categoria: string;
    imagenUrl: string;
    }

    const CarruselProductos = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const fetchProductos = async () => {
        try {
            const res = await fetch('http://localhost:8080/api/productos/catalogo');
            const data = await res.json();

            // Elegimos 6 productos aleatorios
            const productosAleatorios = data
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);

            setProductos(productosAleatorios);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
        };

        fetchProductos();
    }, []);

    const scrollLeft = () => {
        carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const handleProductoClick = (producto: Producto) => {
        navigate('/producto', { state: producto });
    };

    return (
        <div className={styles.carouselContainer}>
        <button className={styles.arrow} onClick={scrollLeft}>
            <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <div className={styles.carousel} ref={carouselRef}>
            {productos.map((producto) => (
            <div
                key={producto.id}
                className={styles.card}
                onClick={() => handleProductoClick(producto)}
            >
                <img src={producto.imagenUrl} alt={producto.nombre} className={styles.imagen} />
                <div className={styles.CardContent}>
                    <p>{producto.nombre}</p>
                    <p className={styles.precio}>${producto.precio}</p>
                </div>
            </div>
            ))}
        </div>
        <button className={styles.arrow} onClick={scrollRight}>
            <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
        </div>
    );
    };

export default CarruselProductos;