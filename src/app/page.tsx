"use client";

import { NavigationMenu } from "@/enums";
import Screens from "@/screens";
import { NotFoundPage } from "@/screens/NotFoundPage";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Home() {
  const params = useSearchParams();
  const currentPage = useMemo(() => {
    return (params.get("page") as NavigationMenu | null) ?? NavigationMenu.MENU;
  }, [params]);

  useEffect(() => {
    if (!Object.values(NavigationMenu).includes(currentPage)) return;

  }, [currentPage]);

  if (!Object.values(NavigationMenu).includes(currentPage)) return <NotFoundPage />;
  return Screens.find((screen) => screen.id === currentPage)!.component;
}
