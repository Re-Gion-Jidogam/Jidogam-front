import StampCard from "@/components/StampCard";

export default function Home() {
  return (
    <div className="p-10 flex flex-col gap-4">
      <StampCard placeInfo={placeCardData} variant="default" />
      <StampCard placeInfo={placeCardData} variant="stamp" />
      <StampCard placeInfo={placeCardData} variant="stamp-disabled" />
      {/* <h1>Hello Jidogam</h1> */}
    </div>
  );
}

const placeCardData = {
  name: "투썸플레이스 안산그랑시티자이점",
  category: "카페",
  point: 2.8,
  address: "경기 안산시 상록구 사동",
  visitedDate: "2025. 5. 14",
  guidebookCount: "",
};
