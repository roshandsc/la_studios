import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Capella Studios — Coming Soon",
  description: "A cinematic experience is on the way.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
