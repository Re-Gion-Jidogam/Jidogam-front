"use client";

import ActionSheet from "@/components/ActionSheet";

const menus = [
  {
    title: "sample",
    onClick: () => {
      console.log("sample1");
    },
  },
  {
    title: "sample2",
    onClick: () => {
      console.log("sample2");
    },
  },
];

export default function Home() {
  return (
    <h1>
      Hello Jidogam
      <div>
        <ActionSheet actionSheetTitle="가이드북 카드 썸네일" menus={menus} />
      </div>
    </h1>
  );
}
