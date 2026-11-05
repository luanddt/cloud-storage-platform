import { Poppins } from "next/font/google";

import type { Metadata } from "next";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Storage",
  description: "Cloud Storage Platform",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en">
      <body className={`bg-background ${poppins.className} text-foreground`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
