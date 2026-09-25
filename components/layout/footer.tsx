import Link from "next/link";
import { navLinks, siteName } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-cool bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold tracking-tight text-charcoal">
          {siteName}
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-charcoal/70 cursor-pointer transition-colors duration-200 hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-charcoal/55">
          © {year} {siteName}
        </p>
      </div>
    </footer>
  );
}
