"use client";

import { useMemo, useState, useEffect } from "react";
import { employees } from "@/lib/employees";
import { analyzeEmployees } from "@/lib/analytics";
import { useMarketingAnalysis } from "@/lib/hooks/useMarketingAnalysis";
import Filters, { FilterValues } from "@/components/filters";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function MarketingPage() {
  const [filters, setFilters] = useState<FilterValues>({
    industry: "All",
    seniority: "All",
  });
  
  const { 
    data: marketingData, 
    loadingStrongVerticals,
    loadingWeakVerticals,
    loadingRecommendations,
    error: marketingError, 
    generateStrongVerticals,
    generateWeakVerticals,
    generateMarketingRecommendations,
    generateAll 
  } = useMarketingAnalysis();

  const analytics = useMemo(() => {
    return analyzeEmployees(employees, filters);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  // Filter employees to match current filters
  const filteredEmployees = useMemo(() => {
    let filtered = employees;
    
    if (filters.industry && filters.industry !== "All") {
      filtered = filtered.filter((emp) => emp.industries.includes(filters.industry as string));
    }
    
    if (filters.seniority && filters.seniority !== "All") {
      filtered = filtered.filter((emp) => emp.seniority === filters.seniority);
    }
    
    return filtered;
  }, [filters]);

  // Calculate unique employees with at least 1 industry assigned
  const employeesWithIndustry = filteredEmployees.filter(emp => emp.industries.length > 0).length;
  const industryCoveragePercent = analytics.totalEmployees > 0 
    ? ((employeesWithIndustry / analytics.totalEmployees) * 100).toFixed(1)
    : "0.0";

  const totalIndustryCoverage = analytics.industryDistribution.reduce((sum, item) => sum + item.count, 0);

  const industryPercentages = analytics.industryDistribution.map((item) => {
    const percentageValue = totalIndustryCoverage > 0 ? (item.count / totalIndustryCoverage) * 100 : 0;
    return {
      name: item.industry,
      value: item.count,
      percentage: percentageValue.toFixed(1),
    };
  });

  const techStrengthByIndustry = analytics.industryDistribution.slice(0, 5).map((industry) => {
    const industryEmployees = employees.filter((emp) =>
      emp.industries.includes(industry.industry)
    );
    const techCount = new Set(
      industryEmployees.flatMap((emp) => emp.skills)
    ).size;
    return {
      industry: industry.industry,
      technologies: techCount,
      employees: industry.count,
    };
  });

  const strongVerticals = useMemo(() => 
    analytics.industryDistribution.filter((item) => item.count >= 8),
    [analytics.industryDistribution]
  );
  
  const weakVerticals = useMemo(() => 
    analytics.industryDistribution.filter((item) => item.count < 5),
    [analytics.industryDistribution]
  );

  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  // Generate AI analysis on mount and when analytics change
  useEffect(() => {
    generateAll(analytics, strongVerticals, weakVerticals);
  }, [analytics, strongVerticals, weakVerticals, generateAll]);

  // Handlers for manual refresh of each section
  const handleRefreshStrongVerticals = () => {
    generateStrongVerticals(analytics, strongVerticals);
  };

  const handleRefreshWeakVerticals = () => {
    generateWeakVerticals(analytics, weakVerticals);
  };

  const handleRefreshRecommendations = () => {
    generateMarketingRecommendations(analytics, strongVerticals, weakVerticals);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Marketing Intelligence
        </h1>
        <p className="text-muted-foreground mt-1">
          Go-to-Market Insights & Capability Analysis
        </p>
      </div>

      <Filters onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Top Industry</p>
              <p className="text-2xl font-bold">{analytics.topIndustry}</p>
              <p className="text-xs text-muted-foreground">
                {analytics.industryDistribution[0]?.count || 0} employees
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Top Technology</p>
              <p className="text-2xl font-bold">
                {analytics.topTechnologies[0] || "N/A"}
              </p>
              <p className="text-xs text-muted-foreground">
                {analytics.skillDistribution[0]?.count || 0} employees
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <p className="text-sm text-muted-foreground">Industry Coverage</p>
                <div className="group relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-muted-foreground cursor-help"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg z-10">
                    <p className="font-semibold mb-1">How it's calculated:</p>
                    <p>Percentage of employees with <span className="font-bold text-green-300">at least 1 industry</span> assigned. Shows workforce allocation to market verticals.</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                  </div>
                </div>
              </div>
              <p className="text-2xl font-bold">{industryCoveragePercent}%</p>
              <p className="text-xs text-muted-foreground">
                {analytics.industryDistribution.length} industries
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-orange-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <p className="text-sm text-muted-foreground">Capability Gaps</p>
                <div className="group relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-muted-foreground cursor-help"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-3 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg z-10">
                    <p className="font-semibold mb-1">How it's calculated:</p>
                    <p>Industries with <span className="font-bold text-orange-300">&lt;5 employees</span>. These verticals have limited market presence and may require partnerships or scaling.</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                  </div>
                </div>
              </div>
              <p className="text-2xl font-bold">{weakVerticals.length}</p>
              <p className="text-xs text-muted-foreground">Weak verticals</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Industry Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={industryPercentages}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props) => {
                  const entry = props.payload;
                  return `${entry.name}: ${entry.percentage}%`;
                }}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {industryPercentages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Tech Strength by Industry</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={techStrengthByIndustry}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="industry" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="technologies" fill="#8b5cf6" name="Tech Skills" />
              <Bar dataKey="employees" fill="#3b82f6" name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* AI Error Alert */}
      {marketingError && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">AI Analysis Error</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{marketingError}. Using static analysis.</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">Configure OPENAI_API_KEY in .env.local</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Strong Verticals
              {marketingData?.strongVerticalsInsights && marketingData.strongVerticalsInsights.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                  AI
                </span>
              )}
            </h3>
            <button
              onClick={handleRefreshStrongVerticals}
              disabled={loadingStrongVerticals}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-green-700 dark:text-green-300 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Generate new AI insights"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3.5 w-3.5 ${loadingStrongVerticals ? 'animate-spin' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              {loadingStrongVerticals ? 'Generating...' : 'Refresh'}
            </button>
          </div>
          {loadingStrongVerticals && (
            <div className="mb-4 p-3 rounded-lg bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200 flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating AI insights for strong verticals...
              </p>
            </div>
          )}

          <div className="space-y-3">
            {marketingData?.strongVerticalsInsights && marketingData.strongVerticalsInsights.length > 0 ? (
              marketingData.strongVerticalsInsights.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900"
                >
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    {item.industry}
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-2 leading-relaxed">
                    {item.insight}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 dark:bg-gray-950/20 rounded-lg border border-gray-200 dark:border-gray-900">
                <p className="text-sm text-muted-foreground text-center py-4">
                  {strongVerticals.length > 0 
                    ? 'Click the Refresh button to generate AI-powered insights for strong verticals'
                    : 'No strong verticals identified (threshold: 8+ employees)'}
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-orange-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Weak Verticals & Opportunities
              {marketingData?.weakVerticalsOpportunities && marketingData.weakVerticalsOpportunities.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
                  AI
                </span>
              )}
            </h3>
            <button
              onClick={handleRefreshWeakVerticals}
              disabled={loadingWeakVerticals}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-orange-700 dark:text-orange-300 bg-white dark:bg-gray-800 border border-orange-300 dark:border-orange-700 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Generate new AI opportunities"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3.5 w-3.5 ${loadingWeakVerticals ? 'animate-spin' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              {loadingWeakVerticals ? 'Generating...' : 'Refresh'}
            </button>
          </div>
          
          {loadingWeakVerticals && (
            <div className="mb-4 p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-orange-800 dark:text-orange-200 flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating AI opportunities for weak verticals...
              </p>
            </div>
          )}

          <div className="space-y-3">
            {marketingData?.weakVerticalsOpportunities && marketingData.weakVerticalsOpportunities.length > 0 ? (
              marketingData.weakVerticalsOpportunities.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900"
                >
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                    {item.industry}
                  </p>
                  <p className="text-xs text-orange-700 dark:text-orange-300 mt-2 leading-relaxed">
                    {item.opportunity}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 dark:bg-gray-950/20 rounded-lg border border-gray-200 dark:border-gray-900">
                <p className="text-sm text-muted-foreground text-center py-4">
                  {weakVerticals.length > 0 
                    ? 'Click the Refresh button to generate AI-powered opportunities for weak verticals'
                    : 'No weak verticals identified'}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            Strategic Recommendations
            {marketingData?.marketingRecommendations && marketingData.marketingRecommendations.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                AI
              </span>
            )}
          </h3>
          <button
            onClick={handleRefreshRecommendations}
            disabled={loadingRecommendations}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Generate new AI recommendations"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-3.5 w-3.5 ${loadingRecommendations ? 'animate-spin' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            {loadingRecommendations ? 'Generating...' : 'Refresh'}
          </button>
        </div>
        
        {loadingRecommendations && (
          <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating AI-powered strategic recommendations...
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {marketingData?.marketingRecommendations && marketingData.marketingRecommendations.length > 0 ? (
            marketingData.marketingRecommendations.map((recommendation, index) => (
              <div key={index} className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">{recommendation}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full p-4 bg-gray-50 dark:bg-gray-950/20 rounded-lg border border-gray-200 dark:border-gray-900">
              <p className="text-sm text-muted-foreground text-center py-4">
                Click the Refresh button to generate AI-powered strategic recommendations
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
