"use client";

import { useMemo, useState, useEffect } from "react";
import { employees } from "@/lib/employees";
import { analyzeEmployees } from "@/lib/analytics";
import { useHRAnalysis } from "@/lib/hooks/useHRAnalysis";
import Filters, { FilterValues } from "@/components/filters";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

/**
 * Renders the Human Capital Intelligence dashboard with HR metrics, interactive filters, visualizations, and AI-generated risk alerts and HR recommendations.
 *
 * The component computes analytics from the employee dataset, triggers AI analysis on mount and when analytics change, and exposes manual refresh controls for risk alerts and HR recommendations.
 *
 * @returns The JSX element for the Human Capital Intelligence dashboard
 */
export default function HumanCapitalPage() {
  const [filters, setFilters] = useState<FilterValues>({
    industry: "All",
    seniority: "All",
  });
  
  const { 
    data: hrData, 
    loadingRiskAlerts, 
    loadingRecommendations, 
    error: hrError, 
    generateRiskAlerts,
    generateHRRecommendations,
    generateAll 
  } = useHRAnalysis();

  const analytics = useMemo(() => {
    return analyzeEmployees(employees, filters);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const seniorityTotal = analytics.seniorityDistribution.reduce((sum, item) => sum + item.count, 0);
  const seniorityPercentages = analytics.seniorityDistribution.map((item) => ({
    name: item.seniority,
    value: item.count,
    percentage: seniorityTotal > 0 ? ((item.count / seniorityTotal) * 100).toFixed(1) : "0.0",
  }));

  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  // Generate AI analysis on mount and when analytics change
  useEffect(() => {
    generateAll(analytics);
  }, [analytics, generateAll]);

  // Handlers for manual refresh of each section
  const handleRefreshRiskAlerts = () => {
    generateRiskAlerts(analytics);
  };

  const handleRefreshHRRecommendations = () => {
    generateHRRecommendations(analytics);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Human Capital Intelligence
        </h1>
        <p className="text-muted-foreground mt-1">
          HR Metrics & Workforce Analytics
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
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-3xl font-bold">{analytics.totalEmployees}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <p className="text-sm text-muted-foreground">Critical Skill Gaps</p>
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
                    <p>Skills with <span className="font-bold text-red-300">&lt;5 employees</span>. These skills have insufficient coverage and represent recruitment priorities.</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                  </div>
                </div>
              </div>
              <p className="text-3xl font-bold">{analytics.criticalSkillGaps}</p>
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
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Seniority Distribution</p>
              <p className="text-lg font-bold">
                {analytics.seniorityDistribution.length > 0
                  ? analytics.seniorityDistribution[0].seniority
                  : "N/A"}
              </p>
              <p className="text-xs text-muted-foreground">Most Common</p>
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
                <p className="text-sm text-muted-foreground">High-Risk Skills</p>
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
                    <p>Skills where <span className="font-bold text-orange-300">&gt;70% are Senior</span> level (min 3 employees). Risk: knowledge loss if seniors leave.</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                  </div>
                </div>
              </div>
              <p className="text-3xl font-bold">{analytics.concentratedExpertise.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Technology Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.skillDistribution.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Seniority Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={seniorityPercentages}
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
                {seniorityPercentages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* AI Error Alert */}
      {hrError && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">AI Analysis Error</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">{hrError}. Using static analysis.</p>
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
                className="h-5 w-5 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Risk & Gap Alerts
              {hrData?.riskAlerts && hrData.riskAlerts.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full">
                  AI
                </span>
              )}
            </h3>
            <button
              onClick={handleRefreshRiskAlerts}
              disabled={loadingRiskAlerts}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-700 dark:text-red-300 bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Generate new AI alerts"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3.5 w-3.5 ${loadingRiskAlerts ? 'animate-spin' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              {loadingRiskAlerts ? 'Generating...' : 'Refresh'}
            </button>
          </div>
          {loadingRiskAlerts && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-200 flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating AI-powered risk alerts...
              </p>
            </div>
          )}

          <div className="space-y-3">
            {hrData?.riskAlerts && hrData.riskAlerts.length > 0 ? (
              hrData.riskAlerts.map((alert, index) => (
                <div key={index} className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900">
                  <p className="text-sm leading-relaxed text-red-800 dark:text-red-200">{alert}</p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 dark:bg-gray-950/20 rounded-lg border border-gray-200 dark:border-gray-900">
                <p className="text-sm text-muted-foreground text-center py-4">
                  Click the Refresh button to generate AI-powered risk alerts
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
              HR Recommendations
              {hrData?.hrRecommendations && hrData.hrRecommendations.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  AI
                </span>
              )}
            </h3>
            <button
              onClick={handleRefreshHRRecommendations}
              disabled={loadingRecommendations}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Generate new HR recommendations"
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
                Generating AI-powered HR recommendations...
              </p>
            </div>
          )}

          <div className="space-y-3">
            {hrData?.hrRecommendations && hrData.hrRecommendations.length > 0 ? (
              hrData.hrRecommendations.map((recommendation, index) => (
                <div key={index} className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-200">{recommendation}</p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 dark:bg-gray-950/20 rounded-lg border border-gray-200 dark:border-gray-900">
                <p className="text-sm text-muted-foreground text-center py-4">
                  Click the Refresh button to generate AI-powered HR recommendations
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}