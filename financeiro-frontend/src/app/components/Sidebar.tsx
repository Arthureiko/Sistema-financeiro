"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const links = [
  { href: "/", label: "Início" },
  { href: "/pages/categorias", label: "Categorias" },
  { href: "/pages/contas-a-pagar", label: "Contas a Pagar" },
  { href: "/pages/contas-a-receber", label: "Contas a Receber" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 fixed top-0 left-0 bottom-0 bg-[#221C35] text-white flex flex-col ">
      <header className="h-16 p-4">
        <h1 className="text-xl font-bold">Sistema Financeiro</h1>
      </header>
      <nav className="flex flex-col gap-2 ml-2">
        {links.map(({ href, label }) => {
          const isActive =
            href === "/" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "py-2 px-3 rounded hover:bg-[#2f264a] transition-colors",
                isActive ? "bg-[#2f264a]" : ""
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
