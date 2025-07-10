"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

const MainNavbar = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const params = useParams();
  const pathname = usePathname();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/banners`,
      label: "Banners",
      active: pathname === `/${params.storeId}/banners`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-slate-500",
            route.active ? "text-muted-foreground" : "text-black"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNavbar;
