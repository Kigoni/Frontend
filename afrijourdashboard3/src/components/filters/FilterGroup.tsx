import React from "react";

interface FilterGroupProps {
  title: string;
  items: { id: number; [key: string]: any }[];
  labelKey: string;
  selectedItems: number[];
  onItemChange: (id: number) => void;
  initialDisplayCount?: number;
}

export const FilterGroup = ({
  title,
  items,
  labelKey,
  selectedItems,
  onItemChange,
  initialDisplayCount = 7,
}: FilterGroupProps) => {
  const [showAll, setShowAll] = React.useState(false);

  const displayedItems = showAll ? items : items.slice(0, initialDisplayCount);

  const toggleShowAll = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent bubbling events to avoid unintended effects
    setShowAll(!showAll);
  };

  const handleItemClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent bubbling events to avoid unintended effects
    onItemChange(id);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{title}:</label>
      <div className="space-y-2">
        {displayedItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center w-full text-left px-2 py-1 rounded ${
              selectedItems.includes(item.id) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={(e) => handleItemClick(e, item.id)}
          >
            {item[labelKey]}
          </button>
        ))}
      </div>
      {items.length > initialDisplayCount && (
        <button
          onClick={toggleShowAll}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          {showAll ? "Show Less" : "View More"}
        </button>
      )}
    </div>
  );
};