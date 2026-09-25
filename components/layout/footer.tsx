import Image from "next/image";
import Link from "next/link";
import { getCtaContent } from "@/lib/cta";
import { navLinks, siteName } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  const contact = getCtaContent().cta;

  return (
    <footer className="mt-auto border-t border-cool bg-white text-charcoal">
      <div className="w-full px-5 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pt-28">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)_minmax(0,0.9fr)] md:gap-10 lg:gap-16">
          <div className="max-w-md">
            <p className="text-sm font-medium tracking-[0.16em] text-charcoal/65 uppercase">
              {siteName}
            </p>
            <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              We don&apos;t just build software. We understand your business.
            </p>
            <a
              href={contact.href}
              className="mt-8 inline-flex min-h-11 items-center rounded-full bg-charcoal px-5 text-sm font-medium text-white cursor-pointer transition-colors duration-200 hover:bg-charcoal/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              {contact.label}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-medium tracking-[0.16em] text-charcoal/65 uppercase">
              Explore
            </p>
            <ul className="mt-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-base font-medium text-charcoal/80 cursor-pointer transition-colors duration-200 hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-medium tracking-[0.16em] text-charcoal/65 uppercase">
              Contact
            </p>
            <a
              href={contact.href}
              className="mt-4 inline-flex min-h-11 items-center text-base font-medium text-charcoal/80 cursor-pointer transition-colors duration-200 hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              hello@ilmzen.com
            </a>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <Image
            src="/images/logo-glass.png"
            alt={siteName}
            width={1672}
            height={941}
            sizes="(min-width: 56rem) 56rem, 100vw"
            className="mx-auto h-auto w-full max-w-4xl"
          />
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-cool py-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-charcoal/65">
            © {year} {siteName}
          </p>
          <p className="text-sm text-charcoal/65">Software company</p>
        </div>
      </div>
    </footer>
  );
}
