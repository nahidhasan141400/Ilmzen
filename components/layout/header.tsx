import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { getHeroContent } from "@/lib/hero";
import { navLinks, siteName } from "@/lib/site";

const headerBlurLayers = [
  {
    blur: "1px",
    mask: "linear-gradient(0deg, rgba(255,255,255,0) 0%, #fff 16.67%, #fff 33.33%, rgba(255,255,255,0) 50%)",
  },
  {
    blur: "2px",
    mask: "linear-gradient(0deg, rgba(255,255,255,0) 16.67%, #fff 33.33%, #fff 50%, rgba(255,255,255,0) 66.67%)",
  },
  {
    blur: "4px",
    mask: "linear-gradient(0deg, rgba(255,255,255,0) 33.33%, #fff 50%, #fff 66.67%, rgba(255,255,255,0) 83.33%)",
  },
  {
    blur: "8px",
    mask: "linear-gradient(0deg, rgba(255,255,255,0) 50%, #fff 66.67%, #fff 83.33%, rgba(255,255,255,0) 100%)",
  },
  {
    blur: "16px",
    mask: "linear-gradient(0deg, rgba(255,255,255,0) 66.67%, #fff 83.33%, #fff 100%, rgba(255,255,255,0) 116.67%)",
  },
] as const;

export function Header() {
  const hero = getHeroContent();

  return (
    <header className="fixed top-0 z-40 w-full">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 overflow-hidden"
        aria-hidden="true"
      >
        {headerBlurLayers.map((layer) => (
          <div
            key={layer.blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${layer.blur})`,
              WebkitBackdropFilter: `blur(${layer.blur})`,
              maskImage: layer.mask,
              WebkitMaskImage: layer.mask,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-20 w-full items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2.5 text-base font-semibold tracking-tight text-charcoal cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
        >
          <Image
            src="/images/ilmzen-logo.png"
            alt={siteName}
            width={2000}
            height={479}
            priority
            className="h-7 w-auto sm:h-6"
          />
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav aria-label="Primary" className="hidden md:block">
            <NavList className="flex items-center gap-1" />
          </nav>

          <Link
            href={hero.cta.href}
            className="inline-flex min-h-11 items-center rounded-full bg-charcoal px-5 text-sm font-medium text-white cursor-pointer transition-colors duration-200 hover:bg-charcoal/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
          >
            {hero.cta.label}
          </Link>

          <MobileMenu email="hello@ilmzen.com" year={new Date().getFullYear()} />
        </div>
      </div>
    </header>
  );
}

function NavList({ className }: { className: string }) {
  return (
    <ul className={className}>
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            aria-current={link.href === "/" ? "page" : undefined}
            className="inline-flex min-h-11 items-center text-sm font-medium text-charcoal/80 cursor-pointer transition-colors duration-200 hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal md:px-3"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
