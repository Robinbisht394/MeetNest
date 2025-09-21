import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({}); // client

export const genarateEventSummary = async (description) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `generate short two or line three for this event description ${description}`,
    });
    console.log(response.text);
    return response.text;
  } catch (err) {}
};
