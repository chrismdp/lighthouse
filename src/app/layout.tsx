import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lighthouse, by CP",
  description: "A tiny text adventure set in a lighthouse.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
