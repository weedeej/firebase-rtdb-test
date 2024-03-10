"use client";

import { storage } from "@/firebaseConfig";
import { StoreState } from "@/redux/store";
import { Menu } from "@/types"
import { Box, Button, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type MenuItemCardProps = {
  item: Menu;
  onEdit: () => void;
  onDelete: () => void;
}

export function MenuItemCard(props: MenuItemCardProps) {
  const { item , onEdit, onDelete} = props;
  const [itemImageUrl, setItemImageUrl] = useState("");
  const categories = useSelector((state: StoreState) => state.categories.list);

  useEffect(() => {
    const pathReference = ref(storage, item.imageThumbnail);
    getDownloadURL(pathReference).then((res) => {
      setItemImageUrl(res);
    });
  }, []);

  function getCategoryFromId(id: string) {
    return categories?.find((cat) => cat.id === id);
  }

  return (
    <Stack maxWidth={250} minHeight={360}>
      <Typography variant="subtitle2" color="GrayText">
        {getCategoryFromId(item.categoryId)?.name}
      </Typography>
      <Box position="relative" width={250} height={250} borderRadius={2} overflow="hidden">
        {
          itemImageUrl ?
            <Image src={itemImageUrl} alt="Item Image" objectFit="cover" unoptimized fill /> :
            <Skeleton sx={{ bgcolor: 'grey.400' }} variant="rounded" animation="pulse" width={250} height={250} />
        }
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={700} color="text.secondary">
          {item.name}
        </Typography>
        <Typography color="text.secondary">
          {Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(item.price)}
        </Typography>
      </Stack>
      <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="space-between" alignItems="center">
        {
          item.options.map((opt) => (<Chip sx={{ color: "GrayText" }} key={`item_opt_${opt.id}`} label={opt.name} />))
        }
      </Stack>
      <Stack direction="row" gap={1} py={1}>
        <Button onClick={onEdit} color="inherit" variant="outlined" fullWidth>
          Edit
        </Button>
        <Button onClick={onDelete} color="error" variant="outlined" fullWidth>
          Delete
        </Button>
      </Stack>
    </Stack>
  )
}

// TODO; Card fn