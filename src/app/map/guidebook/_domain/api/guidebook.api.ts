import { apiClient } from "@/apis/client";
import type { Guidebook } from "@/types/guidebook";

export interface GuidebookCreateRequest {
  title: string;
  description: string;
  emoji?: string;
  color?: string;
  thumbnail?: string;
}

export interface GuidebookUpdateRequest {
  title?: string;
  description?: string;
  emoji?: string;
  color?: string;
  thumbnail?: string;
  isPublish?: boolean;
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

export type GuidebookPlaceFilter = "visited" | "notVisited";

export interface GuidebookPlacesParams {
  filter?: GuidebookPlaceFilter;
  cursor?: string;
  size?: number;
  userLat?: number;
  userLon?: number;
}

export interface GuidebookPlace {
  pid: string;
  name: string;
  address: string;
  y: number;
  x: number;
  visitedDate: string | null;
  guidebookCount: number;
  stampCount: number;
  category: string;
  distanceInKm: number | null;
  points: number;
}

export interface GuidebookPlacesResponse {
  data: GuidebookPlace[];
  nextCursor: string | null;
  size: number;
  hasNext: boolean;
  sortBy: string;
  sortDirection: "asc" | "desc";
  totalCount: number;
}

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

  places: (guidebookId: string, params: GuidebookPlacesParams = {}) =>
    apiClient.get<GuidebookPlacesResponse>(
      `${GUIDEBOOKS_ENDPOINT}/${guidebookId}/places${buildQueryString(params)}`,
    ),

  update: (guidebookId: string, body: GuidebookUpdateRequest) =>
    apiClient.patch<Guidebook>(`${GUIDEBOOKS_ENDPOINT}/${guidebookId}`, body),

  delete: (guidebookId: string) =>
    apiClient.delete<void>(`${GUIDEBOOKS_ENDPOINT}/${guidebookId}`),

  removePlace: (guidebookId: string, placeId: string) =>
    apiClient.delete<void>(`${GUIDEBOOKS_ENDPOINT}/${guidebookId}/places/${placeId}`),
};
