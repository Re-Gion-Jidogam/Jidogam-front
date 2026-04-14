import clsx from "clsx";

interface FilterChipsProps {
  showVisited: boolean;
  showUnvisited: boolean;
  onToggleVisited: () => void;
  onToggleUnvisited: () => void;
}

export function FilterChips({
  showVisited,
  showUnvisited,
  onToggleVisited,
  onToggleUnvisited,
}: FilterChipsProps) {
  return (
    <div className="flex gap-2 px-5 pb-4">
      <button
        onClick={onToggleVisited}
        className={clsx(
          "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors",
          showVisited
            ? "bg-gray-800 text-white border-gray-800"
            : "bg-white text-gray-700 border-gray-300",
        )}
      >
        <span>✓</span>
        <span>방문완료</span>
      </button>
      <button
        onClick={onToggleUnvisited}
        className={clsx(
          "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors",
          showUnvisited
            ? "bg-gray-800 text-white border-gray-800"
            : "bg-white text-gray-700 border-gray-300",
        )}
      >
        <span>✺</span>
        <span>미방문</span>
      </button>
    </div>
  );
}
