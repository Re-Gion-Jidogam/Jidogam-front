"use client";

import { useState } from "react";

import clsx from "clsx";

interface ToggleProps {
  initial?: boolean;
  onChange?: (state: boolean) => void;
}

export default function Toggle({ initial = false, onChange }: ToggleProps) {
  const [isOn, setIsOn] = useState(initial);

  const handleToggle = () => {
    setIsOn(!isOn);
    onChange?.(!isOn);
  };

  return (
    <button
      onClick={handleToggle}
      className={clsx("w-11 h-6 p-0.5 rounded-[100px]", {
        "bg-gray-600": !isOn,
        "bg-primary-300": isOn,
      })}
    >
      <div
        className={clsx(
          "w-5 h-5 rounded-full bg-gray-0 shadow-[0_4px_20px_0_rgba(0,0,0,0.10)] ",
        )}
      />
    </button>
  );
}
