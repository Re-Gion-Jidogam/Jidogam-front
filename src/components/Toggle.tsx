"use client";

import { useState } from "react";

import clsx from "clsx";
import { motion } from "framer-motion";

import SVGIcon from "./SVGIcon";

interface ToggleProps {
  initial?: boolean;
  label: string;
  onChange?: (state: boolean) => void;
  disabled?: boolean;
}

export default function Toggle({
  initial = false,
  label,
  onChange,
  disabled = false,
}: ToggleProps) {
  const [isOn, setIsOn] = useState(initial);

  const handleToggle = () => {
    if (disabled) return;

    setIsOn(!isOn);
    onChange?.(!isOn);
  };

  return (
    <div className={clsx("flex items-center gap-2")}>
      <motion.button
        onClick={handleToggle}
        className={clsx(
          "w-11 h-6 p-0.5 rounded-[100px]",
          {
            "bg-gray-600": !isOn,
            "bg-primary-300": isOn && !disabled,
            "bg-primary-400": isOn && disabled,
          },
          {
            "cursor-pointer": !disabled,
            "cursor-not-allowed": disabled,
          },
          {
            "pointer-events-none": disabled,
          },
        )}
      >
        <motion.div
          className={clsx(
            "w-5 h-5 rounded-full shadow-[0_4px_20px_0_rgba(0,0,0,0.10)]",
            {
              "bg-gray-50": !disabled,
              "bg-gray-300": disabled,
            },
          )}
          animate={{ x: isOn ? 20 : 0 }}
        />
      </motion.button>
      <p
        className={clsx("font-medium text-sm", {
          "text-gray-900": !disabled,

          "text-gray-600": disabled,
        })}
      >
        {label}
      </p>
      <SVGIcon icon="GrayGuideIcon" className="cursor-pointer" />
    </div>
  );
}
