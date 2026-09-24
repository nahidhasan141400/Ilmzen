import type { HeroClient } from "@/lib/hero";

const marks = [
  <circle key="c" cx="12" cy="12" r="7.5" />,
  <rect key="r" x="5" y="5" width="14" height="14" rx="3" />,
  <polygon key="p" points="12,4 20,19 4,19" />,
  <path key="h" d="M5 12h14M12 5v14" />,
  <path key="x" d="M7 7l10 10M17 7 7 17" />,
  <path key="d" d="M12 4 20 12 12 20 4 12Z" />,
  <path key="a" d="M6 17 12 5l6 12H6Z" />,
  <rect key="o" x="6" y="6" width="12" height="12" rx="6" />,
];

function PlaceholderMark({ index }: { index: number }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {marks[index % marks.length]}
    </svg>
  );
}

function LogoSet({
  clients,
  clone = false,
}: {
  clients: HeroClient[];
  clone?: boolean;
}) {
  return (
    <ul
      className="flex items-center gap-8 pr-8 sm:gap-10 sm:pr-10"
      aria-hidden={clone || undefined}
      data-clone={clone ? "true" : undefined}
    >
      {clients.map((client, index) => (
        <li key={`${client.name}-${clone ? "clone" : "live"}`}>
          <span className="inline-flex items-center gap-2.5 text-slate-700">
            <PlaceholderMark index={index} />
            <span className="text-[13px] font-semibold tracking-[0.14em] uppercase">
              {client.name}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function HeroLogos({
  label,
  clients,
}: {
  label: string;
  clients: HeroClient[];
}) {
  if (clients.length === 0) return null;

  return (
    <div className="mt-8 max-w-xl sm:mt-9">
      <p className="text-sm text-slate-600">{label}</p>
      <div className="logo-marquee mt-3" aria-label="Client logos">
        <div className="logo-track">
          <LogoSet clients={clients} />
          <LogoSet clients={clients} clone />
        </div>
      </div>
    </div>
  );
}
