"use client";

import { Stack, Typography, colors } from "@mui/material";

export function Header() {
  return (
    <Stack direction="row" p={2} borderRadius={2} bgcolor={colors.grey[900]}>
      <Typography variant="h3" component="span">
        MENU
      </Typography>
    </Stack>
  )
}