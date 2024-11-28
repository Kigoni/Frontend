import { FilterGroup } from "./FilterGroup";
import { useEffect, useRef } from "react";

export const FilterPanel = ({
  showFilterForm,
  toggleFilterForm,
  countries,
  thematicAreas,
  languages,
  selectedCountries,
  selectedThematicAreas,
  selectedLanguages,
  onCountryChange,
  onThematicAreaChange,
  onLanguageChange,
  onApplyFilter,
<<<<<<< HEAD
}: FilterPanelProps) => {
  // Prevent the panel from closing when interacting inside it
  const handlePanelClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from affecting the parent toggle button
  };
=======
}: {
  showFilterForm: boolean;
  toggleFilterForm: () => void;
  countries: any[];
  thematicAreas: any[];
  languages: any[];
  selectedCountries: string[];
  selectedThematicAreas: string[];
  selectedLanguages: string[];
  onCountryChange: (value: string) => void;
  onThematicAreaChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onApplyFilter: () => void;
}) => {
  const filterPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterPanelRef.current &&
        !filterPanelRef.current.contains(event.target as Node)
      ) {
        toggleFilterForm();
      }
    };

    if (showFilterForm) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterForm, toggleFilterForm]);
>>>>>>> pr-2

  return (
    <div
      ref={filterPanelRef}
      className={`fixed left-0 top-0 h-full transform bg-white p-4 shadow-lg transition-transform ${
        showFilterForm ? "translate-x-0" : "-translate-x-full"
      }`}
<<<<<<< HEAD
      style={{ width: '300px', zIndex: 50 }}
      onClick={handlePanelClick} // Stop propagation when inside the filter panel
=======
      style={{ width: "300px", zIndex: 50 }}
      onClick={(e) => e.stopPropagation()} // Prevent click events from propagating
>>>>>>> pr-2
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filter Options</h3>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={toggleFilterForm} // Only this button should toggle visibility
        >
          Close
        </button>
      </div>

      <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onApplyFilter();
          }}
        >
          <FilterGroup
            title="Countries"
            items={countries}
            labelKey="country"
            selectedItems={selectedCountries.map(Number)}
            onItemChange={(id: number) => onCountryChange(id.toString())}
          />

          <FilterGroup
            title="Thematic Areas"
            items={thematicAreas}
            labelKey="thematic_area"
            selectedItems={selectedThematicAreas.map(Number)}
            onItemChange={(id: number) =>
              onThematicAreaChange(id.toString())
            }
          />

          <FilterGroup
            title="Languages"
            items={languages}
            labelKey="language"
            selectedItems={selectedLanguages.map(Number)}
            onItemChange={(id: number) => onLanguageChange(id.toString())}
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  );
};
