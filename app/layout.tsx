import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "StoreIt",
  description: "Cloud Storage Platform"
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`bg-background min-h-screen ${poppins.className} text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;