import Image from "next/image";
import Link from "next/link";
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
          className="inline-flex min-h-11 items-center gap-2.5 text-base font-semibold tracking-tight text-slate-950 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
        >
          <Image
            src="/images/easysoft-logo.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
          />
          {siteName}
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav aria-label="Primary" className="hidden md:block">
            <NavList className="flex items-center gap-1" />
          </nav>

          <Link
            href={hero.cta.href}
            className="inline-flex min-h-11 items-center rounded-full bg-slate-950 px-5 text-sm font-medium text-white cursor-pointer transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
          >
            {hero.cta.label}
          </Link>

          <details className="group md:hidden">
            <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center text-slate-950 [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
              <span className="sr-only">Menu</span>
              <MenuIcon className="group-open:hidden" />
              <CloseIcon className="hidden group-open:block" />
            </summary>

            <nav
              aria-label="Mobile"
              className="absolute left-0 right-0 top-20 z-20 border-b border-slate-950/10 bg-white/80 backdrop-blur-xl"
            >
              <NavList className="flex flex-col px-5 py-3 sm:px-8" />
            </nav>
          </details>
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
            className="inline-flex min-h-11 items-center text-sm font-medium text-slate-800 cursor-pointer transition-colors duration-200 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 md:px-3"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MenuIcon({ className = "" }: { className?: string }) {
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

function CloseIcon({ className = "" }: { className?: string }) {
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
