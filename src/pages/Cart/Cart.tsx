
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
    const usuarioId = localStorage.getItem('userId');
    if (!usuarioId) {
      setError("No se pudo obtener el ID del usuario");
      return;
    }
    


    const paymentData: PaymentRequest = {
  
      productos: items.map((item) => ({
        detalleId: item.detalleId,
    
        nombre: `${item.producto.nombre} - ${item.detalle.marca} ${item.detalle.color} Talle ${item.detalle.talle}`,
        precioVenta: item.detalle.precio, 
        cantidad: item.cantidad,
      })),
    };

  
    try {
    
      const response = await fetch(`http://localhost:8080/api/payments/create-checkout?userId=${usuarioId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });

    
      console.log('Solicitud enviada al backend:', { url: `http://localhost:8080/api/payments/create-checkout?userId=${usuarioId}`, method: 'POST', body: paymentData });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null); 
        const errorMessage = errorData && errorData.message ? errorData.message : `Error HTTP: ${response.status} ${response.statusText}`;
        console.error('Error en la respuesta del backend:', response, errorData);
        setError(`Error al iniciar el pago: ${errorMessage}`);
        setIsLoading(false);
        return; 
      }

      const data = await response.json();
      console.log('Respuesta recibida del backend:', data);

      if (data.initPoint) {
        console.log('Redirigiendo a MercadoPago:', data.initPoint);
        window.location.href = data.initPoint; 
      } else {
        setError("No se pudo obtener el initPoint para el pago.");
        console.error('No se pudo obtener el initPoint:', data);
      }
    } catch (error) {
      setError("Error de red o inesperado al iniciar el pago. Revisa la consola.");
      console.error('Error en la llamada fetch:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueShopping = () => {
    window.location.href = '/catalogo';
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
<div className={styles.container}>
        <div className={styles.container_contentCard}>
          {/* Columna izquierda: mensaje de carrito vacío */}
          <div className={styles.container_cardsProducts}>
            <div className={styles.cart_header}>
              <div>
                <h2>Mi Carrito</h2>
                <p>0 productos</p>
              </div>
            </div>
            <div className={styles.empty_cart}>
              <h2>Tu carrito está vacío</h2>
              <p>¡Agrega algunos productos para comenzar!</p>
              <button
                onClick={handleContinueShopping}
                className={styles.continue_shopping}
              >
                Ir a la tienda
              </button>
            </div>
          </div>

          {/* Columna derecha: resumen en cero, botones inactivos */}
          <div className={styles.container_price}>
            <div className={styles.container_detailPrice}>
              <div className={styles.detailPrice_description}>
                <div className={styles.detailPrice_text}>
                  <p>Subtotal: </p>
                  <p>$0</p>
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
                <p>$0</p>
              </div>
            </div>

            <div className={styles.container_actions}>
              <button className={styles.pay_button_disabled} disabled>
                Iniciar pago
              </button>
              <button className={styles.continue_shopping_link_disabled} disabled>
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_contentCard}>
        <div className={styles.container_cardsProducts}>
          <div className={styles.cart_header}>
            <div>
              <h2>Mi Carrito</h2>
              <p>{items.length} producto{items.length !== 1 ? 's' : ''}</p>
            </div>
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