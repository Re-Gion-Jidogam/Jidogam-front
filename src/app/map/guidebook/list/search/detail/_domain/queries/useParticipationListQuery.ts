import { useQuery } from "@tanstack/react-query";

import { shouldRetry } from "@/apis/retry";

import {
  participationApi,
  type ParticipationFilter,
} from "../api/challenge.api";
import { challengeQueryKey } from "./challenge.query-key";

const PARTICIPATION_PAGE_SIZE = 100;

export function useParticipationListQuery(
  userId: string | null,
  filter: ParticipationFilter,
) {
  return useQuery({
    queryKey: userId
      ? challengeQueryKey.participation(userId, filter)
      : challengeQueryKey.participations(),
    queryFn: () =>
      participationApi.list(userId as string, {
        filter,
        limit: PARTICIPATION_PAGE_SIZE,
      }),
    enabled: Boolean(userId),
    retry: shouldRetry,
  });
}
