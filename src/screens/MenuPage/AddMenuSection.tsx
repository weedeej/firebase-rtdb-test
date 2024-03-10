"use client";

import { db, storage } from "@/firebaseConfig";
import { useForm } from "@/hooks";
import { Category, Menu } from "@/types"
import { showToast } from "@/utils";
import { Add, CloudUploadRounded } from "@mui/icons-material";
import { Box, Button, Chip, CircularProgress, Collapse, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField, Typography, colors, styled } from "@mui/material";
import { ref, push, set } from "firebase/database";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";

type AddMenuSectionProps = {
  menuList: Menu[] | null;
  categories: Category[] | null
}

export function AddMenuSection(props: AddMenuSectionProps) {
  const { menuList, categories } = props;
  const [imageThumbnail, setImageThumbnail] = useState<string>("");
  const [currentImageFile, setCurrentImageFile] = useState<File | null>(null);
  const [newOption, setNewOption] = useState("");
  const [isAddItemLoading, setIsAddItemLoading] = useState(false);

  const [formData, updateForm, resetForm, explicitUpdate] = useForm<Menu>({
    id: "",
    name: "",
    categoryId: "",
    options: [],
    price: 1,
    stock: 1,
    cost: 1,
    imagePath: "",
    dateAddedMs: 0
  });

  async function onSave() {
    if (!currentImageFile) return showToast("Image can't be empty", "error");
    if (!formData.categoryId) return showToast("Please Select a category", "error");
    const itemRef = ref(db, "menu");
    const key = push(itemRef).key;
    setIsAddItemLoading(true);
    uploadImage(key!).then((imageUploadRes) => {
      set(ref(db, `menu/${key}`), { ...formData, id: key, imageThumbnail: imageUploadRes.ref.fullPath, dateAddedMs: Date.now() })
        .then(() => {
          showToast(`${formData.name} has been added to list`, "success");
          resetForm();
          setCurrentImageFile(null);
          setImageThumbnail("");
        })
        .catch((e) => {
          showToast(`An Error has occured. Please contact developer: ${e.code}`, "error");
        })
        .finally(() => {
          setIsAddItemLoading(false);
        })
    }).catch((e) => {
      showToast(`An Error has occured. Please contact developer: ${e.code}`, "error");
      setIsAddItemLoading(false);
    });
  }

  function uploadImage(key: string) {
    const imageFileName = currentImageFile!.name;
    const fileExtension = imageFileName.split('.').pop();
    const imageRef = storageRef(storage, `menu/${key}.${fileExtension}`);
    return uploadBytes(imageRef, currentImageFile!);
  }

  function onPriceUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;

    explicitUpdate("cost", value * (formData.stock < 1 ? 1 : formData.stock));
    updateForm(e);
  }

  function onStockUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;

    explicitUpdate("cost", formData.price * value);
    updateForm(e);
  }

  function onImageUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length < 1) {
      setCurrentImageFile(null);
      return setImageThumbnail("");
    }
    const file = files[0];
    setCurrentImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageThumbnail((e.target?.result as string | undefined) ?? "");
    };
    reader.readAsDataURL(file);
  }

  function onOptionDelete(id: string) {
    explicitUpdate("options", formData.options.filter((opt) => opt.id !== id));
  }

  function onOptionAdd() {
    if (!newOption) return;
    const itemRef = ref(db, "keygen");
    const key = push(itemRef).key;
    const options = [...formData.options];
    options.push({ id: key!, name: newOption });
    explicitUpdate("options", options);
    setNewOption("");
  }

  if (!menuList || !categories) return <></>;
  return (
    <Stack p={2} gap={1} borderRadius={2} sx={{ backgroundColor: colors.grey[900] }} minWidth={500} width="fit-content">
      <Typography variant="h6">
        Add a dish
      </Typography>
      <Stack direction="row" gap={1} alignItems="center" width="100%">
        <TextField value={formData.name} name="name" variant="outlined" placeholder="Name" onChange={updateForm} fullWidth />
        <TextField value={formData.price} name="price" type="number" variant="outlined" placeholder="Price" inputMode="numeric" inputProps={{ min: 1 }} onChange={onPriceUpdate} />
      </Stack>
      <Stack direction="row" gap={2} alignItems="center">
        <Box>
          <TextField value={formData.stock} inputMode="numeric" inputProps={{ min: 1 }} name="stock" type="number" variant="outlined" placeholder="Stock" onChange={onStockUpdate} sx={{ maxWidth: 88 }} />
        </Box>
        <FormControl sx={{minWidth: 128}}>
          <InputLabel id="categories-label" sx={{color: "#FFF"}}>Category</InputLabel>
          <Select labelId="categories-label" label="Category" defaultValue="Categories" value={formData.categoryId} onChange={(e) => explicitUpdate("categoryId", e.target.value)}>
            {
              categories.map((cat) => <MenuItem key={`cat_select_${cat.id}`} value={cat.id}>{cat.name}</MenuItem>)
            }
          </Select>
        </FormControl>
        <Typography variant="body1">
          Cost: {formData.cost}
        </Typography>
      </Stack>
      <Stack gap={1}>
        <TextField
          placeholder="Options"
          value={newOption}
          onChange={(e) => setNewOption(() => e.target.value)}
          InputProps={{
            endAdornment: <Button color="inherit" variant="contained" size="small" onClick={onOptionAdd}>Add</Button>,
          }}
        />
        <Stack direction="row" gap={1} alignItems="center">
          {
            formData.options.map((opt) => <Chip key={`prev_${opt.id}`} label={opt.name} onDelete={() => onOptionDelete(opt.id)} />)
          }
        </Stack>
      </Stack>
      <Stack gap={1} alignItems="center">
        {
          imageThumbnail && (
            <Box height={150} width={150} sx={{ borderRadius: 2, overflow: "hidden", position: "relative" }}>
              <Image src={imageThumbnail} fill style={{ objectFit: "cover" }} unoptimized alt="image preview" />
            </Box>
          )
        }
        <Button
          component="label"
          role={undefined}
          variant="contained"
          color="inherit"
          tabIndex={-1}
          startIcon={<CloudUploadRounded />}
          fullWidth
        >
          {imageThumbnail ? "Change Image" : "Upload Image"}
          <VisuallyHiddenInput onChange={onImageUpdate} type="file" />
        </Button>
      </Stack>
      <Button onClick={onSave} variant="text" sx={{ backgroundColor: colors.grey[900], color: "inherit" }} startIcon={isAddItemLoading ? <CircularProgress /> : <Add />} disabled={isAddItemLoading}>
        <Typography color="inherit">
          Add Item
        </Typography>
      </Button>
    </Stack>
  )
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});