import { useUserStore } from "@/app/map/guidebook/_domain/store/useUserStore";

import { useParticipationListQuery } from "./useParticipationListQuery";

export interface ParticipationStatus {
  isParticipating: boolean;
}

export function useParticipationQuery(guidebookId: string | null) {
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
          isParticipating: participationList.data.some(
            (item) => item.guidebookResponse.gid === guidebookId,
          ),
        }
      : guidebookId
        ? undefined
        : {
            isParticipating: false,
          },
  };
}
