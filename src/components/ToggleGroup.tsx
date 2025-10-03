import SVGIcon from "./SVGIcon";

interface ToggleItem {
  image: "ToggleGroupCheck" | "ToggleGroupRound";
  label: string;
  id?: string;
}

interface ToggleGroupProps {
  items: ToggleItem[];
}

export default function ToggleGroup({ items }: ToggleGroupProps) {
  return (
    <div className="flex gap-2">
      {items.map((item, index) => (
        <ToggleGroupContainer
          key={item.id || index}
          image={item.image}
          label={item.label}
        />
      ))}
    </div>
  );
}

interface ToggleGroupContainerProps {
  image: "ToggleGroupCheck" | "ToggleGroupRound";
  label: string;
}

function ToggleGroupContainer({ image, label }: ToggleGroupContainerProps) {
  return (
    <div className="rounded-[100px] border border-gray-400 py-2 px-3 gap-1 flex items-center justify-center w-fit">
      <SVGIcon icon={image} />
      <p className="font-medium text-xs text-gray-900">{label}</p>
    </div>
  );
}
