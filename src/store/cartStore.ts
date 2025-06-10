import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types/cart';

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cantidad'>) => void;
  removeItem: (detalleId: number) => void;
  updateQuantity: (detalleId: number, cantidad: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (detalleId: number) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        const { items } = get();
        const existingItem = items.find(item => item.detalleId === newItem.detalleId);
        
        if (existingItem) {
          // Si el item ya existe, incrementar cantidad (si hay stock disponible)
          const newQuantity = existingItem.cantidad + 1;
          if (newQuantity <= existingItem.detalle.stock) {
            set({
              items: items.map(item =>
                item.detalleId === newItem.detalleId
                  ? { ...item, cantidad: newQuantity }
                  : item
              )
            });
          } else {
            // Opcional: mostrar mensaje de stock insuficiente
            console.warn('Stock insuficiente');
          }
        } else {
          // Si es un item nuevo, agregarlo con cantidad 1
          set({
            items: [...items, { ...newItem, cantidad: 1 }]
          });
        }
      },
      
      removeItem: (detalleId) => {
        set({
          items: get().items.filter(item => item.detalleId !== detalleId)
        });
      },
      
      updateQuantity: (detalleId, cantidad) => {
        if (cantidad <= 0) {
          get().removeItem(detalleId);
          return;
        }
        
        const { items } = get();
        const item = items.find(item => item.detalleId === detalleId);
        
        if (item && cantidad <= item.detalle.stock) {
          set({
            items: items.map(item =>
              item.detalleId === detalleId
                ? { ...item, cantidad }
                : item
            )
          });
        }
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.cantidad, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.detalle.precio * item.cantidad), 0);
      },
      
      getItemQuantity: (detalleId) => {
        const item = get().items.find(item => item.detalleId === detalleId);
        return item ? item.cantidad : 0;
      }
    }),
    {
      name: 'cart-storage', // nombre para el localStorage
      // Solo persistir durante la sesión
      partialize: (state) => ({ items: state.items }),
    }
  )
);