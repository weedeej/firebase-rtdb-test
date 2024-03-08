import { Category } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CategoriesSlice {
  list: Category[] | null;
}

const initialState: CategoriesSlice = {
  list: null
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[] | null>) => {
      state.list = action.payload;
      return state;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      const categories = state.list ? [...state.list] : [];
      categories.push(action.payload);
      state.list = categories;
      return state;
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      const categories = state.list ? [...state.list] : [];
      state.list = categories.filter((cat) => cat.id !== action.payload);
      return state;
    }
  }
});

export const {setCategories, addCategory, deleteCategory} = categoriesSlice.actions;

export default categoriesSlice.reducer;