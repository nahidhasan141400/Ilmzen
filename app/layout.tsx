import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy Soft",
  description: "Hello World",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
      style={{ colorScheme: "only light" }}
    >
      <body className={`${montserrat.className} min-h-full flex flex-col bg-white text-zinc-900`}>
        {children}
      </body>
    </html>
  );
}
