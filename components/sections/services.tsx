import Link from "next/link";
import { ServiceCards } from "@/components/sections/service-cards";
import { getServicesContent } from "@/lib/services";

export function Services() {
  const content = getServicesContent();
  const lines = content.headline.split("\n").filter(Boolean);

  return (
    <section
      id={content.id}
      aria-labelledby="services-heading"
      className="scroll-mt-20 border-b border-slate-200 bg-white text-slate-950"
    >
      <div className="md:grid md:grid-cols-2">
        <div className="border-b border-slate-200 md:border-r md:border-b-0">
          <div className="flex flex-col gap-8 px-5 py-14 sm:px-8 sm:py-16 md:sticky md:top-20 md:gap-10 md:px-10 md:py-16 lg:px-12">
            <div className="max-w-md">
              <h2
                id="services-heading"
                className="text-[2rem] font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem]"
              >
                {lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-600 sm:text-lg">
                {content.body}
              </p>
            </div>

            <Link
              href={content.cta.href}
              className="inline-flex min-h-11 w-fit items-center text-sm font-medium text-slate-950 cursor-pointer underline decoration-slate-950/30 decoration-1 underline-offset-4 transition-colors duration-200 hover:decoration-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
            >
              {content.cta.label}
              <span aria-hidden="true">&nbsp;→</span>
            </Link>
          </div>
        </div>

        <ServiceCards items={content.items} />
      </div>
    </section>
  );
}
