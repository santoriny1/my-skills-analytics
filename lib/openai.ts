import OpenAI from "openai";
import { AnalyticsResult } from "./analytics";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Helper function to clean and parse JSON from OpenAI responses
 * OpenAI sometimes wraps JSON in markdown code blocks like ```json...```
 */
function parseAIResponse(content: string): any {
  // Remove markdown code blocks if present
  let cleaned = content.trim();
  
  // Remove ```json or ``` from start
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.substring(3);
  }
  
  // Remove ``` from end
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  
  // Trim again after removing code blocks
  cleaned = cleaned.trim();
  
  return JSON.parse(cleaned);
}

/**
 * Generate AI-powered risk and gap alerts based on workforce analytics
 */
export async function generateRiskAlerts(
  analytics: AnalyticsResult
): Promise<string[]> {
  const prompt = `You are a workforce analytics expert. Analyze the following employee data and generate 3-5 critical risk and gap alerts.

WORKFORCE DATA:
- Total Employees: ${analytics.totalEmployees}
- Active Technologies: ${analytics.activeTechnologies}
- Top Industry: ${analytics.topIndustry}
- Critical Skill Gaps: ${analytics.criticalSkillGaps}

SKILL DISTRIBUTION:
${analytics.skillDistribution.map(s => `- ${s.skill}: ${s.count} employees`).join('\n')}

SKILL GAPS (Critical):
${analytics.skillGaps.length > 0 
  ? analytics.skillGaps.map(g => `- ${g.skill}: Only ${g.count} employee(s)`).join('\n')
  : 'No critical skill gaps detected'}

CONCENTRATED EXPERTISE (Risk of knowledge loss):
${analytics.concentratedExpertise.length > 0
  ? analytics.concentratedExpertise.map(c => `- ${c.skill}: ${c.percentage.toFixed(0)}% owned by seniors (${c.seniorCount}/${c.totalCount})`).join('\n')
  : 'No concentrated expertise risks detected'}

INSTRUCTIONS:
Generate 3-5 specific, actionable risk alerts. Each alert should:
1. Identify a critical risk or gap
2. Explain the business impact
3. Be concise (1-2 sentences max)
4. Focus on urgent issues that require immediate attention

Return ONLY a JSON array of strings, nothing else. Example format:
["Alert 1 text here", "Alert 2 text here", "Alert 3 text here"]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a workforce analytics expert specializing in identifying critical risks and skill gaps. Always respond with valid JSON arrays of strings."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    // Parse the JSON response
    const alerts = parseAIResponse(content);
    return Array.isArray(alerts) ? alerts : [];
  } catch (error) {
    console.error("Error generating risk alerts:", error);
    // Return fallback alerts
    return [
      "Unable to generate AI-powered alerts. Please check your OpenAI API configuration.",
    ];
  }
}

/**
 * Generate AI-powered strategic insights based on workforce analytics
 */
export async function generateStrategicInsights(
  analytics: AnalyticsResult
): Promise<string[]> {
  const prompt = `You are a strategic workforce planning consultant. Analyze the following employee data and generate 4-6 strategic insights and recommendations.

WORKFORCE DATA:
- Total Employees: ${analytics.totalEmployees}
- Active Technologies: ${analytics.activeTechnologies}
- Top Industry: ${analytics.topIndustry}
- Critical Skill Gaps: ${analytics.criticalSkillGaps}

SKILL DISTRIBUTION:
${analytics.skillDistribution.map(s => `- ${s.skill}: ${s.count} employees`).join('\n')}

INDUSTRY DISTRIBUTION:
${analytics.industryDistribution.map(i => `- ${i.industry}: ${i.count} employees`).join('\n')}

SKILL GAPS:
${analytics.skillGaps.length > 0 
  ? analytics.skillGaps.map(g => `- ${g.skill}: Only ${g.count} employee(s)`).join('\n')
  : 'No critical skill gaps detected'}

CONCENTRATED EXPERTISE:
${analytics.concentratedExpertise.length > 0
  ? analytics.concentratedExpertise.map(c => `- ${c.skill}: ${c.percentage.toFixed(0)}% owned by seniors`).join('\n')
  : 'No concentrated expertise risks detected'}

INSTRUCTIONS:
Generate 4-6 strategic insights and recommendations. Each insight should:
1. Identify opportunities or strategic patterns
2. Provide actionable recommendations
3. Focus on long-term workforce planning and competitive advantage
4. Consider market trends and business growth
5. Be specific and data-driven (1-2 sentences)

Return ONLY a JSON array of strings, nothing else. Example format:
["Insight 1 text here", "Insight 2 text here", "Insight 3 text here"]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a strategic workforce planning consultant with expertise in technology trends, talent development, and competitive positioning. Always respond with valid JSON arrays of strings."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    // Parse the JSON response
    const insights = parseAIResponse(content);
    return Array.isArray(insights) ? insights : [];
  } catch (error) {
    console.error("Error generating strategic insights:", error);
    // Return fallback insights
    return [
      "Unable to generate AI-powered insights. Please check your OpenAI API configuration.",
    ];
  }
}

