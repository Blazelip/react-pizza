import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/caltTotalPrice";
import { getCartFromStorage } from "../../utils/getCartFromStorage";
import { RootState } from "../store";

export type CartItem = {
  id: string,
  title: string, 
  price: number,
  imageUrl: string,
  size: number,
  type: string,
  rating: number,
  count: number,
};

interface CartSliceState {
  totalPrice: number,
  items: CartItem[],
}

const cartStorage = getCartFromStorage();

const initialState: CartSliceState = {
  totalPrice: cartStorage.totalPrice,
  items: cartStorage.items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    plusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  }
})

export const cartSelector = (state: RootState) => state.cart;
export const cartItemsSelector = (id: string) => (state: RootState) => state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;