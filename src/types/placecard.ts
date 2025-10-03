export interface PlaceCardBase {
  name: string;
  category: string;
  point: number;
  address: string;
  visitedDate: string;
  guidebookCount: string;
}

export type PlaceCardVariant = "bottom-button" | "stamp" | "stamp-disabled";

export interface PlaceCardProps extends PlaceCardBase {
  variant?: PlaceCardVariant;
}
