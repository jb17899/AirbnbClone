import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./src/components/navbar/Navbar";
import "./globals.css";
import ClientOnly from "./src/components/ClientOnly";
import RegisterModal from "./src/components/modal/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./src/components/modal/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import RentModal from "./src/components/modal/RentModal";
import Search from "./src/components/navbar/Search";
import SearchModal from "./src/components/modal/SearchModal";
const nunito = Nunito({
  subsets: ["latin"]
});
export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased`}
      >
        <ClientOnly>
          <ToasterProvider/>
          <SearchModal/>
          <RentModal/>
          <LoginModal/>
          <RegisterModal />
          <Navbar currentUser = {user}/>
          <div className="pb-20 pt-28">
          {children}
          </div>
        </ClientOnly>
      </body>
    </html>
  );
}
