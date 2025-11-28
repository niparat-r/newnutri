import { GoogleGenAI } from "@google/genai";
import { FoodDatabaseResponse, AnalysisResponse, UserProfile, FoodItem, UICopy, FoodCategories } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Helper to clean Markdown code blocks often returned by LLMs
function cleanJSON(text: string): string {
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
}

/**
 * Prompt 1: Generate Food Database
 */
export const generateFoodDatabase = async (): Promise<FoodDatabaseResponse | null> => {
  const systemPrompt = `
You are a professional nutrition assistant and food database generator for a mobile app called "NutriWheel".
GOAL:
- Generate diverse food menus and drinks in Thai and English with basic nutrition information.
- Output MUST be strictly valid JSON.
- Create 15 items for each category (main_dish, snack, drink).

RESPONSE FORMAT:
{
  "version": "1.0",
  "categories": {
    "main_dish": [ ... ],
    "snack": [ ... ],
    "drink": [ ... ]
  }
}

Item Structure:
{
  "id": "string-unique-id",
  "name_th": "string",
  "name_en": "string",
  "description_th": "string",
  "calories_kcal": number,
  "protein_g": number,
  "fat_g": number,
  "carb_g": number,
  "sugar_g": number,
  "fiber_g": number,
  "caffeine_level": "none | low | medium | high",
  "health_score": number,
  "type_tag": "healthy | normal | high_calorie | low_carb | high_protein"
}

RESTRICTIONS:
- Use realistic approximate nutrition values.
- Mix Thai and International food.
- Plain water must be 0 kcal, 0 sugar, score 10.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate the food database now.",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(cleanJSON(text)) as FoodDatabaseResponse;
  } catch (error) {
    console.error("Failed to generate database:", error);
    return null;
  }
};

/**
 * Prompt 2: Analyze Selected Menu
 */
export const analyzeMenu = async (
  profile: UserProfile,
  selection: { main_dish: FoodItem; snack: FoodItem; drink: FoodItem },
  alternatives: FoodCategories
): Promise<AnalysisResponse | null> => {

  const systemPrompt = `
You are "Nutri Advisor", an AI nutrition coach.
GOAL:
1) Summarize selected menu in Thai.
2) Evaluate health perspective.
3) Highlight risk factors.
4) Suggest 1-3 alternatives from candidate list.
5) Friendly Thai tone.

OUTPUT FORMAT:
{
  "summary_th": "string",
  "evaluation_th": "ดี / พอใช้ / ควรระวัง + เหตุผล",
  "risk_factors_th": ["string"],
  "advice_th": "string",
  "health_score_overall": number,
  "suggested_alternatives": [
    {
      "from_category": "main_dish | snack | drink",
      "name_th": "string",
      "reason_th": "string"
    }
  ]
}
`;

  const userMessage = JSON.stringify({
    user_profile: profile,
    selected_menu: selection,
    candidate_alternatives: alternatives // Passing full categories so AI can pick best
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(cleanJSON(text)) as AnalysisResponse;
  } catch (error) {
    console.error("Failed to analyze menu:", error);
    return null;
  }
};

/**
 * Prompt 3: Generate UI Copy
 */
export const generateUICopy = async (): Promise<UICopy | null> => {
  const systemPrompt = `
You are a UX writer for NutriWheel.
GOAL: Generate short Thai copy for buttons, messages, gamification.
STYLE: Friendly, motivating, modern.

OUTPUT FORMAT:
{
  "buttons": {
    "spin_now": "string",
    "spin_all": "string",
    "save_meal": "string",
    "see_stats": "string"
  },
  "messages": {
    "daily_success": ["string"],
    "low_sugar_reward": ["string"],
    "high_caffeine_warning": ["string"]
  }
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate Thai UI copy now.",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(cleanJSON(text)) as UICopy;
  } catch (error) {
    console.error("Failed to generate UI copy:", error);
    return null;
  }
};
