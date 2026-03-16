import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    api_key: process.env.GEMINI_API_KEY
})