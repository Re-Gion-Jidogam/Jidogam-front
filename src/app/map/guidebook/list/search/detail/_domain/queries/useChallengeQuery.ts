import { useUserStore } from "@/app/map/guidebook/_domain/store/useUserStore";

import { useParticipationListQuery } from "./useParticipationListQuery";

export interface ChallengeStatus {
  isChallenging: boolean;
  challengeCount: number;
}

export function useChallengeQuery(guidebookId: string | null) {
  const userId = useUserStore((state) => state.userId);
  const participationListQuery = useParticipationListQuery(
    guidebookId ? userId : null,
    "progress",
  );
  const participationList = participationListQuery.data;

  return {
    ...participationListQuery,
    data: participationList
      ? {
          isChallenging: participationList.data.some(
            (item) => item.guidebookResponse.gid === guidebookId,
          ),
          challengeCount: participationList.totalCount,
        }
      : guidebookId
        ? undefined
        : {
            isChallenging: false,
            challengeCount: 0,
          },
  };
}
