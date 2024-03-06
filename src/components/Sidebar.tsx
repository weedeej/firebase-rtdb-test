"use client";

import { Button, Stack, Typography, colors } from "@mui/material";
import Screens from "@/screens";
import { NavigationMenu } from "@/enums";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
export function Sidebar() {
  const params = useSearchParams();
  const currentPage = useMemo(() => {
    return (params.get("page") as NavigationMenu | null) ?? NavigationMenu.MENU;
  }, [params]);
  
  const router = useRouter();

  function changeScreen(screen: NavigationMenu) {
    router.push(`/?page=${screen}`);
  }

  return (
    <Stack height="100%" justifyContent="space-between" p={2} borderRadius={2} width={400} bgcolor={colors.grey[900]}>
      <Stack gap={2}>
        <Stack gap={0} p={2} bgcolor={colors.grey[700]} borderRadius={2} width="100%">
          <Typography variant="h4" fontWeight={700}>
            D{"'"}RESTO
          </Typography>
          <Typography variant="subtitle2">
            47 Mabuhay St, Malusak Road, Sta Rosa, Laguna, PH
          </Typography>
        </Stack>
        <Stack gap={1}>
          {
            Screens.map((screen) => (
              <Button
                key={`sidebar_nav_${screen.id}`}
                onClick={currentPage === screen.id ? undefined : () => changeScreen(screen.id)}
                sx={{
                  py: 2,
                  px: 4,
                  color: "inherit",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  transform: currentPage === screen.id ? "scale(1.1)" : "unset",
                  "&:hover": {
                    transition: "all 0.3s ease-in-out",
                    transform: "scale(1.1)",
                  }
                }}
                startIcon={screen.icon}>
                <Typography variant="h5" fontWeight={700} component="span">
                  {screen.title}
                </Typography>
              </Button>
            ))
          }
        </Stack>
      </Stack>
    </Stack>
  )
}