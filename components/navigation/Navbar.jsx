"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { MyLogo } from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Search from "./Search";

const special = nav.map((n) => n.href).filter((h) => h.startsWith("/docs/"));
const isActive = (path, href) => {
  if (href === "/") return path === "/";
  if (href === "/docs") return path.startsWith("/docs") && !special.includes(path);
  return path === href || path.startsWith(href + "/");
};

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const linkCls = (href) =>
    isActive(path, href)
      ? "bg-navy-50 font-semibold text-navy-800 dark:bg-white/10 dark:text-amber-300"
      : "text-slate-600 hover:text-navy-800 dark:text-slate-100 dark:hover:text-white";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-navy-950/80">
      {/* Top accent line */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/70 to-transparent dark:via-amber-400/60"
      />

      <div className="mx-auto flex h-16 max-w-[90rem] items-center gap-3 px-4 sm:px-6">
        {/* ── Brand ───────────────────────────────────────── */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2.5 rounded-lg px-2 py-1.5 font-semibold text-navy-800 transition-colors hover:bg-slate-100/70 dark:text-white dark:hover:bg-white/5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400/20 to-amber-600/10 ring-1 ring-amber-400/30 transition-transform duration-200 group-hover:scale-105">
            <MyLogo size={26} />
          </span>
          <span className="hidden text-sm tracking-tight sm:inline">
            {site.shortTitle}
          </span>
        </Link>

        {/* ── Desktop nav ─────────────────────────────────── */}
        <nav
          aria-label="Main"
          className="ml-4 hidden flex-1 items-center gap-1 lg:flex"
        >
          {nav.map((n) => {
            const active = isActive(path, n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`group relative rounded-lg px-3 py-2 text-sm transition-all duration-200 ${linkCls(
                  n.href
                )}`}
              >
                {n.label}
                {/* Active underline */}
                <span
                  aria-hidden
                  className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-amber-400 transition-all duration-300 ${
                    active
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* ── Right side controls ─────────────────────────── */}
        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          <Search />
          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="rounded-lg border border-transparent p-2 text-slate-600 transition-all duration-200 hover:border-slate-200 hover:bg-slate-100 dark:text-slate-100 dark:hover:border-white/10 dark:hover:bg-white/5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="relative block h-5 w-5">
              <Menu
                size={20}
                aria-hidden
                className={`absolute inset-0 transition-all duration-200 ${
                  open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />
              <X
                size={20}
                aria-hidden
                className={`absolute inset-0 transition-all duration-200 ${
                  open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-out dark:border-white/10 dark:bg-navy-950/95 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="px-4 py-3 sm:px-6">
          <ul className="grid gap-1">
            {nav.map((n) => {
              const active = isActive(path, n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 ${
                      active
                        ? "bg-navy-50 font-semibold text-navy-800 dark:bg-white/10 dark:text-amber-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-navy-800 dark:text-slate-100 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        active
                          ? "bg-amber-400"
                          : "bg-slate-300 group-hover:bg-amber-400/60 dark:bg-slate-600"
                      }`}
                    />
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}