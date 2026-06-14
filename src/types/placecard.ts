export interface PlaceCardBase {
  pid: string;
  name: string;
  category: string;
  point: number;
  address: string;
  visitedDate: string;
  guidebookCount: string;
}

export type PlaceCardVariant =
  | "default"
  | "bottom-button"
  | "stamp"
  | "stamp-disabled";

export interface PlaceCardProps extends PlaceCardBase {
  variant?: PlaceCardVariant;
  className?: string;
  onOptionClick?: () => void;
  images?: import("next/image").ImageProps["src"][];
  priority?: boolean;
}
