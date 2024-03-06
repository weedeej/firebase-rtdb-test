"use client";

import { NavigationMenu } from "@/enums";
import screens from "@/screens";
import { NotFoundPage } from "@/screens/NotFoundPage";
import { Stack, Typography, colors } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";

export function Header() {
  const params = useSearchParams();
  const currentPage = useMemo(() => {
    return (params.get("page") as NavigationMenu | null) ?? NavigationMenu.MENU;
  }, [params]);

  const screen = useMemo(() => screens.find((screen) => screen.id === currentPage), [currentPage]);

  return (
    <Stack direction="row" p={2} borderRadius={2} bgcolor={colors.grey[900]}>
      <Stack direction="row" width="100%" justifyContent="space-between" gap={2} alignItems="center">
        <Typography variant="h3" component="span">
          {screen?.title ?? "NOT FOUND"}
        </Typography>
          {screen?.icon}
      </Stack>
    </Stack>
  )
}