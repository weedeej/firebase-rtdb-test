import { NavigationMenu } from "@/enums";
import { InventoryRounded, MenuRounded, ReceiptLongRounded, SellRounded } from "@mui/icons-material";
import { MenuPage } from "./MenuPage";
import { SalesPage } from "./SalesPage";
import { InvoicingPage } from "./InvoicingPage";
import { InventoryPage } from "./InventoryPage";

export default [
  {
    id: NavigationMenu.MENU,
    title: "MENU",
    icon: <MenuRounded/>,
    component: <MenuPage />
  },
  {
    id: NavigationMenu.SALES,
    title: "SALES",
    icon: <SellRounded/>,
    component: <SalesPage />
  },
  {
    id: NavigationMenu.INVOICING,
    title: "INVOICING",
    icon: <ReceiptLongRounded/>,
    component: <InvoicingPage />
  },
  {
    id: NavigationMenu.INVENTORY,
    title: "INVENTORY",
    icon: <InventoryRounded/>,
    component: <InventoryPage />
  }
]