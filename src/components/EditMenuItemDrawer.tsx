import { Drawer, Stack } from "@mui/material";

type EditMenuItemDrawerProps = {
  menuItemId: string;
  onClose: () => void;
}

export function EditMenuItemDrawer(props: EditMenuItemDrawerProps) {
  const {menuItemId, onClose} = props;
  return (
    <Drawer open={!!menuItemId} onClose={onClose} anchor="right" >
      <Stack p={2}>
        
      </Stack>
    </Drawer>
  )
}