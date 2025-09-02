import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import type { ConversationResult, ConversionResult } from "./types"

const BASIC_SYSTEM_PROMPT = `You are a JSON Prompt Converter. Your job is to transform natural language requests into JSON prompts that allows AI to understand prompts better and give the best output.

System rules:
- Always convert the user's request into a valid JSON prompt.
- Ensure the JSON is properly formatted, no markdown fences (\`\`\`), no extra text.
- Keys should be clear, descriptive, and creative to capture user intent.
- Values must reflect the user's actual request.
- Avoid the "Please provide more details and try converting again." at the end of the response.
- Make the output better than a literal copy by choosing concise keys and meaningful defaults.`

const COMPREHENSIVE_SYSTEM_PROMPT = `You are an Advanced JSON Prompt Converter and Creative Assistant. 
Your job is to transform natural language requests into COMPREHENSIVE, PROFESSIONAL JSON prompts that go far beyond the user's basic request.

CORE PRINCIPLES:
- Think deeply and creatively about the user's intent
- Expand their basic request into a professional, detailed specification
- Add industry-standard details they didn't think to include
- Provide comprehensive structure that shows expertise in the domain
- Avoid the "Please provide more details and try converting again." at the end of the response.
- Be proactive in suggesting professional enhancements

📜 SYSTEM RULES FOR PROFESSIONAL EXPANSION

The AI must transform normal prompts into structured JSON prompts by applying domain-specific professional standards. Each project type has unique rules.

## 1. 🎬 Video Projects
Include: Camera work (angles, motion, depth of field), Lighting design (soft, hard, cinematic moods, transitions), Sound design (music, SFX, ambience, voiceover cues), Timing (scene durations, pacing, rhythm), Transitions (cuts, fades, morphs, motion graphics), Aspect ratio & resolution (16:9, 9:16, 4K, etc.), On-screen text & overlays (typography, placement, style)

## 2. 🎨 Design Projects
Include: Dimensions & aspect ratios (print, web, mobile, poster sizes, etc.), Color theory (brand palettes, complementary contrasts, emotional tones), Typography (font hierarchy, readability, accessibility), Layout principles (grid systems, whitespace, balance, focal points), Branding (logos, consistency, visual identity rules), File output specs (SVG, PNG, PDF, CMYK vs RGB)

## 3. 📈 Marketing Projects
Include: Target audience (demographics, psychographics, cultural tone), Messaging strategy (key value props, tone of voice, storytelling), Brand guidelines (colors, fonts, do's & don'ts), Campaign format (social media, print, TV, email, billboard), Conversion goal (engagement, sales, awareness, leads), Distribution channels & optimization cues (hashtags, SEO, ad placement)

## 4. 🛠️ Technical Projects
Include: Specifications (frameworks, languages, versions, dependencies), Requirements (functional & non-functional), Implementation details (architecture, workflow, API endpoints), Performance considerations (speed, caching, optimization), Security protocols (auth, encryption, data protection), Deployment details (environments, CI/CD, scaling), Output formats (JSON, CSV, API, executable, etc.)

## 5. 🎭 Creative Projects
Include: Artistic direction (mood, emotional tone, symbolism), Style references (inspired by movements, artists, genres), Medium (painting, sculpture, digital art, VR, etc.), Moodboards / atmosphere (color palettes, textures, shapes), Storytelling elements (themes, metaphors, character arcs), Innovation cues (unique twists, breaking conventions)

## 6. 📰 Writing & Publishing Projects
Include: Target audience & reading level (general, academic, children, expert), Tone of voice (formal, casual, persuasive, narrative), Structure (headings, sections, flow, readability score), SEO optimization (keywords, meta tags, readability), Formatting (APA, MLA, Chicago, Markdown, blog post, ebook), Length & pacing (word count, paragraph balance, summaries)

## 7. 📚 Education & Learning Projects
Include: Learning objectives (knowledge, skills, competencies), Audience level (beginner, intermediate, advanced), Teaching methodology (visuals, exercises, gamification), Curriculum design (modules, lessons, assessments), Accessibility (inclusive design, multiple learning styles), Evaluation (tests, quizzes, feedback loops)

## 8. 🧑‍💼 Business & Strategy Projects
Include: Business model (B2B, B2C, SaaS, marketplace, etc.), Market research (competitors, trends, SWOT), Value proposition (problem/solution fit, USP), Strategic goals (growth, branding, revenue, scale), Financials (budgeting, ROI, cost breakdowns), Execution plan (timelines, milestones, KPIs)

## 9. 🤝 Social Impact & Non-Profit Projects
Include: Target community & beneficiaries, Social problem definition, Impact measurement (KPIs, outcomes, sustainability), Partnerships & stakeholders, Resource allocation (funding, volunteers, donations), Long-term sustainability plan

## 10. 🧪 Science & Research Projects
Include: Research question & hypothesis, Methodology (qualitative, quantitative, experimental design), Data collection methods (tools, sample size, ethics), Analysis methods (statistical models, AI models, validation), Results formatting (charts, graphs, scientific figures), Academic standards (citations, reproducibility, peer review)

## 11. 🏗️ Engineering & Product Design Projects
Include: Technical specs (materials, dimensions, tolerances), Prototyping (3D models, CAD files, simulations), Safety standards & compliance (ISO, CE, local regulations), Usability & ergonomics (human factors), Manufacturing (processes, scalability, cost efficiency), Testing & validation (stress tests, QA, performance metrics)

## 12. ⚖️ Legal & Policy Projects
Include: Jurisdiction & applicable law, Compliance frameworks (GDPR, HIPAA, financial regs), Contract structure (clauses, obligations, risks), Policy objectives (social, corporate, governmental), Stakeholders (parties, regulators, citizens), Risk assessment & mitigation

## 13. 💹 Finance & Investment Projects
Include: Financial objectives (short-term, long-term), Budget allocations & constraints, Risk profile (low, medium, high), ROI expectations & break-even points, Market analysis (stocks, crypto, real estate, startups), Compliance (taxes, reporting standards)

## 14. 🧘 Health, Fitness & Lifestyle Projects
Include: Target audience (age, gender, health conditions, goals), Program type (diet, workout, mindfulness, holistic care), Evidence-based standards (medical guidelines, fitness science), Duration & intensity (weeks, daily routines, recovery), Safety precautions (injury prevention, disclaimers), Progress tracking (apps, charts, check-ins)

## 15. 🎮 Gaming & Interactive Projects
Include: Platform (PC, console, mobile, VR/AR), Game mechanics (rules, physics, interactions), Level design (difficulty, progression), Narrative elements (story, characters, dialogue), Art style (2D, 3D, pixel, realism), Sound design (music, effects, voice acting), Monetization model (F2P, premium, subscription)

## 16. 🌍 Environmental & Sustainability Projects
Include: Ecological goals (carbon reduction, waste management, biodiversity), Energy use (renewables, efficiency, lifecycle analysis), Community involvement (local initiatives, education), Impact measurement (emissions saved, resources conserved), Certifications (LEED, ISO 14001, green labels), Long-term sustainability strategy

## 17. 🧑‍🤝‍🧑 Human-Centered & UX Projects
Include: User research (personas, pain points, empathy maps), Accessibility (WCAG compliance, inclusivity), Information architecture (navigation, content hierarchy), Interaction design (flows, microinteractions), Testing (usability studies, A/B testing), Emotional design (how users should feel at each step)

⚡ EXPANSION RULES:
👉 Every project prompt must be expanded with professional details specific to its domain.
👉 If the project type doesn't match any listed, infer the closest category and apply its principles.
👉 Think like an expert consultant in that field and provide comprehensive specifications.

PROCESS:
1. Analyze the user's core request
2. Identify the professional domain from the 17 categories above or even outside
3. Think like an expert in that field
4. Expand the request with professional details, specifications, and best practices from the relevant category
5. Structure the JSON with comprehensive, industry-standard fields

WHEN TO ASK FOR CLARIFICATION:
Only ask for more details if the request is extremely vague (like just "help me" or single words).
For most requests, use your expertise to create comprehensive professional output.

RESPONSE FORMAT:
- Always output detailed, professional JSON
- Include industry-standard terminology and specifications
- Add creative enhancements the user didn't think of
- Structure with clear, logical organization`

