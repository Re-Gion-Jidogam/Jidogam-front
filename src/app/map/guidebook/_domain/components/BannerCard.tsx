import { ComponentType, SVGProps } from "react";

import SVGIcon from "@/components/SVGIcon";

interface BannerCardProps {
  image: ComponentType<SVGProps<SVGSVGElement>>;
  label?: string;
  variant: "star" | "heart";
}

export default function BannerCard({
  image: Image,
  label,
  variant,
}: BannerCardProps) {
  return (
    <button className="relative flex-1 h-[110px] bg-white rounded-[12px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden">
      {variant === "star" ? (
        <>
          <div className="absolute -top-10 -right-16 rotate-20">
            <Image width={200} height={180} viewBox="0 0 300 300" />
          </div>
          <div className="absolute left-5 bottom-2 flex items-center gap-1">
            <p className="text-[14px] font-semibold text-gray-900 leading-none whitespace-nowrap">
              인기 가이드북
            </p>
            <SVGIcon
              icon="RightGrayArrow"
              className="shrink-0 w-[18px] h-[18px]"
            />
          </div>
        </>
      ) : (
        <>
          <div className="absolute -top-10 -right-24 -rotate-16">
            <Image width={180} height={180} viewBox="0 0 350 350" />
          </div>
          <div className="absolute left-5 bottom-2">
            <p className="text-[14px] font-semibold text-gray-900 leading-[150%] text-left">
              {label}
            </p>
            <p className="text-[14px] font-semibold text-gray-900 leading-[150%] text-left">
              기다리는 곳
              <SVGIcon
                icon="RightGrayArrow"
                className="inline-block align-middle ml-1 w-[18px] h-[18px]"
              />
            </p>
          </div>
        </>
      )}
    </button>
  );
}
