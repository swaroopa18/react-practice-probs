import React, { ChangeEvent } from "react";

interface TodoFilterProps {
  onApply: (filter: string) => void;
}
export const TodoFilter: React.FC<TodoFilterProps> = ({ onApply }) => {
  const filters = [
    { id: "all", value: "all", label: "All" },
    { id: "completed", value: "completed", label: "Completed" },
    { id: "pending", value: "pending", label: "Pending" },
  ];

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onApply(event.target.value);
  };

  return (
    <div>
      <label htmlFor="filter">Filter Todos:</label>
      <select id="filter" onChange={handleFilterChange}>
        {filters.map((filter) => (
          <option key={filter.id} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </div>
  );
};
