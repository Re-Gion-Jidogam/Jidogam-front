import { apiClient } from "@/apis/client";

export type ParticipationFilter = "progress" | "completed";

export interface ParticipationGuidebook {
  gid: string;
  title: string;
  totalPlaceCount: number;
  visitedPlaceCount: number;
}

export interface ParticipationItem {
  guidebookResponse: ParticipationGuidebook;
  lastActivityAt: string;
  isCompleted: boolean;
}

export interface ParticipationListResponse {
  data: ParticipationItem[];
  nextCursor: string | null;
  size: number;
  hasNext: boolean;
  sortBy: string;
  sortDirection: "asc" | "desc";
  totalCount: number;
}

export interface ParticipationListParams {
  filter?: ParticipationFilter;
  limit?: number;
  cursor?: string;
  keyword?: string;
  sortBy?: "lastActivityAt";
  sortDirection?: "asc" | "desc";
}

function buildQueryString(params: object) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const participationApi = {
  list: (userId: string, params: ParticipationListParams = {}) =>
    apiClient.get<ParticipationListResponse>(
      `/api/users/${userId}/participations${buildQueryString(params)}`,
    ),

  start: (guidebookId: string) =>
    apiClient.post<void>(`/api/guidebooks/${guidebookId}/participants`),

  cancel: (guidebookId: string) =>
    apiClient.delete<void>(`/api/guidebooks/${guidebookId}/participants`),
};
