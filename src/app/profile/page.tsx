import SVGIcon from "@/components/SVGIcon";

export default function Page() {
  return (
    <div className="pt-14 px-3 flex flex-col gap-6 pb-10 bg-[#F5F5F5]">
      <p className="pl-3 font-semibold text-4xl text-gray-900">내 정보</p>

      {/* 첫 번째 프로필 카드 */}
      <div className="w-full flex flex-col py-6 gap-3.5 items-center justify-center bg-white rounded-2xl">
        <div className="flex gap-2.5 items-center">
          <SVGIcon icon="ProfileBadgeIcon" />
          <span className="font-normal text-sm text-gray-700">+5</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center">
            <p className="font-semibold text-lg text-gray-900">지나가던 사람</p>
            <SVGIcon icon="RightGrayArrow" className="w-6 h-6" />
          </div>
          <p className="font-normal text-xs text-gray-700">Lv. 5123</p>
        </div>
      </div>

      {/* 두 번째 프로필 카드 */}
    </div>
  );
}
