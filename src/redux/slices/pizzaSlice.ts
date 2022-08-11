import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";


type FetchPizzasArgs = Record<string, string>

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const { filterQuery, searchQuery, orderQuery, sort, currentPage } = params;
    const response = await axios.get<PizzaItem[]>(`https://62c2edd6ff594c656769c94f.mockapi.io/pizzas?${filterQuery}${searchQuery}&sortby=${sort}&order=${orderQuery}&page=${currentPage}&limit=4`);
    return response.data as PizzaItem[];
  }
)

type PizzaItem = {
  id: string,
  title: string, 
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[],
  rating: number,
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItem[],
  status: Status,
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    })

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  }
})

export const pizzaSelector = (state: RootState) => state.pizza;
export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;