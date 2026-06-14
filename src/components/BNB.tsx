"use client";

import { Suspense } from "react";

import clsx from "clsx";
import { motion } from "framer-motion";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import SVGIcon, { IconSetKeyType } from "./SVGIcon";

interface MenuItemActionType {
  router: AppRouterInstance;
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
}

type MenuItemType = {
  label: string;
  icon: IconSetKeyType;
  url?: string;
  activeIcon: IconSetKeyType;
  action: (params: MenuItemActionType) => void;
};

interface BNBProps {
  menus?: MenuItemType[];
}

function BNBContent({ menus = MENUS }: BNBProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <ul
      className={clsx(
        "flex justify-between w-[20.375rem] bg-gray-0 mb-5",
        "rounded-full shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] overflow-hidden",
      )}
    >
      {menus.map(({ url, label, icon, activeIcon, action }) => {
        let isActive = pathname === url;
        if (label === "도장") {
          isActive = searchParams.get("stamp") === "true";
        }

        const baseClasses = clsx(
          "flex flex-col items-center px-6 py-3.5 gap-0.5 w-full",
          "cursor-pointer text-[0.5rem] text-center",
          {
            "text-gray-600": !isActive,
            "text-primary-300": isActive,
          },
        );

        return (
          <li key={label}>
            {url ? (
              <Link href={url} className={baseClasses}>
                <motion.span
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 10 }}
                >
                  <SVGIcon icon={isActive ? activeIcon : icon} />
                  <span>{label}</span>
                </motion.span>
              </Link>
            ) : (
              <motion.button
                type="button"
                onClick={() => action({ router, pathname, searchParams })}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
                className={baseClasses}
              >
                <SVGIcon icon={isActive ? activeIcon : icon} />
                <span>{label}</span>
              </motion.button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function BNB(props: BNBProps) {
  return (
    <Suspense fallback={null}>
      <BNBContent {...props} />
    </Suspense>
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
    url: "",
    icon: "StampIcon",
    activeIcon: "StampActiveIcon",
    action: ({ router, pathname, searchParams }) => {
      const stampParams = new URLSearchParams(searchParams);
      stampParams.set("stamp", "true");

      router.push(`${pathname}?${stampParams.toString()}`, { scroll: false });
    },
  },
  {
    label: "프로필",
    url: "/profile",
    icon: "ProfileIcon",
    activeIcon: "ProfileActiveIcon",
    action: () => {},
  },
];
