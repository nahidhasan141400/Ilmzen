export const siteName = "Ilmzen";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "How we work" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
] as const;

export function isNavCurrent(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  const path = href.split("#")[0];
  return path.length > 1 && pathname === path;
}
