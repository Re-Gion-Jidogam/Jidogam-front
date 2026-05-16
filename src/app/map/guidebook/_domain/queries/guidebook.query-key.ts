import type { GuidebookListParams } from "../api/guidebook.api";

export type GuidebookListFilters = Omit<GuidebookListParams, "cursor">;

function normalizeGuidebookListFilters(filters: GuidebookListFilters = {}) {
  return [
    filters.filter ?? "",
    filters.sortBy ?? "",
    filters.sortDirection ?? "",
    filters.keyword ?? "",
    filters.limit ?? "",
  ] as const;
}

export const guidebookQueryKey = {
  all: () => ["guidebook"] as const,

  lists: () => [...guidebookQueryKey.all(), "list"] as const,
  list: (filters: GuidebookListFilters = {}) =>
    [...guidebookQueryKey.lists(), ...normalizeGuidebookListFilters(filters)] as const,

  infinites: () => [...guidebookQueryKey.all(), "infinite"] as const,
  infinite: (filters: GuidebookListFilters = {}) =>
    [
      ...guidebookQueryKey.infinites(),
      ...normalizeGuidebookListFilters(filters),
    ] as const,

  details: () => [...guidebookQueryKey.all(), "detail"] as const,
  detail: (guidebookId: string) =>
    [...guidebookQueryKey.details(), guidebookId] as const,
};
