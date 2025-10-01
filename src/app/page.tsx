import StampCard from "@/components/StampCard";

export default function Home() {
  return (
    <div>
      <StampCard {...placeCardData} />
      <h1>Hello Jidogam</h1>
    </div>
  );
}

const placeCardData = {
  storeName: "투썸플레이스 안산그랑시티자이점",
  storeCategory: "카페",
  storeScore: 2.8,
  storeAddress: "경기 안산시 상록구 사동",
  stampingNumber: 50,
};
