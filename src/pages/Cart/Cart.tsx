import { CardProductCart } from "../../components/CardProductCartPage/CardProductCartPage";
import styles from './Cart.module.css';
import { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import { PaymentRequest } from "../../types/cart";

export const Cart = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = getTotalPrice();

  const handlePay = async () => {
    if (items.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    setError(null);
    setIsLoading(true);

    // Simulo usuarioId = 1; reemplazar con usuario real del contexto/auth
    const usuarioId = 1;

    const paymentData: PaymentRequest = {
      usuarioId,
      productos: items.map((item) => ({
        detalleId: item.detalleId,
        nombre: `${item.producto.nombre} - ${item.detalle.marca} ${item.detalle.color} Talle ${item.detalle.talle}`,
        precioVenta: item.detalle.precio,
        cantidad: item.cantidad,
      })),
    };

    try {
      const response = await fetch('http://localhost:8080/api/payments/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();

      if (data.initPoint) {
        // Limpiar carrito antes de redirigir (opcional)
        // clearCart();
        // Redirijo al checkout de MercadoPago
        window.location.href = data.initPoint;
      } else {
        setError("No se pudo obtener el initPoint para el pago.");
        console.error('No se pudo obtener el initPoint:', data);
      }
    } catch (error) {
      setError("Error al iniciar el pago. Revisa la consola.");
      console.error('Error al iniciar el pago:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueShopping = () => {
    // Navegar a la tienda o catálogo
    // Si usas React Router: navigate('/catalogo')
    window.location.href = '/catalogo'; // O la ruta que corresponda
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.container_empty}>
        <div className={styles.empty_cart}>
          <h2>Tu carrito está vacío</h2>
          <p>¡Agrega algunos productos para comenzar!</p>
          <button onClick={handleContinueShopping} className={styles.continue_shopping}>
            Ir a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.container_contentCard}>
        <div className={styles.container_cardsProducts}>
          <div className={styles.cart_header}>
            <h2>Mi Carrito ({items.length} producto{items.length !== 1 ? 's' : ''})</h2>
            <button 
              onClick={handleClearCart} 
              className={styles.clear_cart}
              title="Vaciar carrito"
            >
              <span className="material-symbols-outlined">delete_sweep</span>
            </button>
          </div>
          {items.map((item) => (
            <CardProductCart 
              key={item.detalleId} 
              cartItem={item} 
            />
          ))}
        </div>
        
        <div className={styles.container_price}>
          <div className={styles.container_detailPrice}>
            <div className={styles.detailPrice_description}>
              <div className={styles.detailPrice_text}>
                <p>Subtotal: </p>
                <p>${subtotal.toLocaleString()}</p>
              </div>
              <div className={styles.detailPrice_text}>
                <p>Envío: </p>
                <p>Gratis</p>
              </div>
              <div className={styles.detailPrice_text}>
                <p>Impuestos: </p>
                <p>Incluidos</p>
              </div>
            </div>
            <div className={styles.detailPrice_total}>
              <p>Total: </p>
              <p>${subtotal.toLocaleString()}</p>
            </div>
          </div>
          
          <div className={styles.container_actions}>
            <button 
              onClick={handlePay} 
              disabled={isLoading}
              className={styles.pay_button}
            >
              {isLoading ? 'Procesando...' : 'Iniciar pago'}
            </button>
            {error && <p className={styles.error_message}>{error}</p>}
            <button 
              onClick={handleContinueShopping}
              className={styles.continue_shopping_link}
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};