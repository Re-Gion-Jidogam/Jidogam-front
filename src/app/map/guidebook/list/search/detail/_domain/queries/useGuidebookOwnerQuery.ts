import { useQuery } from "@tanstack/react-query";

export interface GuidebookOwnerStatus {
  isOwner: boolean;
  visitedCount: number;
  totalCount: number;
}

// TODO: 실제 API 호출 함수로 교체
async function fetchGuidebookOwnerStatus(
  _guidebookId: string,
): Promise<GuidebookOwnerStatus> {
  return Promise.resolve({ isOwner: true, visitedCount: 1827, totalCount: 2343 });
}

export function useGuidebookOwnerQuery(guidebookId: string) {
  return useQuery<GuidebookOwnerStatus>({
    queryKey: ["guidebookOwner", guidebookId],
    queryFn: () => fetchGuidebookOwnerStatus(guidebookId),
  });
}
