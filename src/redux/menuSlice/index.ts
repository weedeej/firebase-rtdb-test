import { Menu } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenuSlice {
  list: Menu[] | null;
}

const initialState: MenuSlice = {
  list: null
}

const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setMenuList: (state, action: PayloadAction<Menu[] | null>) => {
      state.list = action.payload;
      return state;
    },
    addToMenu: (state, action: PayloadAction<Menu>) => {
      const categories = state.list ? [...state.list] : [];
      categories.push(action.payload);
      state.list = categories;
      return state;
    },
    deleteFromMenu: (state, action: PayloadAction<string>) => {
      const categories = state.list ? [...state.list] : [];
      state.list = categories.filter((cat) => cat.id !== action.payload);
      return state;
    }
  }
});

export const {setMenuList, addToMenu, deleteFromMenu} = menuSlice.actions;

export default menuSlice.reducer;