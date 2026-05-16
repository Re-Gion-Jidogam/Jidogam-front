import { apiClient } from "@/apis/client";
import { Guidebook } from "@/types/guidebook";

export interface GuidebookCreateRequest {
  title: string;
  description: string;
  emoji?: string;
  color?: string;
  thumbnail?: string;
}

export type GuidebookListFilter = "popular" | "local" | "isPublished";
export type GuidebookSortBy = "createdAt" | "participantCount";
export type GuidebookSortDirection = "asc" | "desc";

export interface GuidebookListParams {
  filter?: GuidebookListFilter;
  sortBy?: GuidebookSortBy;
  sortDirection?: GuidebookSortDirection;
  keyword?: string;
  limit?: number;
  cursor?: string;
}

export interface CursorPageResponse<T> {
  content: T[];
  nextCursor: string | null;
  hasNext: boolean;
}

export type GuidebookListResponse = CursorPageResponse<Guidebook>;

const GUIDEBOOKS_ENDPOINT = "/api/guidebooks";

function buildQueryString(params: object) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const guidebookApi = {
  create: (body: GuidebookCreateRequest) =>
    apiClient.post<void>(GUIDEBOOKS_ENDPOINT, body),

  list: (params: GuidebookListParams = {}) =>
    apiClient.get<GuidebookListResponse>(
      `${GUIDEBOOKS_ENDPOINT}${buildQueryString(params)}`,
    ),

  detail: (guidebookId: string) =>
    apiClient.get<Guidebook>(`${GUIDEBOOKS_ENDPOINT}/${guidebookId}`),
};
