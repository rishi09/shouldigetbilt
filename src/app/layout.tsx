import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Should I Get Bilt? | Bilt 2.0 Calculator",
  description: "Cut through the confusion. Find out if the Bilt credit card makes sense for your spending.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
