import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Management System",
  description: "Production Ready Inventory Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
