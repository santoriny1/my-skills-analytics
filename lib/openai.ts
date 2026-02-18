import OpenAI from "openai";
import { AnalyticsResult } from "./analytics";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Extracts JSON text from a string that may be wrapped in Markdown code fences and parses it.
 *
 * @param content - AI response text which may include surrounding ``` or ```json code fences
 * @returns The value produced by parsing the extracted JSON
 * @throws SyntaxError if the extracted text is not valid JSON
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
 * Generate 3–5 concise, actionable risk and skill-gap alerts derived from workforce analytics.
 *
 * @param analytics - Workforce analytics containing totals, active technologies, top industry, critical skill gaps, skill distribution, skillGaps, and concentratedExpertise used to frame the alerts.
 * @returns An array of risk alert strings (typically 3–5). On invalid AI output an empty array is returned; on request failure a single-item array containing a configuration fallback message is returned.
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
 * Produce 4–6 strategic, data-driven workforce planning insights based on provided analytics.
 *
 * @param analytics - Workforce analytics used to identify opportunities, risks, and recommendations (e.g., totalEmployees, activeTechnologies, industry and skill distributions, critical skill gaps, concentrated expertise)
 * @returns An array of 4–6 concise insight strings; on failure returns an array containing a single fallback message indicating an AI/configuration issue
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
 * Generate risk alerts and strategic insights concurrently.
 *
 * @param analytics - Workforce analytics used to drive generation of alerts and insights
 * @returns An object with `riskAlerts` (array of actionable risk alert strings) and `strategicInsights` (array of strategic recommendation strings)
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
 * Produce 3–5 specific, implementable HR recommendations based on provided workforce analytics.
 *
 * Uses workforce metrics (staff counts, skill gaps, concentrated senior expertise, seniority distribution)
 * to produce concise, actionable recommendations that address talent development, retention, or recruitment
 * and include concrete next steps.
 *
 * @param analytics - Workforce analytics used to tailor recommendations (total employees, skill gaps, concentrated expertise, seniority distribution, etc.)
 * @returns An array of 3–5 actionable HR recommendation strings; returns an empty array or a single fallback message on failure.
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
 * Generate one actionable marketing insight for each provided strong industry vertical.
 *
 * For each entry in `strongVerticals`, returns an object containing the industry's name and a 1–2 sentence marketing insight focused on positioning, differentiation, go-to-market opportunities, or client success potential.
 *
 * @param analytics - Workforce analytics (used to surface top technologies and context for insights)
 * @param strongVerticals - Array of strong verticals (each with `industry` and `count` of employees)
 * @returns An array of objects with `{ industry: string; insight: string }`, one entry per supplied strong vertical
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
 * Generate one actionable growth opportunity for each provided weak industry vertical.
 *
 * Uses the provided analytics to inform recommendations and returns one object per input vertical.
 *
 * @param analytics - Workforce analytics used to contextualize recommendations (e.g., skill distribution).
 * @param weakVerticals - Array of weak verticals to analyze; each item must include `industry` and `count`.
 * @returns An array of objects with fields `industry` (the original industry name) and `opportunity` (a 1–2 sentence, actionable recommendation). If `weakVerticals` is empty, returns an empty array. On failure, returns one fallback opportunity object per input vertical indicating an AI/configuration issue.
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
 * Produce strategic, actionable marketing recommendations tailored to the provided workforce and market data.
 *
 * Uses analytics (top technologies, total employees, industry distribution) and lists of strong and weak verticals
 * to generate 4–6 concise (1–2 sentence) recommendations covering positioning, expansion, differentiation, content,
 * acquisition priorities, and partnerships.
 *
 * @param analytics - Workforce and market analytics (e.g., topTechnologies, totalEmployees, industryDistribution)
 * @param strongVerticals - Array of verticals with strong presence (industry and employee count) to inform targeted recommendations
 * @param weakVerticals - Array of verticals with weak presence (industry and employee count) to identify growth opportunities
 * @returns An array of recommendation strings (typically 4–6). On failure returns a single-item array with a fallback error message. */
export async function generateMarketingRecommendations(
  analytics: AnalyticsResult,
  strongVerticals: Array<{ industry: string; count: number }>,
  weakVerticals: Array<{ industry: string; count: number }>
): Promise<string[]> {
  const prompt = `You are a marketing strategy consultant. Generate 4-6 strategic marketing recommendations.

MARKET POSITION:
- Strong Verticals: ${strongVerticals.map(v => `${v.industry} (${v.count} employees)`).join(', ')}
- Weak Verticals: ${weakVerticals.map(v => `${v.industry} (${v.count} employees)`).join(', ')}
- Top Technologies: ${(analytics.topTechnologies || []).slice(0, 5).join(', ')}
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