/**
 * Generate both risk alerts and strategic insights in parallel
 */
export async function generateAIAnalysis(analytics: AnalyticsResult): Promise<{
  riskAlerts: string[];
  strategicInsights: string[];
}> {
  const [riskAlerts, strategicInsights] = await Promise.all([
    generateRiskAlerts(analytics),
    generateStrategicInsights(analytics),
  ]);

  return {
    riskAlerts,
    strategicInsights,
  };
}

/**
 * Generate AI-powered HR recommendations based on workforce analytics
 */
export async function generateHRRecommendations(
  analytics: AnalyticsResult
): Promise<string[]> {
  const prompt = `You are an HR strategy consultant. Analyze the following workforce data and generate 3-5 actionable HR recommendations.

WORKFORCE DATA:
- Total Employees: ${analytics.totalEmployees}
- Critical Skill Gaps: ${analytics.criticalSkillGaps}
- High-Risk Skills (concentrated in seniors): ${analytics.concentratedExpertise.length}

SKILL GAPS:
${analytics.skillGaps.length > 0 
  ? analytics.skillGaps.map(g => `- ${g.skill}: Only ${g.count} employee(s)`).join('\n')
  : 'No critical skill gaps'}

CONCENTRATED EXPERTISE:
${analytics.concentratedExpertise.length > 0
  ? analytics.concentratedExpertise.map(c => `- ${c.skill}: ${c.percentage.toFixed(0)}% seniors (${c.seniorCount}/${c.totalCount})`).join('\n')
  : 'No concentration risks'}

SENIORITY DISTRIBUTION:
${analytics.seniorityDistribution?.map(s => `- ${s.seniority}: ${s.count} employees`).join('\n') || 'Not available'}

INSTRUCTIONS:
Generate 3-5 specific, actionable HR recommendations. Each should:
1. Address talent development, retention, or recruitment needs
2. Provide concrete next steps
3. Be specific and implementable (1-2 sentences)
4. Focus on strategic workforce planning

Return ONLY a JSON array of strings.
["Recommendation 1", "Recommendation 2", "Recommendation 3"]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an HR strategy consultant specializing in talent development, knowledge management, and workforce planning. Always respond with valid JSON arrays of strings."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    const recommendations = parseAIResponse(content);
    return Array.isArray(recommendations) ? recommendations : [];
  } catch (error) {
    console.error("Error generating HR recommendations:", error);
    return ["Unable to generate AI-powered HR recommendations. Please check your OpenAI API configuration."];
  }
}

/**
 * Generate AI-powered marketing insights for strong verticals
 */
export async function generateStrongVerticalsInsights(
  analytics: AnalyticsResult,
  strongVerticals: Array<{ industry: string; count: number }>
): Promise<Array<{ industry: string; insight: string }>> {
  if (strongVerticals.length === 0) {
    return [];
  }

  const prompt = `You are a go-to-market strategy consultant. Analyze strong industry verticals and generate specific insights for each.

STRONG VERTICALS (8+ employees):
${strongVerticals.map(v => `- ${v.industry}: ${v.count} employees`).join('\n')}

TOP TECHNOLOGIES:
${analytics.skillDistribution.slice(0, 10).map(s => `- ${s.skill}: ${s.count} employees`).join('\n')}

INSTRUCTIONS:
For each strong vertical listed above, generate ONE specific, actionable marketing insight (1-2 sentences).
Focus on market positioning advantages, competitive differentiation, go-to-market opportunities, and client success potential.

IMPORTANT: You must return a JSON array of objects. Each object must have exactly two fields: "industry" and "insight".
Do NOT return an object with category keys. Return an array like this:

[
  {"industry": "Fintech", "insight": "Leverage deep Azure and .NET expertise to position as premier partner for financial services digital transformation."},
  {"industry": "Healthcare", "insight": "Strong AI/ML capabilities create differentiation for healthcare analytics and predictive modeling solutions."}
]

Return ONLY valid JSON array format, nothing else.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a go-to-market strategy consultant. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    const insights = parseAIResponse(content);
    
    // Validate that we received an array, not an object
    if (!Array.isArray(insights)) {
      console.error("OpenAI returned invalid format (object instead of array):", insights);
      throw new Error("Invalid response format from OpenAI");
    }
    
    // Validate each item has the correct structure
    const validInsights = insights.filter(
      item => item && typeof item === 'object' && 'industry' in item && 'insight' in item
    );
    
    return validInsights;
  } catch (error) {
    console.error("Error generating strong verticals insights:", error);
    return strongVerticals.map(v => ({
      industry: v.industry,
      insight: "Unable to generate AI insight. Please check OpenAI configuration."
    }));
  }
}

