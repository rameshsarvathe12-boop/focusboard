import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar" role="search">
      <Search size={14} className="search-icon" aria-hidden="true" />
      <input
        type="search"
        className="search-input"
        placeholder="Search tasks…"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search tasks by title"
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
          type="button"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
