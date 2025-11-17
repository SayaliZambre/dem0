'use client';

import { Search, X } from 'lucide-react';
import type { SortBy } from '@/lib/types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  sortBy: SortBy;
  onSortChange: (sort: SortBy) => void;
  onReset: () => void;
  resultCount: number;
}

const industries = [
  'all',
  'Technology',
  'Finance',
  'Healthcare',
  'Retail',
  'Manufacturing',
];
const locations = [
  'all',
  'New York',
  'San Francisco',
  'London',
  'Tokyo',
  'Singapore',
];

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedIndustry,
  onIndustryChange,
  selectedLocation,
  onLocationChange,
  sortBy,
  onSortChange,
  onReset,
  resultCount,
}: FilterBarProps) {
  const isFiltered =
    searchQuery ||
    selectedIndustry !== 'all' ||
    selectedLocation !== 'all' ||
    sortBy !== 'name';

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search companies by name or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <select
          value={selectedIndustry}
          onChange={(e) => onIndustryChange(e.target.value)}
          className="rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry === 'all' ? 'All Industries' : industry}
            </option>
          ))}
        </select>

        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location === 'all' ? 'All Locations' : location}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortBy)}
          className="rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          <option value="name">Sort by Name</option>
          <option value="employees">Sort by Employees</option>
          <option value="founded">Sort by Year Founded</option>
        </select>

        <div className="flex gap-2">
          {isFiltered && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-foreground hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-end rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">
          {resultCount} result{resultCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
