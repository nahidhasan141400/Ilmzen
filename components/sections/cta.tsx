import Link from "next/link";
import { getCtaContent } from "@/lib/cta";

export function Cta() {
  const content = getCtaContent();
  const lines = content.headline.split("\n").filter(Boolean);

  return (
    <section
      id={content.id}
      className="scroll-mt-24 bg-white text-charcoal"
    >
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36 lg:px-10 lg:py-44">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] md:items-end md:gap-16 lg:gap-24">
          <h2 className="max-w-4xl text-[2.15rem] font-bold leading-[1.08] tracking-tight text-charcoal sm:text-6xl lg:text-[4.5rem]">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <div className="max-w-md pb-1 md:justify-self-start">
            <p className="text-base leading-relaxed text-charcoal/65 sm:text-lg">
              {content.body}
            </p>

            <CtaAction href={content.cta.href} label={content.cta.label} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaAction({ href, label }: { href: string; label: string }) {
  const className =
    "mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-charcoal px-5 text-sm font-medium text-white cursor-pointer transition-colors duration-200 hover:bg-charcoal/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal";

  const content = (
    <>
      {label}
      <ArrowIcon />
    </>
  );

  if (isDocumentLink(href)) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}

function isDocumentLink(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
