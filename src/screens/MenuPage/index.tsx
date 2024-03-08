import { Menu } from "@/types";
import { Box, Button, Stack, colors } from "@mui/material";
import { useState } from "react"
import { MenuList } from "./MenuList";
import { Add } from "@mui/icons-material";
import { AddMenuSection } from "./AddMenuSection";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/store";

export function MenuPage() {
  const menu = useSelector((state: StoreState) => state.menus.list);
  const categories = useSelector((state: StoreState) => state.categories.list);

  return (
    <Stack width="100%" gap={2}>
      {
        menu && <AddMenuSection categories={categories} menuList={menu}/>
      }
      <Stack
        direction="row"
        justifyContent={(menu && menu.length > 0) ? "space-evenly" : "center"}
        alignItems="stretch"
        flexWrap="wrap">
        <MenuList menuList={menu} />
      </Stack>
    </Stack>
  )
}