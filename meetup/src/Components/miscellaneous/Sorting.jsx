import { useState } from "react";

export default function SortDropdown({ onSortChange }) {
  const [sortOption, setSortOption] = useState("");
  console.log(sortOption);

  const handleChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onSortChange(value); // send selected sort to parent
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-gray-600 font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">-- Select --</option>
        <option value="dateAsc">Date: Oldest First</option>
        <option value="dateDesc">Date: Newest First</option>
        <option value="popularityDesc">Popularity: Most</option>
        <option value="popularityAsc">Popularity: Least</option>
      </select>
    </div>
  );
}
