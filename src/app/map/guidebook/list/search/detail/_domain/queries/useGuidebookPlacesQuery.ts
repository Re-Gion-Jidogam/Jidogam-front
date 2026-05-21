"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { shouldRetry } from "@/apis/retry";
import {
  guidebookApi,
  type GuidebookPlaceFilter,
} from "@/app/map/guidebook/_domain/api/guidebook.api";
import { guidebookQueryKey } from "@/app/map/guidebook/_domain/queries/guidebook.query-key";

const PAGE_SIZE = 20;

interface UseGuidebookPlacesQueryParams {
  guidebookId: string | null;
  filter?: GuidebookPlaceFilter;
}

export function useGuidebookPlacesQuery({
  guidebookId,
  filter,
}: UseGuidebookPlacesQueryParams) {
  return useInfiniteQuery({
    queryKey: guidebookId
      ? guidebookQueryKey.places(guidebookId, filter)
      : guidebookQueryKey.all(),
    queryFn: ({ pageParam }) =>
      guidebookApi.places(guidebookId as string, {
        filter,
        cursor: pageParam,
        size: PAGE_SIZE,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.nextCursor ? lastPage.nextCursor : undefined,
    enabled: Boolean(guidebookId),
    retry: shouldRetry,
  });
}
