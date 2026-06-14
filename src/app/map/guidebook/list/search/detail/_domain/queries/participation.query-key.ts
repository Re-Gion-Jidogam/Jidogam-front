import type { ParticipationFilter } from "../api/participation.api";

export const participationQueryKey = {
  all: () => ["participation"] as const,

  lists: () => [...participationQueryKey.all(), "list"] as const,
  list: (userId: string, filter: ParticipationFilter) =>
    [...participationQueryKey.lists(), userId, filter] as const,
};
