import Image from "next/image";
import { getAboutContent } from "@/lib/about";

export function About() {
  const content = getAboutContent();
  const lines = content.headline.split("\n").filter(Boolean);
  const [leadImage, ...sideImages] = content.images;

  return (
    <section
      id={content.id}
      aria-labelledby="about-heading"
      className="scroll-mt-20 bg-white text-charcoal"
    >
      <div className="mx-auto max-w-7xl px-5 pt-32 pb-20 sm:px-8 sm:pt-36 sm:pb-28 lg:px-10 lg:pt-40 lg:pb-32">
        <p className="text-sm font-medium tracking-[0.16em] text-charcoal/65 uppercase">
          {content.eyebrow}
        </p>

        <div className="mt-6 grid items-end gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16">
          <h1
            id="about-heading"
            className="text-[2.15rem] font-bold leading-[1.08] tracking-tight text-charcoal sm:text-6xl lg:text-7xl"
          >
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-sm text-base leading-relaxed text-charcoal/65 sm:text-lg md:pb-2">
            {content.lead}
          </p>
        </div>

        <div className="mt-10 max-w-2xl space-y-5">
          {content.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-charcoal/65 sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {leadImage ? (
          <div className="mt-16 grid gap-3 sm:mt-20 sm:grid-cols-12 sm:gap-4">
            <figure className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] bg-cool sm:col-span-7 sm:aspect-5/4 sm:rounded-[2.25rem]">
              <Image
                src={leadImage.src}
                alt={leadImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </figure>

            <div className="grid gap-3 sm:col-span-5 sm:gap-4">
              {sideImages.map((image) => (
                <figure
                  key={image.src}
                  className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] bg-cool sm:rounded-[2.25rem]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
