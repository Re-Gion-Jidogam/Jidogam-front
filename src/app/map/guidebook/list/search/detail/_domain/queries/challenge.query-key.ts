import type { ParticipationFilter } from "../api/challenge.api";

export const challengeQueryKey = {
  all: () => ["challenge"] as const,

  participations: () => [...challengeQueryKey.all(), "participations"] as const,
  participation: (userId: string, filter: ParticipationFilter) =>
    [...challengeQueryKey.participations(), userId, filter] as const,
};
