import { MenuOption } from ".";

export type Menu = {
  id: string;
  categoryId: string;
  options: MenuOption[]
  price: number;
  stock: number;
  cost: number;
  imagePath: string;
}