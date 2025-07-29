"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import SVGIcon, { IconSetKeyType } from "./SVGIcon";

type MenuItemType = {
  label: string;
  icon: IconSetKeyType;
  url: string;
  activeIcon: IconSetKeyType;
  action: (router: AppRouterInstance) => void;
};

interface BNBProps {
  menus?: MenuItemType[];
}

export default function BNB({ menus = MENUS }: BNBProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ul
      className={clsx(
        "flex justify-between w-[20.375rem] bg-gray-0",
        "rounded-full shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] overflow-hidden",
      )}
    >
      {menus.map(({ url, label, icon, activeIcon, action }) => {
        const isActive = pathname === url;

        return (
          <li key={label}>
            <Link href={url}>
              <motion.button
                type="button"
                onClick={() => action(router)}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 10,
                }}
                className={clsx(
                  "flex flex-col items-center px-6 py-3.5 gap-0.5 w-full",
                  "cursor-pointer text-[0.5rem]",
                  {
                    "text-gray-600": !isActive,
                    "text-primary-300": isActive,
                  },
                )}
              >
                <SVGIcon icon={isActive ? activeIcon : icon} />
                <span>{label}</span>
              </motion.button>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const MENUS: MenuItemType[] = [
  {
    label: "발견",
    url: "/",
    icon: "HouseIcon",
    activeIcon: "HouseActiveIcon",
    action: () => {},
  },
  {
    label: "지도",
    url: "/map",
    icon: "MapIcon",
    activeIcon: "MapActiveIcon",
    action: () => {},
  },
  {
    label: "도장",
    url: "/stamp",
    icon: "StampIcon",
    activeIcon: "StampActiveIcon",
    action: () => {},
  },
  {
    label: "프로필",
    url: "/profile",
    icon: "ProfileIcon",
    activeIcon: "ProfileActiveIcon",
    action: () => {},
  },
];
