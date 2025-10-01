import SVGIcon from "./SVGIcon";

interface StampCardProps {
  storeName: string;
  storeCategory: string;
  storeScore: number;
  storeAddress: string;
  stampingNumber: number;
  // variant: "default" | "stamp" | "stamp-disabled";
}

export default function StampCard({
  storeName,
  storeCategory,
  storeScore,
  storeAddress,
  // variant,
}: StampCardProps) {
  return (
    <div className="w-full rounded-xl border border-gray-200 p-4 gap-3.5 bg-gray-0 flex justify-between">
      <div className="w-full pl-0.5 flex flex-col gap-1">
        <p className="font-bold text-sm text-gray-900">{storeName}</p>
        <div className="flex items-center gap-1">
          <p className="font-normal text-xs text-gray-700">{storeCategory}</p>
          <p className="font-normal text-xs text-gray-700">·</p>
          <div className="flex items-center gap-0.5">
            <SVGIcon icon="GrayStarIcon" />
            <p className="font-normal text-xs text-gray-700">{storeScore}</p>
          </div>
        </div>
        <p className="font-normal text-xs text-gray-700">{storeAddress}</p>
      </div>
    </div>
  );
}
