import { useGuidebookDetailQuery } from "@/app/map/guidebook/_domain/queries/useGuidebookDetailQuery";
import { useUserStore } from "@/app/map/guidebook/_domain/store/useUserStore";

export interface ViewerStatus {
  isAuthor: boolean;
  visitedCount: number;
  totalCount: number;
}

export function useViewerStatusQuery(guidebookId: string | null) {
  const userId = useUserStore((state) => state.userId);
  const guidebookDetailQuery = useGuidebookDetailQuery(guidebookId);
  const guidebook = guidebookDetailQuery.data;

  return {
    ...guidebookDetailQuery,
    data: guidebook
      ? {
          isAuthor: userId !== null && guidebook.author.uid === userId,
          visitedCount: guidebook.visitedPlaceCount,
          totalCount: guidebook.totalPlaceCount,
        }
      : undefined,
  };
}
