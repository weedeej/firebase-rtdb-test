import { Menu } from "@/types";
import { Box, Button, Stack, colors } from "@mui/material";
import { useState } from "react"
import { MenuList } from "./MenuList";
import { Add } from "@mui/icons-material";
import { AddMenuSection } from "./AddMenuSection";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/store";
import { AddCategorySection } from "./AddCateogrySection";

export function MenuPage() {
  const menu = useSelector((state: StoreState) => state.menus.list);
  const categories = useSelector((state: StoreState) => state.categories.list);

  return (
    <Stack width="100%" gap={2}>
      <Stack direction="row" justifyContent="center" gap={2} alignItems="stretch">
        {
          menu && <AddMenuSection categories={categories} menuList={menu} />
        }
        {
          menu && <AddCategorySection />
        }
      </Stack>
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