import Link from "next/link";
import { Github, Linkedin, Twitter, Globe, ArrowUpRight } from "lucide-react";
import { nav, site, socials, previousProjects } from "@/data/site";
import { ZayanLogo } from "@/components/ui/Logo";

const icons = { github: Github, linkedin: Linkedin, twitter: Twitter, globe: Globe };

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-navy-900 text-slate-100">
      {/* Decorative glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 h-64 w-[32rem] rounded-full bg-amber-600/10 blur-3xl"
      />
      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"
      />

      {/* Main grid */}
      <div className="relative mx-auto grid max-w-[90rem] gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {/* ── Brand / Project ─────────────────────────────── */}
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur">
            <ZayanLogo height={44} />
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Project
          </p>
          <div className="space-y-1.5">
            <p className="text-base font-semibold text-white">{site.shortTitle}</p>
            <p className="text-sm leading-relaxed text-slate-100">{site.title}</p>
            <p className="text-sm text-slate-100">{site.author}</p>
          </div>
        </div>

        {/* ── Internship / Connect ────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Internship
          </p>
          <div className="space-y-1.5">
            <p className="text-sm text-slate-100">{site.program}</p>
            <p className="text-sm text-slate-100">{site.organization}</p>
          </div>
          <p className="border-l-2 border-amber-500/70 pl-3 text-sm italic text-amber-200">
            {site.tagline}
          </p>

          <p className="pt-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            Connect
          </p>
          <ul className="flex flex-wrap gap-2.5">
            {socials.map((s) => {
              const Icon = icons[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-500 hover:text-navy-950 hover:shadow-lg hover:shadow-amber-500/30"
                  >
                    <Icon
                      size={18}
                      aria-hidden
                      className="transition-transform duration-200 group-hover:scale-110"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Navigation ──────────────────────────────────── */}
        <nav aria-label="Footer" className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Navigation
          </p>
          <ul className="space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="group inline-flex items-center gap-1.5 text-slate-100 transition-colors duration-150 hover:text-white"
                >
                  <span className="h-px w-0 bg-amber-400 transition-all duration-300 group-hover:w-3" />
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Previous projects (boxed cards) ─────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Previous projects
          </p>

          <ul className="space-y-3">
            {previousProjects.map((p, i) => (
              <li key={p.href}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/70 hover:bg-white/10 hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-300/90">
                      Project {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-0.5 truncate text-sm font-medium text-white group-hover:text-amber-100">
                      {p.label}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="mt-1 shrink-0 text-slate-300 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-300"
                  />
                </a>
              </li>
            ))}
          </ul>

          <p className="border-t border-white/10 pt-3 text-xs leading-relaxed text-slate-300">
            Separate projects, not part of Practical Task #03.
          </p>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-200 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">{site.author}</span>. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            Solution design proposal. Not a deployed system.
          </p>
        </div>
      </div>
    </footer>
  );
}