
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "The title of the recipe."
    },
    description: {
      type: Type.STRING,
      description: "A short, engaging description of the recipe."
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A list of ingredients with quantities."
      }
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "Step-by-step instructions to prepare the dish."
      }
    }
  },
  required: ["title", "description", "ingredients", "instructions"]
};

export const generateRecipe = async (ingredients: string): Promise<Recipe> => {
  const prompt = `You are a creative chef. Your task is to generate a simple but delicious recipe using only the following ingredients: ${ingredients}. 
  
  If the ingredients are not sufficient for a meaningful recipe (e.g., just water and oil), create a humorous or simple suggestion for what could be made, or what single ingredient could be added to make a proper dish. 
  
  Please provide the output in a JSON object that strictly follows the provided schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    // It's good practice to validate the parsed object, but we trust the schema here.
    const recipeData = JSON.parse(jsonText) as Recipe;
    return recipeData;

  } catch (error) {
    console.error("Error generating recipe:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate recipe. Gemini API error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the recipe.");
  }
};
