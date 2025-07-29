import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import BNB from "@/components/BNB";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "지도감",
  description: "너도감? 나도감! 지도감",
};

const API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <script type="text/javascript" src={API_URL} defer></script>
        {children}
        <footer className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <BNB />
        </footer>
      </body>
    </html>
  );
}
