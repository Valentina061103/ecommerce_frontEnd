import { useCartStore } from '../store/cartStore';
import type { CartItem} from '../types/cart';
import type { Producto, Detalle } from '../types/IProduct';


export const useAddToCart = () => {
  const addItem = useCartStore(state => state.addItem);

  const addToCart = async (productoId: number, talleNombre: string) => {
    try {

         console.log('🔍 Enviando productoId:', productoId);
        console.log('🔍 Enviando talleNombre:', talleNombre);

      const res = await fetch(`http://localhost:8080/api/productos/${productoId}`);
      const producto: Producto = await res.json();
       console.log('📦 Producto recibido:', producto);

       const detalle: Detalle | undefined = producto.detalles.find(d => d.talle.talle === talleNombre);

      if (!detalle) {
        return { success: false, message: 'No se encontró el talle seleccionado' };
      }

      const itemToAdd: Omit<CartItem, 'cantidad'> = {
        detalleId: detalle.id,
        producto: {
          id: producto.id,
          nombre: producto.nombre,
          tipoProducto: producto.tipoProducto,
        },
        detalle: {
          id: detalle.id,
          marca: detalle.marca,
          color: detalle.color,
          talle: detalle.talle.talle,
          precio: detalle.precio.precioVenta,
          imagenUrl: Array.isArray(detalle.imagenes) && detalle.imagenes.length > 0
            ? detalle.imagenes[0].url
            : '',
          stock: detalle.stock,
        },
      };
        console.log('🛒 Agregando al carrito:', itemToAdd);
      addItem(itemToAdd);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error al agregar al carrito' };
    }
  };

  return { addToCart, isLoading: false };
};
