import { Employee } from "./employees";

export interface SkillDistribution {
  skill: string;
  count: number;
}

export interface IndustryDistribution {
  industry: string;
  count: number;
}

export interface SkillGap {
  skill: string;
  count: number;
}

export interface ConcentratedExpertise {
  skill: string;
  totalCount: number;
  seniorCount: number;
  percentage: number;
}

export interface AnalyticsResult {
  totalEmployees: number;
  activeTechnologies: number;
  topIndustry: string;
  criticalSkillGaps: number;
  skillDistribution: SkillDistribution[];
  industryDistribution: IndustryDistribution[];
  skillGaps: SkillGap[];
  concentratedExpertise: ConcentratedExpertise[];
}

export function analyzeEmployees(employees: Employee[]): AnalyticsResult {
  const totalEmployees = employees.length;

  // Count skill distribution
  const skillMap = new Map<string, number>();
  const skillBySeniority = new Map<string, { total: number; senior: number }>();
  
  employees.forEach((emp) => {
    emp.skills.forEach((skill) => {
      skillMap.set(skill, (skillMap.get(skill) || 0) + 1);
      
      const seniorityData = skillBySeniority.get(skill) || { total: 0, senior: 0 };
      seniorityData.total += 1;
      if (emp.seniority === "Senior") {
        seniorityData.senior += 1;
      }
      skillBySeniority.set(skill, seniorityData);
    });
  });

  const skillDistribution: SkillDistribution[] = Array.from(skillMap.entries())
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count);

  const activeTechnologies = skillDistribution.length;

  // Count industry distribution
  const industryMap = new Map<string, number>();
  employees.forEach((emp) => {
    emp.industries.forEach((industry) => {
      industryMap.set(industry, (industryMap.get(industry) || 0) + 1);
    });
  });

  const industryDistribution: IndustryDistribution[] = Array.from(industryMap.entries())
    .map(([industry, count]) => ({ industry, count }))
    .sort((a, b) => b.count - a.count);

  const topIndustry = industryDistribution[0]?.industry || "N/A";

  // Detect critical skill gaps (skills with < 5 employees)
  const skillGaps: SkillGap[] = skillDistribution
    .filter((item) => item.count < 5)
    .map((item) => ({ skill: item.skill, count: item.count }));

  const criticalSkillGaps = skillGaps.length;

  // Detect concentrated expertise (skills owned mostly by seniors > 70%)
  const concentratedExpertise: ConcentratedExpertise[] = Array.from(skillBySeniority.entries())
    .map(([skill, data]) => ({
      skill,
      totalCount: data.total,
      seniorCount: data.senior,
      percentage: (data.senior / data.total) * 100
    }))
    .filter((item) => item.percentage > 70 && item.totalCount >= 3)
    .sort((a, b) => b.percentage - a.percentage);

  return {
    totalEmployees,
    activeTechnologies,
    topIndustry,
    criticalSkillGaps,
    skillDistribution,
    industryDistribution,
    skillGaps,
    concentratedExpertise
  };
}

export function generateInsights(analytics: AnalyticsResult): string[] {
  const insights: string[] = [];

  // Insight 1: AI/ML expertise
  const aiMLSkill = analytics.skillDistribution.find(
    (s) => s.skill === "AI/ML"
  );
  if (aiMLSkill && aiMLSkill.count < 8) {
    insights.push(
      `Limited AI/ML expertise detected (${aiMLSkill.count} employees). Consider upskilling initiatives or strategic hiring to support AI transformation goals.`
    );
  } else if (!aiMLSkill) {
    insights.push(
      "No AI/ML expertise detected. Consider building AI capabilities through training programs or external partnerships."
    );
  }

  // Insight 2: Industry coverage
  const healthcareIndustry = analytics.industryDistribution.find(
    (i) => i.industry === "Healthcare"
  );
  if (healthcareIndustry && healthcareIndustry.count < 10) {
    insights.push(
      `Healthcare industry coverage is undersized (${healthcareIndustry.count} employees). Scale talent pool to capture growing market opportunities.`
    );
  }

  // Insight 3: Critical skill gaps
  if (analytics.criticalSkillGaps > 0) {
    const criticalSkills = analytics.skillGaps.map((s) => s.skill).join(", ");
    insights.push(
      `${analytics.criticalSkillGaps} critical skill gap(s) identified: ${criticalSkills}. Single points of failure pose operational risk.`
    );
  }

  // Insight 4: Concentrated expertise risk
  if (analytics.concentratedExpertise.length > 0) {
    const topRisk = analytics.concentratedExpertise[0];
    insights.push(
      `${topRisk.skill} expertise is heavily concentrated in senior staff (${topRisk.percentage.toFixed(0)}%). Implement knowledge transfer programs to mitigate succession risk.`
    );
  }

  // Insight 5: DevOps maturity
  const devOpsSkill = analytics.skillDistribution.find(
    (s) => s.skill === "DevOps"
  );
  if (devOpsSkill && devOpsSkill.count > 8) {
    insights.push(
      `Strong DevOps capability (${devOpsSkill.count} employees) positions the organization well for cloud-native transformation and accelerated delivery cycles.`
    );
  }

  // Insight 6: Cloud strategy
  const azureSkill = analytics.skillDistribution.find((s) => s.skill === "Azure");
  const awsSkill = analytics.skillDistribution.find((s) => s.skill === "AWS");
  
  if (azureSkill && awsSkill) {
    const total = azureSkill.count + awsSkill.count;
    const azurePercent = ((azureSkill.count / total) * 100).toFixed(0);
    const awsPercent = ((awsSkill.count / total) * 100).toFixed(0);
    
    if (Math.abs(azureSkill.count - awsSkill.count) <= 3) {
      insights.push(
        `Balanced multi-cloud expertise (Azure: ${azurePercent}%, AWS: ${awsPercent}%) enables vendor-agnostic cloud strategy and negotiation leverage.`
      );
    } else if (azureSkill.count > awsSkill.count) {
      insights.push(
        `Azure-dominant cloud expertise (${azurePercent}% vs ${awsPercent}% AWS). Consider AWS upskilling for multi-cloud resilience.`
      );
    } else {
      insights.push(
        `AWS-dominant cloud expertise (${awsPercent}% vs ${azurePercent}% Azure). Consider Azure upskilling for multi-cloud resilience.`
      );
    }
  }

  return insights;
}
