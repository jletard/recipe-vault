// src/components/SearchBar.tsx
// Displays a search input box for filtering recipes by name.

"use client";

import { ChangeEvent } from "react";

interface SearchBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({ searchText, onSearchChange }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="w-full max-w-md mb-6">
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search recipes..."
        className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
      />
    </div>
  );
}
