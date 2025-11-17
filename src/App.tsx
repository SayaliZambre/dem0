'use client';

import { useState, useMemo } from 'react';
import Header from './components/header';
import FilterBar from './components/filter-bar';
import CompanyGrid from './components/company-grid';
import Pagination from './components/pagination';
import { mockCompanies } from './lib/mock-data';
import type { Company, SortBy } from './lib/types';

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    let result = mockCompanies.filter((company: Company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry =
        selectedIndustry === 'all' || company.industry === selectedIndustry;
      const matchesLocation =
        selectedLocation === 'all' || company.location === selectedLocation;

      return matchesSearch && matchesIndustry && matchesLocation;
    });

    // Sort
    result.sort((a: Company, b: Company) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'employees':
          return b.employees - a.employees;
        case 'founded':
          return b.founded - a.founded;
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedIndustry, selectedLocation, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedCompanies.length / ITEMS_PER_PAGE
  );
  const paginatedCompanies = filteredAndSortedCompanies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleReset = () => {
    setSearchQuery('');
    setSelectedIndustry('all');
    setSelectedLocation('all');
    setSortBy('name');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={handleReset}
          resultCount={filteredAndSortedCompanies.length}
        />

        {paginatedCompanies.length > 0 ? (
          <>
            <CompanyGrid companies={paginatedCompanies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">
              No companies found. Try adjusting your filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