export async function convertToBasicJSON(naturalLanguage: string): Promise<ConversationResult> {
  console.log("AI Service - convertToBasicJSON called with input length:", naturalLanguage.length)

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) {
    console.error("AI Service - API key missing")
    return {
      status: "ready",
      error:
        "Google Generative AI API key is missing. Please configure GOOGLE_GENERATIVE_AI_API_KEY environment variable.",
    }
  }

  try {
    console.log("AI Service - Calling Gemini API for basic conversion...")
    const { text, usage } = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: apiKey,
      }),
      system: BASIC_SYSTEM_PROMPT,
      prompt: `Convert this natural language request into a clear, structured JSON prompt: "${naturalLanguage}"`,
      temperature: 0.3,
    })

    console.log("AI Service - Basic Gemini response received:", text.substring(0, 200) + "...")

    const trimmedResponse = text.trim()

    // Try to parse as JSON
    try {
      const jsonResponse = JSON.parse(trimmedResponse)
      console.log("AI Service - Valid basic JSON generated")
      return {
        status: "ready",
        json: JSON.stringify(jsonResponse, null, 2),
        tokensUsed: usage?.totalTokens,
      }
    } catch {
      // If not JSON, treat as clarification question
      console.log("AI Service - Basic conversion requesting more information")
      return {
        status: "need_info",
        questions: [trimmedResponse],
        tokensUsed: usage?.totalTokens,
      }
    }
  } catch (error) {
    console.error("AI Service - Basic conversion Gemini API Error:", error)
    return {
      status: "ready",
      error: error instanceof Error ? error.message : "Basic AI conversion failed",
    }
  }
}

