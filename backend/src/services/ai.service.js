import { GoogleGenAI } from "@google/genai";
import { config, z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({
  api_key: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "The match score between the candidate's profile and the job description, represented as a percentage",
    ),
  technicalQuestions: z.array(
    z.object({
      question: z
        .string()
        .describe("The technical questions can be asked during the interview"),
      intension: z
        .string()
        .describe("The intention of interviewer behind asking the question"),
      answer: z
        .string()
        .describe(
          "How to answer the question ?, What points to be covered in the answer ?, what is the best approach to answer the question ?",
        ),
    }),
  ),
  behavirolQuestions: z.array(
    z.object({
      question: z
        .string()
        .describe("The behavioral questions can be asked during the interview"),
      intension: z
        .string()
        .describe("The intention of interviewer behind asking the question"),
      answer: z
        .string()
        .describe(
          "How to answer the question ?, What points to be covered in the answer ?, what is the best approach to answer the question ?",
        ),
    }),
  ),
  skillgapAnalysis: z.array(
    z.object({
      skill: z
        .string()
        .describe(
          "The skill that needs to be improved and is lacking in the candidate's profile",
        ),
      severity: z
        .enum(["low", "medium", "high"])
        .describe(
          "The severity of the skill gap, whether it is low, medium, or high",
        ),
    }),
  ),
  preparationPlan: z.array(
    z.object({
      day: z
        .string()
        .describe("The day of the preparation plan, e.g., Day 1, Day 2, etc."),
      focus: z
        .string()
        .describe(
          "The main focus or theme for that day, based upon the job description, etc.",
        ),
      tasks: z
        .array(z.string())
        .describe(
          "The specific tasks or activities to be completed on that day as part of the preparation plan",
        ),
    }),
  ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `You are an expert career coach and your task is to generate a comprehensive interview report for a candidate based on their: resume${resume}, self-description: ${selfDescription}, and the job description: ${jobDescription}.`;
  
  const response = await ai.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });
  
  return JSON.parse(response.text);
}

export default {
  generateInterviewReport,
};
