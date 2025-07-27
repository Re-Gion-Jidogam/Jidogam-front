"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface SegmentGroupProps {
  segments: {
    label: string;
    url: string;
  }[];
}

export default function SegmentGroup({ segments }: SegmentGroupProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selected = searchParams.get("mode") || segments[0].url;

  return (
    <div
      className={clsx(
        "relative inline-flex bg-[#dcdcdc] rounded-full",
        "text-xs font-semibold text-gray-800",
      )}
    >
      <div className="relative flex">
        {segments.map(({ label, url }) => {
          const isSelected = selected === url;

          return (
            <Link
              key={url}
              href={`${pathname}?mode=${url}`}
              className="relative z-10 w-[7.25rem] py-2.5 text-center"
            >
              {isSelected && (
                <motion.div
                  layoutId="segment"
                  className={clsx(
                    "absolute inset-0 bg-white",
                    "shadow-[0_4px_20px_rgba(0,0,0,0.1)] rounded-full",
                  )}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
