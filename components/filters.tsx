"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FilterValues {
  industry: string;
  seniority: string;
}

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [industry, setIndustry] = useState<string>("All");
  const [seniority, setSeniority] = useState<string>("All");

  const handleIndustryChange = (value: string) => {
    setIndustry(value);
    onFilterChange({ industry: value, seniority });
  };

  const handleSeniorityChange = (value: string) => {
    setSeniority(value);
    onFilterChange({ industry, seniority: value });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-6 bg-card rounded-2xl shadow-sm border border-border">
      <div className="flex items-center gap-3">
        <label htmlFor="industry-filter" className="text-sm font-medium">
          Industry:
        </label>
        <Select value={industry} onValueChange={handleIndustryChange}>
          <SelectTrigger id="industry-filter" className="w-[180px]">
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Fintech">Fintech</SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Logistics">Logistics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="seniority-filter" className="text-sm font-medium">
          Seniority:
        </label>
        <Select value={seniority} onValueChange={handleSeniorityChange}>
          <SelectTrigger id="seniority-filter" className="w-[180px]">
            <SelectValue placeholder="Select seniority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Junior">Junior</SelectItem>
            <SelectItem value="Mid">Mid</SelectItem>
            <SelectItem value="Senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
