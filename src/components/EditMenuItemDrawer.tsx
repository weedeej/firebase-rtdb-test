"use client";

import { db, storage } from "@/firebaseConfig";
import { useForm } from "@/hooks";
import { StoreState } from "@/redux/store";
import { Menu } from "@/types";
import { showToast } from "@/utils";
import { CloudUploadRounded } from "@mui/icons-material";
import { Box, Button, Chip, CircularProgress, Divider, Drawer, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { push, ref, set, update } from "firebase/database";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { VisuallyHiddenInput } from ".";
import Image from "next/image";
import { defaultMenuItem } from "@/constants";

type EditMenuItemDrawerProps = {
  menuItemId: string;
  onClose: () => void;
}

export function EditMenuItemDrawer(props: EditMenuItemDrawerProps) {
  const { menuItemId, onClose } = props;
  const menuList = useSelector((state: StoreState) => state.menus.list);
  const categories = useSelector((state: StoreState) => state.categories.list);
  const [imageThumbnail, setImageThumbnail] = useState<string>("");
  const [currentImageFile, setCurrentImageFile] = useState<File | null>(null);
  const [newOption, setNewOption] = useState("");
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [oldItemImage, setOldItemImage] = useState("");

  const [formData, updateForm, resetForm, explicitUpdate, setFormData] = useForm<Menu>(defaultMenuItem);

  const menuItem = useMemo(() => {
    if (!menuItemId) return null;
    const item = menuList?.find((menuItem) => menuItem.id === menuItemId) ?? null;
    item && setFormData(item);
    return item;
  }, [menuItemId, menuList]);

  useEffect(() => {
    if (!menuItem || !menuItemId) {
      setOldItemImage("");
      setImageThumbnail("");
      setCurrentImageFile(null);
      return;
    }
    const pathReference = storageRef(storage, menuItem.imageThumbnail);
    getDownloadURL(pathReference).then((res) => {
      setOldItemImage(res);
    });
  }, [menuItem]);

  async function onSave() {
    if (!currentImageFile && !oldItemImage) return showToast("Image can't be empty", "error");
    if (!formData.categoryId) return showToast("Please Select a category", "error");
    if (!menuItem) return showToast("You can't update a non-existing item", "error");

    setIsSaveLoading(true);
    uploadImage(menuItem.id).then((imageUploadRes) => {
      update(ref(db, `menu/${menuItem.id}`), { ...formData, imageThumbnail: imageUploadRes.ref.fullPath, dateAddedMs: Date.now() })
        .then(() => {
          showToast(`${formData.name} has been updated`, "success");
          setCurrentImageFile(null);
          setImageThumbnail("");
        })
        .catch((e) => {
          showToast(`An Error has occured. Please contact developer: ${e.code}`, "error");
        })
        .finally(() => {
          setIsSaveLoading(false);
        })
    }).catch((e) => {
      showToast(`An Error has occured. Please contact developer: ${e.code}`, "error");
      setIsSaveLoading(false);
    });
  }

  async function uploadImage(key: string) {
    if (!currentImageFile) return {
      ref: {
        fullPath: menuItem!.imageThumbnail
      }
    }
    const imageFileName = currentImageFile!.name;
    const fileExtension = imageFileName.split('.').pop();
    const imageRef = storageRef(storage, `menu/${key}.${fileExtension}`);
    return await uploadBytes(imageRef, currentImageFile!);
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

  function onOptionAdd() {
    if (!newOption) return;
    let opt = newOption
    if (opt.endsWith(",")) opt = opt.slice(0, -1);
    const itemRef = ref(db, "keygen");
    const key = push(itemRef).key;
    const options = [...formData.options];
    options.push({ id: key!, name: opt });
    explicitUpdate("options", options);
    setNewOption("");
  }

  function onOptionDelete(id: string) {
    explicitUpdate("options", formData.options.filter((opt) => opt.id !== id));
  }

  return (
    <Drawer open={!!menuItemId} onClose={onClose} anchor="right" >
      <Stack gap={2} divider={<Divider />} height="100%" p={2} width={350}>
        {
          !menuItem ? (
            <Stack flex={1} justifyContent="center" alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (<>
            <Typography variant="h4" color="text.secondary">
              Editing <b>{menuItem?.name}  </b>
            </Typography>
            <Stack flex={1} justifyContent="space-between" gap={2}>
              <Stack gap={2}>
                <TextField value={formData.name} inputProps={{ style: { color: "#000" } }} name="name" label="Name" onChange={updateForm} />
                <FormControl sx={{ minWidth: 128 }}>
                  <InputLabel id="categories-label">Category</InputLabel>
                  <Select sx={{ color: "#000" }} labelId="categories-label" label="Category" defaultValue="Categories" value={formData.categoryId} onChange={(e) => explicitUpdate("categoryId", e.target.value)}>
                    {
                      categories?.map((cat) => <MenuItem key={`cat_select_${cat.id}`} value={cat.id}>{cat.name}</MenuItem>)
                    }
                  </Select>
                </FormControl>
                <Stack direction="row" gap={2}>
                  <TextField
                    value={formData.price < 1 ? "" : formData.price}
                    name="price"
                    type="number"
                    variant="outlined"
                    placeholder="Price"
                    inputMode="numeric"
                    inputProps={{ min: 1, style: { color: "#000" } }}
                    onChange={onPriceUpdate}
                  />
                  <TextField
                    value={formData.stock < 1 ? "" : formData.stock}
                    inputMode="numeric"
                    inputProps={{ min: 1, style: { color: "#000" } }}
                    name="stock"
                    type="number"
                    variant="outlined"
                    placeholder="Stock"
                    onChange={onStockUpdate}
                  />
                </Stack>
                <Stack gap={1}>
                  <TextField
                    inputProps={{ style: { color: "#000" } }}
                    placeholder="Options"
                    value={newOption}
                    onChange={(e) => setNewOption(() => e.target.value)}
                    onKeyUp={(e) => {
                      if (!newOption || newOption.length < 2) return;
                      if (e.code === "Comma") onOptionAdd();
                    }}
                    InputProps={{
                      endAdornment: <Button color="inherit" variant="contained" size="small" onClick={onOptionAdd}>Add</Button>,
                    }}
                  />
                  <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
                    {
                      formData.options.map((opt) => <Chip key={`prev_${opt.id}`} color="info" label={opt.name} onDelete={() => onOptionDelete(opt.id)} />)
                    }
                  </Stack>
                </Stack>
                <Stack gap={1} alignItems="center">
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
                  {
                    (imageThumbnail || oldItemImage) && (
                      <Stack direction="row" justifyContent="center" height={150} width={150} sx={{ borderRadius: 2, overflow: "hidden", position: "relative" }}>
                        <Image src={(imageThumbnail === "") ? oldItemImage : imageThumbnail} fill style={{ objectFit: "cover" }} unoptimized alt="image preview" />
                      </Stack>
                    )
                  }
                </Stack>
              </Stack>
              <Stack gap={0} width="100%">
                <Typography variant="body1" color="text.secondary">
                  Cost: {formData.cost}
                </Typography>
                <Stack direction="row" gap={2} justifyContent="space-between">
                  <Button onClick={onClose} variant="outlined" fullWidth>
                    Cancel
                  </Button>
                  <Button onClick={onSave} disabled={isSaveLoading} variant="contained" color="inherit" fullWidth>
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </>)
        }
      </Stack>
    </Drawer>
  )
}