import { StoreState } from "@/redux/store";
import { showToast } from "@/utils";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onValue, ref, query, orderByChild, limitToLast } from "firebase/database";
import { db } from "@/firebaseConfig";
import { Category, Menu } from "@/types";
import { setMenuList } from "@/redux/menuSlice";
import { setCategories } from "@/redux/categoriesSlice";

export function ReduxValuesPrefetch() {
  const dispatch = useDispatch();

  // Menus Effect
  useEffect(() => {
    const menuRef = query(ref(db, "menu"), orderByChild("dateAdded"), limitToLast(10))
    return onValue(menuRef, (snap) => {
      const data = snap.val() as { [id: string]: Menu } | null;
      dispatch(
        setMenuList(
          data ?
            Object.values(data) :
            null
        )
      );
    });
  }, []);

  // Categories Effect
  useEffect(() => {
    const categoriesRef = query(ref(db, "categories"), orderByChild("name"))
    return onValue(categoriesRef, (snap) => {
      const data = snap.val() as { [id: string]: Category } | null;
      dispatch(
        setCategories(
          data ?
            Object.values(data) :
            null
        )
      );
    });
  }, []);

  return (<Box display="hidden" />)
}