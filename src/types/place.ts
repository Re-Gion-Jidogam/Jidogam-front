export interface Place {
  pid: string;
  name: string;
  address: string;
  x: string;
  y: string;
  visitedDate: string | null;
  guidebookCount: string;
  category: string;
  // reviews 장소 리뷰, 별점(보류)
  // images 이미지(보류)
}
