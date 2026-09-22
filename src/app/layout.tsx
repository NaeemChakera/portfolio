import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import { CursorOrbit } from "@/components/cursor-orbit";
import { MountainWireframe } from "@/components/mountain-wireframe";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Naeem Chakera — Computer Engineering",
  description:
    "Portfolio of Naeem Chakera, a Computer Engineering student at Colorado State University focused on IT support, POS systems, and web work.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={courierPrime.variable}
    >
      <body className="min-h-screen antialiased selection:bg-accent">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MountainWireframe />
          <div className="site-content">{children}</div>
          <CursorOrbit />
        </ThemeProvider>
      </body>
    </html>
  );
}
