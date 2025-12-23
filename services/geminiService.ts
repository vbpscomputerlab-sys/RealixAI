
import { GoogleGenAI, Type } from "@google/genai";
import { DetectionResult } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeMedia(base64Data: string, mimeType: string): Promise<DetectionResult> {
    const prompt = `
      Act as a high-level digital forensics expert specializing in Deepfake detection.
      Analyze the provided media for signs of AI manipulation, GAN artifacts, diffusion signatures, or deepfake blending.
      
      Look specifically for:
      1. Blending artifacts around the face and neck.
      2. Inconsistent lighting and reflections in eyes.
      3. Unnatural skin textures or "blurriness" in specific facial regions.
      4. Discontinuities in hair or background near the subject.
      5. Geometric warping or double edges.

      SCORING RULES (Strict Adherence Required):
      - If you find indicators with 'medium' severity (yellow warnings), assign a 'confidence' (fake probability) of approximately 0.80.
      - If all indicators are 'high' severity (red warnings), assign a 'confidence' between 0.99 and 1.0.
      - If indicators are 'low' severity (green), assign a 'confidence' between 0.0 and 0.12.
      - 'isDeepfake' MUST be true if the fake probability (confidence) is > 0.50.

      Provide a structured JSON response.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { text: prompt },
            { inlineData: { data: base64Data, mimeType } }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isDeepfake: { type: Type.BOOLEAN },
              confidence: { type: Type.NUMBER, description: "Estimated fake probability from 0 to 1" },
              reasoning: { type: Type.STRING },
              analysisPoints: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    description: { type: Type.STRING },
                    severity: { type: Type.STRING, enum: ["low", "medium", "high"] }
                  },
                  required: ["category", "description", "severity"]
                }
              }
            },
            required: ["isDeepfake", "confidence", "reasoning", "analysisPoints"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      return result;
    } catch (error) {
      console.error("Analysis failed:", error);
      throw new Error("Failed to analyze media. Please try again.");
    }
  }
}

export const geminiService = new GeminiService();
