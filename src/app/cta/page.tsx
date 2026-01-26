import Image from "next/image";
import Link from "next/link";

import ctaBackground from "@/assets/icons/cta_background.png";

export default function CTA() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col">
      <div className="relative w-full flex-1">
        <Image
          src={ctaBackground}
          alt="TRAVEL"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      <div className="relative bg-white pb-6 pt-9 px-3">
        <div className="pb-9 flex flex-col gap-1 items-center justify-center">
          <p className="font-bold text-2xl text-gray-900">여행 좋아하시나요?</p>
          <p className="font-normal text-sm text-gray-700">
            로그인해서 도장찍고 여행력을 모아보세요!
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <Link
            href="/map"
            className="w-full py-3.5 rounded-xl border bg-primary-300 hover:bg-primary-400 border-primary-300 hover:border-primary-400 text-gray-0 text-sm font-semibold text-center transition"
          >
            시작하기
          </Link>
          <Link
            href="/"
            className="w-full py-3.5 rounded-xl border bg-gray-0 hover:bg-primary-50 border-gray-0 hover:border-primary-50 text-gray-700 hover:text-primary-400 text-sm font-semibold text-center transition"
          >
            괜찮아요
          </Link>
        </div>
      </div>
    </div>
  );
}
