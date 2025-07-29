import { HTMLAttributes } from "react";

import * as IconSet from "@/assets/icons";

export type IconSetKeyType = keyof typeof IconSet;

interface SVGIconProps extends HTMLAttributes<SVGSVGElement> {
  icon: IconSetKeyType;
  className?: string;
}

export default function SVGIcon({ icon, className, ...props }: SVGIconProps) {
  const IconComponent = IconSet[icon];

  return <IconComponent className={className} {...props} />;
}
