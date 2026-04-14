import { PlaceSection } from "./_domain/components/PlaceSection";

export default function GuidebookSearchPage() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[62vh] z-50 flex flex-col bg-[#F5F5F5]/80 rounded-t-2xl shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)]">
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-12 h-1 bg-black/30 rounded-[10px]" />
      </div>

      <div className="px-5 pt-2 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">전국 빵집 리스트</h1>
        <p className="text-sm text-gray-600 mt-1">Lv. 3132 · 지나가던 사람</p>
        <p className="text-sm text-gray-600">총 483개의 장소</p>
      </div>

      <PlaceSection />
    </div>
  );
}
