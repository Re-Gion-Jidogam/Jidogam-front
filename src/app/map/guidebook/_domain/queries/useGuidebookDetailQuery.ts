import { useQuery } from "@tanstack/react-query";

import { shouldRetry } from "@/apis/retry";

import { guidebookApi } from "../api/guidebook.api";
import { guidebookQueryKey } from "./guidebook.query-key";

export function useGuidebookDetailQuery(guidebookId: string | null) {
  return useQuery({
    queryKey: guidebookId
      ? guidebookQueryKey.detail(guidebookId)
      : guidebookQueryKey.details(),
    queryFn: () => guidebookApi.detail(guidebookId as string),
    enabled: Boolean(guidebookId),
    retry: shouldRetry,
  });
}
