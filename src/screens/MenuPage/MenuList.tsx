import { MenuItemCard } from "@/components";
import { Menu } from "@/types";
import { CircularProgress, Stack } from "@mui/material";
import { useState } from "react"

type MenuListProps = {
  menuList: Menu[] | null;
}

export function MenuList(props: MenuListProps) {
  const {menuList} = props;
  if (!menuList) return <CircularProgress />
  return (
    <Stack direction="row" justifyContent="space-evenly">
      {
        menuList.map((menu) => <MenuItemCard key={`menu_${menu.id}`} item={menu} />)
      }
    </Stack>
  )
}