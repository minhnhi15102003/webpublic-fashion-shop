import { MenuItem } from "@/types/MenuItem";

export const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/product-list" },
  { label: "Product", href: "/product-list" },
  { label: "Order", href: "/order", requiresAuth: true },
  { label: "Blog", href: "/blog" },
];