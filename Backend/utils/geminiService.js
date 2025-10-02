import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({}); // client

export const genarateEventSummary = async (description, eventName) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `act as short descriptive writer who explains longs events descriptions into short two to three lines for event name ${eventName} and its description  ${description}`,
    });
    return response.text;
  } catch (err) {
    console.log({ fnx: "event summary", error: err.message });
  }
};
