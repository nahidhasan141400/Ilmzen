"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavCurrent, navLinks } from "@/lib/site";

export function NavList({ className }: { className: string }) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            aria-current={isNavCurrent(link.href, pathname) ? "page" : undefined}
            className="inline-flex min-h-11 items-center text-sm font-medium text-charcoal/80 cursor-pointer transition-colors duration-200 hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal md:px-3"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
