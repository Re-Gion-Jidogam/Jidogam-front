import clsx from "clsx";

import SVGIcon from "./SVGIcon";

interface ToggleItem {
  image:
    | "ToggleGroupCheck"
    | "ToggleGroupLoading"
    | "ToggleGroupWhiteCheck"
    | "ToggleGroupWhiteLoading";
  label: string;
  id: string;
}

interface ToggleGroupProps {
  items: ToggleItem[];
  selectedValues?: string[];
  onValueChange?: (value: string[]) => void;
}

export default function ToggleGroup({
  items,
  selectedValues = [],
  onValueChange,
}: ToggleGroupProps) {
  const handleToggle = (id: string) => {
    if (!onValueChange) return;

    if (selectedValues.includes(id)) {
      onValueChange(selectedValues.filter((value) => value !== id));
    } else {
      onValueChange([...selectedValues, id]);
    }
  };

  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <ToggleGroupContainer
          key={item.id}
          image={item.image}
          label={item.label}
          isSelected={selectedValues.includes(item.id)}
          onClick={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}

interface ToggleGroupContainerProps {
  image:
    | "ToggleGroupCheck"
    | "ToggleGroupLoading"
    | "ToggleGroupWhiteCheck"
    | "ToggleGroupWhiteLoading";
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

function ToggleGroupContainer({
  image,
  label,
  isSelected,
  onClick,
}: ToggleGroupContainerProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center w-fit gap-1",
        "py-2 px-3",
        {
          "bg-primary-300": isSelected,
        },
        "border",
        {
          "border-gray-400": !isSelected,
          "border-primary-100": isSelected,
        },
        "rounded-[100px] cursor-pointer",
      )}
      onClick={onClick}
    >
      <SVGIcon icon={image} />
      <p
        className={clsx("font-medium text-xs", {
          "text-gray-900": !isSelected,
          "text-gray-0": isSelected,
        })}
      >
        {label}
      </p>
    </div>
  );
}
