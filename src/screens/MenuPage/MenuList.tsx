"use client";

import { EditMenuItemDrawer, MenuItemCard } from "@/components";
import { db } from "@/firebaseConfig";
import { Menu } from "@/types";
import { showToast } from "@/utils";
import { CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { ref, remove } from "firebase/database";
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
    const itemRef = ref(db, `menu/${id}`);
    remove(itemRef)
      .then(() => showToast("An Item has been deleted", "success"))
      .catch((e) => showToast(`An Error has occured. Please contact developer: ${e.code}`, "error"))
  }

  function resetSelectedMenuItemId() {
    setSelectedMenuItemId("")
  }

  if (!menuList) return <CircularProgress />
  return (
    <>
      <EditMenuItemDrawer menuItemId={selectedMenuItemId} onClose={resetSelectedMenuItemId} />
      <Stack width="100%" divider={<Divider />} textAlign="start" gap={1}>
        <Typography color="text.secondary" variant="h4">
          Menu
        </Typography>
        <Stack direction="row" justifyContent="space-evenly">
          {
            menuList.map((menu) => <MenuItemCard key={`menu_${menu.id}`} onEdit={() => onMenuItemEdit(menu.id)} onDelete={() => onMenuItemDelete(menu.id)} item={menu} />)
          }
        </Stack>
      </Stack>
    </>
  )
}