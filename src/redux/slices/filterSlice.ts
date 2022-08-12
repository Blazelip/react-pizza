import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type SortType = {
  value: 'rating' | 'title' | 'price',
  title: string,
}

interface FilterSliceState {
  search: string,
  filter: number,
  sort: SortType,
  order: boolean,
  currentPage: number,
}

const initialState: FilterSliceState = {
  search: '',
  filter: 0,
  sort: {
    value: 'rating',
    title: 'популярности'
  },
  order: false,
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<number>) {
      state.filter = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSorting(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setOrder(state) {
      state.order = !state.order;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setQueryFilters(state, action) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);
        state.filter = Number(action.payload.filterId);
        state.search = action.payload.searchValue;
      } else {
        state.sort = {
          value: 'rating',
          title: 'популярности'
        }
        state.currentPage = 1;
        state.filter = 0;
        state.search = '';
      }
    }
  }
})

export const searchValueSelector = (state: RootState) => state.filter.search;
export const filterSelector = (state: RootState) => state.filter.filter;
export const sortSelector = (state: RootState) => state.filter.sort;

export const { setFilter, setSearchValue, setSorting, setOrder, setCurrentPage, setQueryFilters } = filterSlice.actions;

export default filterSlice.reducer;