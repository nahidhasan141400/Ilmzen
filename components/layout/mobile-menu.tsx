"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { isNavCurrent, navLinks, siteName } from "@/lib/site";

type MobileMenuProps = {
  email: string;
  year: number;
};

export function MobileMenu({ email, year }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
      >
        <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
        <MenuIcon className={open ? "hidden" : undefined} />
        <CloseIcon className={open ? undefined : "hidden"} />
      </button>

      <div
        id={menuId}
        inert={!open}
        className={`fixed inset-x-0 top-20 bottom-0 z-30 flex flex-col bg-white transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="px-5 pt-4 sm:px-8">
          <ul>
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className={`border-b border-cool transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${90 + index * 80}ms` : "0ms" }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={
                    isNavCurrent(link.href, pathname) ? "page" : undefined
                  }
                  className="flex min-h-16 items-center text-3xl font-semibold tracking-tight text-charcoal cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <footer
          className={`mt-auto border-t border-cool px-5 py-6 transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: open ? "420ms" : "0ms" }}
        >
          <a
            href={`mailto:${email}`}
            className="inline-flex min-h-11 items-center text-base font-medium text-charcoal cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
          >
            {email}
          </a>
          <p className="mt-1 text-sm text-charcoal/65">
            © {year} {siteName}
          </p>
        </footer>
      </div>
    </div>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
