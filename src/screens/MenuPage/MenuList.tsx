"use client";

import { EditMenuItemDrawer, MenuItemCard } from "@/components";
import { Menu } from "@/types";
import { CircularProgress, Stack } from "@mui/material";
import { useState } from "react"

type MenuListProps = {
  menuList: Menu[] | null;
}

export function MenuList(props: MenuListProps) {
  const { menuList } = props;
  const [selectedMenuItemId, setSelectedMenuItemId] = useState("");

  function onMenuItemEdit(id: string) {
    setSelectedMenuItemId(id);
  }

  function onMenuItemDelete(id: string) {
    setSelectedMenuItemId("");
  }

  function resetSelectedMenuItemId() {
    setSelectedMenuItemId("")
  }

  if (!menuList) return <CircularProgress />
  return (
    <>
      <EditMenuItemDrawer menuItemId={selectedMenuItemId} onClose={resetSelectedMenuItemId} />
      <Stack direction="row" justifyContent="space-evenly">
        {
          menuList.map((menu) => <MenuItemCard key={`menu_${menu.id}`} onEdit={() => onMenuItemEdit(menu.id)} onDelete={() => onMenuItemDelete(menu.id)} item={menu} />)
        }
      </Stack>
    </>
  )
}