"use client";

import { useState } from "react";

import ToggleGroup from "@/components/ToggleGroup";

export default function Home() {
  const [selected, setSelected] = useState<string[]>([]);

  // return <h1>Hello Jidogam</h1>;
  return (
    <div className="p-10">
      <ToggleGroup
        items={[
          {
            id: "option1",
            image: selected.includes("option1")
              ? "ToggleGroupWhiteCheck"
              : "ToggleGroupCheck",
            label: "옵션 1",
          },
          {
            id: "option2",
            image: selected.includes("option2")
              ? "ToggleGroupWhiteLoading"
              : "ToggleGroupLoading",
            label: "옵션 2",
          },
          {
            id: "option3",
            image: selected.includes("option3")
              ? "ToggleGroupWhiteCheck"
              : "ToggleGroupCheck",
            label: "옵션 3",
          },
        ]}
        selectedValues={selected}
        onValueChange={setSelected}
      />
    </div>
  );
}
