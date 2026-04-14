import { useQuery } from "@tanstack/react-query";

export interface ChallengeStatus {
  isChallenging: boolean;
  challengeCount: number;
}

async function fetchChallengeStatus(
  _guidebookId: string,
): Promise<ChallengeStatus> {
  return Promise.resolve({ isChallenging: true, challengeCount: 0 });
}

export function useChallengeQuery(guidebookId: string) {
  return useQuery<ChallengeStatus>({
    queryKey: ["challenge", guidebookId],
    queryFn: () => fetchChallengeStatus(guidebookId),
  });
}
