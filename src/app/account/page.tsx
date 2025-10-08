"use client";

import { ExitModal } from "./_components/ExitModal";

export default function Account() {
  return (
    <ExitModal
      onClickClose={() => console.log("closed!")}
      onConfirm={() => console.log("confirm!")}
    />
  );
}
