"use client";

interface Menu {
  title: string;
  onClick: () => void;
}

interface ActionSheetProps {
  actionSheetTitle: string;
  menus: Menu[];
}

export default function ActionSheet({
  actionSheetTitle,
  menus,
}: ActionSheetProps) {
  return (
    <div className="fixed inset-0 w-full px-3 pb-4 bg-gray-100">
      <div className="absolute bottom-0 overflow-hidden bg-blue-200 rounded-xl">
        <p className="py-3 bg-gray-200 text-xs font-semibold text-gray-900 text-center">
          {actionSheetTitle}
        </p>
        <ul className="bg-gray-300">
          {menus.map(({ title, onClick }) => (
            <li key={title} className="p-3.5 border border-gray-300">
              <button onClick={onClick}>{title}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
