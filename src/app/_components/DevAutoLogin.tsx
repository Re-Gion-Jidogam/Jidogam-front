"use client";

import { useEffect } from "react";

import { getUserIdFromAccessToken, setAccessToken } from "@/apis/auth-token";
import { useUserStore } from "@/store/useUserStore";
const DEV_ADMIN_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2OTMzYmFjNC0wZDNlLTQ0YzEtOTJlMy1jODYzYzE3NjY1MzciLCJyb2xlIjoiVVNFUiIsImlzcyI6InJlZ2lvbi1qaWRvZ2FtIiwibmlja25hbWUiOiJ5ZXJpbTI0IiwiZXhwIjoxNzc5OTc2OTI1LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzc5OTc2MDI1LCJlbWFpbCI6Inlpbm5ldUBnbWFpbC5jb20ifQ.Jlhkyuu4pkYG9VMpQ-X01U9SX0yuiF23SwJ0u8MgLuY";

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
