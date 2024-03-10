import { Stack, Typography, colors } from "@mui/material";

export function AddCategorySection() {

  function onCreate(e?: React.FormEvent) {
    e?.preventDefault();

  }
  return (
    <Stack  p={2} gap={1} borderRadius={2} sx={{ backgroundColor: colors.grey[900] }} minWidth={500} width="fit-content">
    <Typography variant="h6">
      Create Category
    </Typography>
    <form onSubmit={onCreate}>

    </form>
    </Stack>
  )
}