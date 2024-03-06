import { InventoryRounded, MenuBookRounded, ReceiptLongRounded, SellRounded } from "@mui/icons-material";
import { Button, Stack, Typography, colors } from "@mui/material";

export function Sidebar() {
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
          <Button sx={{py: 2, px: 4, color: "inherit", display: "flex", flexDirection: "row", justifyContent: "start"}} startIcon={<MenuBookRounded />}>
            <Typography variant="h5" fontWeight={700} component="span">
              MENU
            </Typography>
          </Button>
          
          <Button sx={{py: 2, px: 4, color: "inherit", display: "flex", flexDirection: "row", justifyContent: "start"}} startIcon={<SellRounded />}>
            <Typography variant="h5" fontWeight={700} component="span">
              SALES
            </Typography>
          </Button>
          
          <Button sx={{py: 2, px: 4, color: "inherit", display: "flex", flexDirection: "row", justifyContent: "start"}} startIcon={<ReceiptLongRounded />}>
            <Typography variant="h5" fontWeight={700} component="span">
              INVOICING
            </Typography>
          </Button>
          
          <Button sx={{py: 2, px: 4, color: "inherit", display: "flex", flexDirection: "row", justifyContent: "start"}} startIcon={<InventoryRounded />}>
            <Typography variant="h5" fontWeight={700} component="span">
              INVENTORY
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}