'use client';

import CompanyCard from './company-card';
import type { Company } from '@/lib/types';

interface CompanyGridProps {
  companies: Company[];
}

export default function CompanyGrid({ companies }: CompanyGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}
