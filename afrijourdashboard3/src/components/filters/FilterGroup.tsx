import React, { useState } from 'react';
//import { Checkbox } from '@/components/ui/checkbox';

interface FilterItem {
  id: number;
  [key: string]: any;
}

interface FilterGroupProps {
  title: string;
  items: FilterItem[];
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
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, initialDisplayCount);

  const handleShowAllToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from affecting parent state
    setShowAll(!showAll);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{title}:</label>
      <div className="space-y-2">
        {displayedItems.map((item) => (
          <div key={item.id} className="flex items-center">
            <input
              type="checkbox"
              id={`${title}-${item.id}`}
              className="form-checkbox rounded cursor-pointer"
              checked={selectedItems.includes(item.id)}
              onChange={() => onItemChange(item.id)}
            />
            <label
              htmlFor={`${title}-${item.id}`}
              className="ml-2 text-sm cursor-pointer"
            >
              {item[labelKey]}
            </label>
          </div>
        ))}
      </div>

      {items.length > initialDisplayCount && (
        <button
          onClick={handleShowAllToggle} // Call the toggle function
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          {showAll ? 'Show Less' : 'View More'}
        </button>
      )}
    </div>
  );
};
