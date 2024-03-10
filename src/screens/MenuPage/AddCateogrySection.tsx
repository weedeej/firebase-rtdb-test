import { db } from "@/firebaseConfig";
import { StoreState } from "@/redux/store";
import { showToast } from "@/utils";
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, colors } from "@mui/material";
import { push, ref, set, remove } from "firebase/database";
import { useState } from "react";
import { useSelector } from "react-redux";

export function AddCategorySection() {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddCategoryLoading, setIsAddCategoryLoading] = useState(false);
  const [isDeleteCategoryLoading, setIsDeleteCategoryLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = useSelector((state: StoreState) => state.categories.list);

  function onCategoryCreate() {
    if (categories?.map((cat) => cat.name).includes(newCategoryName)) return showToast("Category already exists", "error");
    const categoryRef = ref(db, "categories");
    const key = push(categoryRef).key;
    setIsAddCategoryLoading(true);
    set(ref(db, `categories/${key}`), {
      id: key,
      name: newCategoryName
    })
      .then(() => {
        showToast(`Category ${newCategoryName} has been added`, "success");
        setNewCategoryName("");
      })
      .catch((e) => {
        showToast(`An Error has occured. Please contact developer: ${e.code}`, "error");
      })
      .finally(() => {
        setIsAddCategoryLoading(false);
      })
  }

  function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    onCategoryCreate();
  }

  function onCategoryDelete() {
    if (!categories?.map((cat) => cat.id).includes(selectedCategory)) return showToast("Category does not exist", "error");
    const categoryRef = ref(db, `categories/${selectedCategory}`);
    setIsDeleteCategoryLoading(true);
    remove(categoryRef)
      .then(() => {
        showToast(`Category ${newCategoryName} has been deleted`, "success");
        setSelectedCategory("");
      })
      .catch((e) => {
        showToast(`An Error has occured. Please contact developer: ${e.code}`, "error");
      })
      .finally(() => {
        setIsDeleteCategoryLoading(false);
      })
  }
  return (
    <Stack gap={2}>
      <Stack flex={1} p={2} gap={1} borderRadius={2} sx={{ backgroundColor: colors.grey[900] }} justifyContent="center" minWidth={500} width="fit-content">
        <Typography variant="h6">
          Create Category
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(() => e.target.value)}
            InputProps={{
              endAdornment: <Button color="inherit" variant="contained" size="small" onClick={onCategoryCreate} disabled={isAddCategoryLoading}>
                {isAddCategoryLoading ? <CircularProgress color="inherit" size={24} /> : "Add"}
              </Button>,
            }}
            fullWidth
          />
        </form>
      </Stack>
      <Stack flex={1} p={2} gap={1} borderRadius={2} sx={{ backgroundColor: colors.grey[900] }} justifyContent="center" minWidth={500} width="fit-content">
        <Typography variant="h6">
          Delete Category
        </Typography>
        <Stack direction="row" width="100%" gap={1} alignItems="center">
          <FormControl sx={{ minWidth: 128, width: "100%" }}>
            <InputLabel id="categories-label" sx={{ color: "#FFF" }}>Category</InputLabel>
            <Select labelId="categories-label" label="Category" defaultValue="Categories" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} fullWidth>
              {
                categories?.map((cat) => <MenuItem key={`cat_select_${cat.id}`} value={cat.id}>{cat.name}</MenuItem>)
              }
            </Select>
          </FormControl>
          <Box>
            <Button color="error" size="small" variant="contained" onClick={onCategoryDelete} disabled={isDeleteCategoryLoading}>
              {isDeleteCategoryLoading ? <CircularProgress color="inherit" size={24} /> : "Delete"}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}