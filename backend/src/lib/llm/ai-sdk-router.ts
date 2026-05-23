import { streamText, tool, type CoreMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { z } from "zod";

/**
 * Migration Scaffold: Using Vercel AI SDK instead of hand-rolling LLM logic.
 * 
 * Vercel AI SDK automatically normalizes:
 * - System prompts
 * - Tool calling (JSON schema mapping)
 * - Message formatting (images, files, text)
 * - Streaming across OpenAI, Anthropic, and Google.
 * 
 * This completely replaces the complex manual loops in `openai.ts`, `gemini.ts`, and `claude.ts`.
 */

export async function createAIStream(
    provider: "claude" | "gemini" | "openai",
    modelName: string,
    messages: CoreMessage[],
    systemPrompt: string,
) {
    // 1. Resolve Provider Model
    let model;
    if (provider === "claude") {
        model = anthropic(modelName);
    } else if (provider === "gemini") {
        model = google(modelName);
    } else {
        model = openai(modelName);
    }

    // 2. Stream Response with Native Tooling
    const result = streamText({
        model,
        system: systemPrompt,
        messages,
        tools: {
            fetchLegalCase: tool({
                description: "Fetch a primary source case document from CanLII using its standard legal citation.",
                parameters: z.object({
                    citation: z.string().describe("The CanLII citation to fetch (e.g., '2024 SCC 1')."),
                }),
                execute: async ({ citation }) => {
                    // Internal fetch to the CanLII integration route we built
                    try {
                        const response = await fetch(`http://localhost:${process.env.PORT || 3001}/canlii/document?citation=${encodeURIComponent(citation)}`);
                        if (!response.ok) throw new Error("Failed to fetch from CanLII");
                        const data = await response.json();
                        return { success: true, text: data.content, source: data.source };
                    } catch (error: any) {
                        return { success: false, error: error.message };
                    }
                },
            }),
            searchCanLII: tool({
                description: "Search CanLII for Canadian jurisprudence by keyword or legal concept.",
                parameters: z.object({
                    query: z.string().describe("The search query or keywords."),
                }),
                execute: async ({ query }) => {
                    try {
                        const response = await fetch(`http://localhost:${process.env.PORT || 3001}/canlii/search?q=${encodeURIComponent(query)}`);
                        if (!response.ok) throw new Error("Failed to search CanLII");
                        const data = await response.json();
                        return { success: true, results: data.results };
                    } catch (error: any) {
                        return { success: false, error: error.message };
                    }
                },
            }),
        },
        maxSteps: 5, // Vercel AI SDK handles multi-step tool loops natively!
    });

    return result.toDataStreamResponse();
}
