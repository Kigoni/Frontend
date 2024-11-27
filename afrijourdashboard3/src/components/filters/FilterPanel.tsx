import React from 'react';
import { FilterGroup } from './FilterGroup';

interface FilterPanelProps {
  showFilterForm: boolean;
  toggleFilterForm: () => void;
  countries: any[];
  thematicAreas: any[];
  languages: any[];
  selectedCountries: number[];
  selectedThematicAreas: number[];
  selectedLanguages: number[];
  onCountryChange: (id: number) => void;
  onThematicAreaChange: (id: number) => void;
  onLanguageChange: (id: number) => void;
  onApplyFilter: () => void;
}

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
}: FilterPanelProps) => {
  return (
    <div
      className={`fixed left-0 top-0 h-full transform bg-white p-4 shadow-lg transition-transform ${
        showFilterForm ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '300px', zIndex: 50 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filter Options</h3>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={toggleFilterForm}
        >
          Close
        </button>
      </div>

      <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
        <form onSubmit={(e) => {
          e.preventDefault();
          onApplyFilter();
        }}>
          <FilterGroup
            title="Countries"
            items={countries}
            labelKey="country"
            selectedItems={selectedCountries}
            onItemChange={onCountryChange}
          />

          <FilterGroup
            title="Thematic Areas"
            items={thematicAreas}
            labelKey="thematic_area"
            selectedItems={selectedThematicAreas}
            onItemChange={onThematicAreaChange}
          />

          <FilterGroup
            title="Languages"
            items={languages}
            labelKey="language"
            selectedItems={selectedLanguages}
            onItemChange={onLanguageChange}
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
}