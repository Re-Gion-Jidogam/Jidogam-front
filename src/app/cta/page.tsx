import Image from "next/image";

import ctaBackground from "@/assets/icons/cta_background.png";
import Button from "@/components/Button";

export default function CTA() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col">
      {/* 이미지 영역 - 상단이 잘리고 하단이 보이도록 */}
      <div className="relative w-full flex-1">
        <Image
          src={ctaBackground}
          alt="TRAVEL"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* 텍스트 및 버튼 영역 */}
      <div className="relative bg-white pb-6 pt-9 px-3">
        <div className="pb-9 flex flex-col gap-1 items-center justify-center">
          <p className="font-bold text-2xl text-gray-900">여행 좋아하시나요?</p>
          <p className="font-normal text-sm text-gray-700">
            로그인해서 도장찍고 여행력을 모아보세요!
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <Button color="green" variants="primary" className="w-full py-3.5">
            시작하기
          </Button>
          <Button color="green" variants="ghost" className="w-full py-3.5">
            괜찮아요
          </Button>
        </div>
      </div>
    </div>
  );
}
