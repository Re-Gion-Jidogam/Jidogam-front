import PlaceCard from "@/components/PlaceCard";

export default function Home() {
  return (
    <div>
      <PlaceCard {...placeCardData} variant="bottom-button" />
      <PlaceCard {...placeCardData} variant="stamp" />
      <PlaceCard {...placeCardData} variant="stamp-disabled" />
      <h1>Hello Jidogam</h1>
    </div>
  );
}

const placeCardData = {
  storeName: "투썸플레이스 안산그랑시티자이점",
  storeCategory: "카페",
  storeScore: 2.8,
  storeAddress: "경기 안산시 상록구 사동",
  stampingDay: "2025. 5. 14",
  containingGuideBookNumber: "4,928",
};
