import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./components/Provider";
import {Analytics} from '@vercel/analytics'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Summit'24|IIIT Pune",
  description: "Sewing Sight,Sparking Stories",
  icons: {
    icon: "/esummit24logo.png",
    apple: "/esummit24logo.png",
    },
};

export default function RootLayout({
  children
}) {

  function handleScroll(sectionId){
    const section = document.getElementById(sectionId);
    console.log(sectionId)
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/esummit24logo.png" type="image/png" /> {/* Add this line */}
      </head>
      <body className={inter.className}>
        <Provider>
        {/* <Navbar handleScroll={handleScroll}/> */}
        {children}
        <Analytics/>
        </Provider>
      </body>
    </html>
  );
}
