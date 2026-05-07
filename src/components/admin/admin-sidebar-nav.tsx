"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
  href: string;
  label: string;
};

type AdminSidebarNavProps = {
  items: Item[];
};

export function AdminSidebarNav({ items }: AdminSidebarNavProps) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));
        return (
          <Link key={item.href} href={item.href} className={isActive ? "admin-nav__link admin-nav__link--active" : "admin-nav__link"}>
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
