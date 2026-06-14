import { useQuery } from "@tanstack/react-query";

import { shouldRetry } from "@/apis/retry";

import {
  participationApi,
  type ParticipationFilter,
} from "../api/participation.api";
import { participationQueryKey } from "./participation.query-key";

const PARTICIPATION_PAGE_SIZE = 100;

export function useParticipationListQuery(
  userId: string | null,
  filter: ParticipationFilter,
) {
  return useQuery({
    queryKey: userId
      ? participationQueryKey.list(userId, filter)
      : participationQueryKey.lists(),
    queryFn: () =>
      participationApi.list(userId as string, {
        filter,
        limit: PARTICIPATION_PAGE_SIZE,
      }),
    enabled: Boolean(userId),
    retry: shouldRetry,
  });
}