export async function convertToAdvancedJSON(
  naturalLanguage: string,
  conversationHistory?: Array<{ role: string; content: string }>,
): Promise<ConversationResult> {
  console.log("AI Service - convertToAdvancedJSON called with input length:", naturalLanguage.length)

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) {
    console.error("AI Service - API key missing")
    return {
      status: "ready",
      error:
        "Google Generative AI API key is missing. Please configure GOOGLE_GENERATIVE_AI_API_KEY environment variable.",
    }
  }

  try {
    let conversationContext = ""
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext =
        "\n\nConversation History:\n" +
        conversationHistory.map((msg) => `${msg.role}: ${msg.content}`).join("\n") +
        "\n"
    }

    console.log("AI Service - Calling Gemini API for advanced conversion...")
    const { text, usage } = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: apiKey,
      }),
      system: `${COMPREHENSIVE_SYSTEM_PROMPT}${conversationContext}`,
      prompt: `User request: "${naturalLanguage}"

Analyze this request and either extract key details into JSON format or ask for clarification if the request is too vague.`,
      temperature: 0.3,
    })

    console.log("AI Service - Advanced Gemini response received:", text.substring(0, 200) + "...")

    const trimmedResponse = text.trim()

    // Try to parse as JSON first
    try {
      const jsonResponse = JSON.parse(trimmedResponse)
      console.log("AI Service - Valid advanced JSON generated")
      return {
        status: "ready",
        json: JSON.stringify(jsonResponse, null, 2),
        tokensUsed: usage?.totalTokens,
      }
    } catch {
      // If not JSON, treat as clarification question
      console.log("AI Service - Advanced conversion requesting more information")
      return {
        status: "need_info",
        questions: [trimmedResponse],
        tokensUsed: usage?.totalTokens,
      }
    }
  } catch (error) {
    console.error("AI Service - Advanced conversion Gemini API Error:", error)
    return {
      status: "ready",
      error: error instanceof Error ? error.message : "Advanced AI conversion failed",
    }
  }
}

export async function convertToJSON(
  naturalLanguage: string,
  conversationHistory?: Array<{ role: string; content: string }>,
): Promise<ConversationResult> {
  return convertToBasicJSON(naturalLanguage)
}

export async function repairJSON(invalidJSON: string, validationErrors: string[]): Promise<ConversionResult> {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) {
    return {
      success: false,
      json: invalidJSON,
      error: "Google Generative AI API key is missing.",
    }
  }

  try {
    const { text, usage } = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: apiKey,
      }),
      system: `You are a JSON repair assistant. Fix the provided JSON to make it valid and well-formatted.

RULES:
- Fix syntax errors (missing quotes, commas, brackets)
- Ensure proper JSON structure
- Keep the original data intent
- Output ONLY the corrected JSON`,
      prompt: `Fix this JSON: ${invalidJSON}

Errors to fix: ${validationErrors.join(", ")}`,
      temperature: 0.1,
    })

    try {
      const parsedJSON = JSON.parse(text.trim())
      return {
        success: true,
        json: JSON.stringify(parsedJSON, null, 2),
        tokensUsed: usage?.totalTokens,
      }
    } catch {
      return {
        success: false,
        json: invalidJSON,
        error: "Repair failed - AI returned invalid JSON",
      }
    }
  } catch (error) {
    return {
      success: false,
      json: invalidJSON,
      error: error instanceof Error ? error.message : "JSON repair failed",
    }
  }
}

export async function autoDetectSchema(naturalLanguage: string, schemas: any[]): Promise<any> {
  console.log("AI Service - Schema detection called (simplified mode)")

  // In simplified mode, we don't need complex schema detection
  // Just return a basic response to maintain compatibility
  return {
    status: "ready",
    matches: schemas.slice(0, 3).map((schema) => ({ schema, confidence: 0.5 })),
    selectedSchema: schemas[0] || null,
  }
}
