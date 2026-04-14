import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import BNB from "@/components/BNB";
import StampBottomSheet from "@/components/StampBottomSheet/StampBottomSheet";
import QueryProvider from "@/queries/QueryProvider";

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
          <main className="min-h-screen mx-auto p-3 pb-32 bg-gray-50 overflow-hidden">
            <QueryProvider>
              {children}
              <footer className="fixed bottom-0 left-1/2 -translate-x-1/2">
                <BNB />
              </footer>
              <StampBottomSheet />
            </QueryProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
