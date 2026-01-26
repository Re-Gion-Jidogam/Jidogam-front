import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import BNB from "@/components/BNB";
import StampBottomSheet from "@/components/StampBottomSheet";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});
export const metadata: Metadata = {
  title: "지도감",
  description: "너도감? 나도감! 지도감",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <div className="w-screen">
          <main className="relative w-[23.4375rem] h-screen mx-auto p-3 pb-32 bg-gray-50 overflow-scroll">
            {children}
            <footer className="fixed bottom-0 left-1/2 -translate-x-1/2">
              <BNB />
            </footer>
            <StampBottomSheet />
          </main>
        </div>
      </body>
    </html>
  );
}
