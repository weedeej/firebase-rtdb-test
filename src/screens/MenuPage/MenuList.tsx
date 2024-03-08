import { Menu } from "@/types";
import { CircularProgress } from "@mui/material";
import { useState } from "react"

type MenuListProps = {
  menuList: Menu[] | null;
}

export function MenuList(props: MenuListProps) {
  const {menuList} = props;
  if (!menuList) return <CircularProgress />
  return <>Menu</>
}