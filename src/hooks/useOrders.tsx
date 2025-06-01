
import { useState, useEffect } from 'react';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Pendente' | 'Processando' | 'Em trânsito' | 'Entregue' | 'Cancelado';
  shippingAddress?: {
    street: string;
    city: string;
    zipCode: string;
    state: string;
  };
  paymentMethod?: string;
}

export const useOrders = (userId?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const storageKey = userId ? `orders_${userId}` : 'orders_guest';

  useEffect(() => {
    const savedOrders = localStorage.getItem(storageKey);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [storageKey]);

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem(storageKey, JSON.stringify(newOrders));
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `BS${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    
    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    saveOrders(updatedOrders);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return {
    orders,
    addOrder,
    updateOrderStatus,
    getOrderById
  };
};
