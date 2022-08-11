import { calcTotalPrice } from "./caltTotalPrice";

export const getCartFromStorage = () => {
  const cartStorage = localStorage.getItem('cart');
  const data = cartStorage ? JSON.parse(cartStorage) : [];
  const totalPrice = calcTotalPrice(data);

  return {
    items: data,
    totalPrice
  }
}