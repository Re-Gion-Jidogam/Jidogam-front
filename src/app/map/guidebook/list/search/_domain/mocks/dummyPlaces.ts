export interface Place {
  pid: string;
  name: string;
  category: string;
  rating: number;
  address: string;
  visited: boolean;
  images: string[];
}

export const dummyPlaces: Place[] = [
  {
    pid: "1",
    name: "투썸플레이스 안산그랑시티자이점",
    category: "카페",
    rating: 2.8,
    address: "경기 안산시 상록구 사동 · 10km",
    visited: false,
    images: ["/images/dummy1-1.jpg", "/images/dummy1-2.jpg", "/images/dummy1-3.jpg"],
  },
  {
    pid: "2",
    name: "투썸플레이스 안산그랑시티자이점",
    category: "카페",
    rating: 2.8,
    address: "경기 안산시 상록구 사동 · 10km",
    visited: true,
    images: [],
  },
];