/**
 * Generate AI-powered opportunities for weak verticals
 */
export async function generateWeakVerticalsOpportunities(
  analytics: AnalyticsResult,
  weakVerticals: Array<{ industry: string; count: number }>
): Promise<Array<{ industry: string; opportunity: string }>> {
  if (weakVerticals.length === 0) {
    return [];
  }

  const prompt = `You are a business strategy consultant. Analyze weak industry verticals and identify growth opportunities.

WEAK VERTICALS (<5 employees):
${weakVerticals.map(v => `- ${v.industry}: ${v.count} employees`).join('\n')}

AVAILABLE TECHNOLOGIES:
${analytics.skillDistribution.slice(0, 10).map(s => `- ${s.skill}: ${s.count} employees`).join('\n')}

INSTRUCTIONS:
For each weak vertical listed above, generate ONE specific opportunity recommendation (1-2 sentences).
Consider aspects like strategic partnerships, talent acquisition, market entry strategies, and risk mitigation.

IMPORTANT: You must return a JSON array of objects. Each object must have exactly two fields: "industry" and "opportunity".
Do NOT return an object with category keys. Return an array like this:

[
  {"industry": "Healthcare", "opportunity": "Consider strategic partnerships with healthcare firms to expand capacity while recruiting specialized talent."},
  {"industry": "Retail", "opportunity": "Leverage existing React and Node.js expertise to enter retail e-commerce market through targeted hiring."}
]

Return ONLY valid JSON array format, nothing else.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a business strategy consultant specializing in market expansion and risk management. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    const opportunities = parseAIResponse(content);
    
    // Validate that we received an array, not an object
    if (!Array.isArray(opportunities)) {
      console.error("OpenAI returned invalid format (object instead of array):", opportunities);
      throw new Error("Invalid response format from OpenAI");
    }
    
    // Validate each item has the correct structure
    const validOpportunities = opportunities.filter(
      item => item && typeof item === 'object' && 'industry' in item && 'opportunity' in item
    );
    
    return validOpportunities;
  } catch (error) {
    console.error("Error generating weak verticals opportunities:", error);
    return weakVerticals.map(v => ({
      industry: v.industry,
      opportunity: "Unable to generate AI opportunity. Please check OpenAI configuration."
    }));
  }
}

/**
 * Generate AI-powered strategic marketing recommendations
 */
export async function generateMarketingRecommendations(
  analytics: AnalyticsResult,
  strongVerticals: Array<{ industry: string; count: number }>,
  weakVerticals: Array<{ industry: string; count: number }>
): Promise<string[]> {
  const prompt = `You are a marketing strategy consultant. Generate 4-6 strategic marketing recommendations.

MARKET POSITION:
- Strong Verticals: ${strongVerticals.map(v => `${v.industry} (${v.count} employees)`).join(', ')}
- Weak Verticals: ${weakVerticals.map(v => `${v.industry} (${v.count} employees)`).join(', ')}
- Top Technologies: ${analytics.topTechnologies.slice(0, 5).join(', ')}
- Total Employees: ${analytics.totalEmployees}

INDUSTRY DISTRIBUTION:
${analytics.industryDistribution.map(i => `- ${i.industry}: ${i.count} employees`).join('\n')}

INSTRUCTIONS:
Generate 4-6 strategic marketing recommendations focusing on:
1. Brand positioning and messaging
2. Market expansion strategies
3. Competitive differentiation
4. Content marketing and thought leadership
5. Client acquisition priorities
6. Partnership and alliance opportunities

Each recommendation should be specific, actionable, and 1-2 sentences.

Return ONLY a JSON array of strings:
["Recommendation 1", "Recommendation 2", ...]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a marketing strategy consultant specializing in B2B technology services. Always respond with valid JSON arrays of strings."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    const recommendations = parseAIResponse(content);
    return Array.isArray(recommendations) ? recommendations : [];
  } catch (error) {
    console.error("Error generating marketing recommendations:", error);
    return ["Unable to generate AI-powered marketing recommendations. Please check your OpenAI API configuration."];
  }
}
