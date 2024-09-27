import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Provider from "./components/Provider";
import { Sidebar } from "./components/menu_bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Summit'24|IIIT Pune",
  description: "Sewing Sight,Sparking Stories",
  icons: {
    icon: "/E-summit24 logo.png",
    apple: "/E-summit24 logo.png",
    },
};

export default function RootLayout({
  children
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Provider>
        {children}
        </Provider>
      </body>
    </html>
  );
}
