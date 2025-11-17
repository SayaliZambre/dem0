'use client';

import { MapPin, Users, Building2 } from 'lucide-react';
import type { Company } from '@/lib/types';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="mb-4">
        <div className="mb-2 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground line-clamp-1">
          {company.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{company.industry}</p>
      </div>

      {/* Description */}
      <p className="text-foreground text-sm mb-4 line-clamp-2 flex-grow">
        {company.description}
      </p>

      {/* Meta Information */}
      <div className="space-y-2 mb-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{company.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{company.employees.toLocaleString()} employees</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Founded: <span className="font-medium">{company.founded}</span>
        </div>
      </div>

      {/* Revenue Badge */}
      <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground w-fit">
        ${company.revenue}M Revenue
      </div>
    </div>
  );
}
