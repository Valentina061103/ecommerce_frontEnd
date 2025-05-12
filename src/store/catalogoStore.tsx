    import { create } from 'zustand';

    type Producto = {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    imagen: string;
    };

    type Store = {
    productos: Producto[];
    filtroCategoria: string[];
    toggleCategoria: (categoria: string) => void;
    productosFiltrados: () => Producto[];
    };

    const initialProductos: Producto[] = [
    {
        id: 1,
        nombre: 'Zapatillas Air Max',
        descripcion: 'Calzado deportivo para hombre',
        precio: 199999,
        categoria: 'Calzado',
        imagen: '/assets/airmax.jpg',
    },
    {
        id: 2,
        nombre: 'Camiseta Nike Dri-FIT',
        descripcion: 'Ropa deportiva de alto rendimiento',
        precio: 59999,
        categoria: 'Ropa',
        imagen: '/assets/camiseta.jpeg',
    },
    {
        id: 3,
        nombre: 'Mochila Nike Brasilia',
        descripcion: 'Accesorio resistente y espacioso',
        precio: 89999,
        categoria: 'Accesorios',
        imagen: '/assets/mochila.jpeg',
    },
    ];

    export const useCatalogoStore = create<Store>((set, get) => ({
    productos: initialProductos,
    filtroCategoria: [],
    toggleCategoria: (categoria) => {
        const actual = get().filtroCategoria;
        set({
        filtroCategoria: actual.includes(categoria)
            ? actual.filter((c) => c !== categoria)
            : [...actual, categoria],
        });
    },
    productosFiltrados: () => {
        const { productos, filtroCategoria } = get();
        if (filtroCategoria.length === 0) return productos;
        return productos.filter((p) => filtroCategoria.includes(p.categoria));
    },
    }));
