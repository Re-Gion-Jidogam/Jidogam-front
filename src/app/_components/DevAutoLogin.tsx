"use client";

import { useEffect } from "react";

import { getUserIdFromAccessToken, setAccessToken } from "@/apis/auth-token";
import { useUserStore } from "@/app/map/guidebook/_domain/store/useUserStore";
const DEV_ADMIN_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzZjdhY2RjMS0zMjc3LTQwYjQtOTFkNS02YzhiODgwYWM5MmIiLCJyb2xlIjoiQURNSU4iLCJpc3MiOiJyZWdpb24tamlkb2dhbSIsIm5pY2tuYW1lIjoiYWRtaW4iLCJleHAiOjE3Nzc3OTQzNDUsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3Nzc3OTM0NDUsImVtYWlsIjoiYWRtaW5Aamlkb2dhbS5jb20ifQ.RSNFYX2jNTri14wOoU-9BZiy-SJz49gsP8TH0_b2RXM";

export default function DevAutoLogin() {
  const setUserId = useUserStore((state) => state.setUserId);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    setAccessToken(DEV_ADMIN_ACCESS_TOKEN);
    const userId = getUserIdFromAccessToken(DEV_ADMIN_ACCESS_TOKEN);
    if (userId) {
      setUserId(userId);
    }
  }, [setUserId]);

  return null;
}
