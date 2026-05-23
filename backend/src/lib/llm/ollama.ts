import type {
    LlmMessage,
    NormalizedToolCall,
    StreamChatParams,
    StreamChatResult,
} from "./types";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://127.0.0.1:11434";

export async function streamOllama(
    params: StreamChatParams,
): Promise<StreamChatResult> {
    const { model, systemPrompt, callbacks = {} } = params;
    
    const messages = [];
    if (systemPrompt) {
        messages.push({ role: "system", content: systemPrompt });
    }
    messages.push(...params.messages);

    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: model.replace("ollama-", ""), // Strip prefix if any
            messages,
            stream: true,
        }),
    });

    if (!response.ok) {
        throw new Error(`Ollama request failed: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    if (reader) {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter(Boolean);

            for (const line of lines) {
                try {
                    const parsed = JSON.parse(line);
                    if (parsed.message?.content) {
                        fullText += parsed.message.content;
                        callbacks.onContentDelta?.(parsed.message.content);
                    }
                } catch {
                    // Ignore JSON parse errors for incomplete chunks
                }
            }
        }
    }

    return { fullText };
}

export async function completeOllamaText(params: {
    model: string;
    systemPrompt?: string;
    user: string;
    maxTokens?: number;
}): Promise<string> {
    const messages = [];
    if (params.systemPrompt) {
        messages.push({ role: "system", content: params.systemPrompt });
    }
    messages.push({ role: "user", content: params.user });

    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: params.model.replace("ollama-", ""),
            messages,
            stream: false,
        }),
    });

    if (!response.ok) {
        throw new Error(`Ollama complete failed: ${response.statusText}`);
    }

    const json = await response.json();
    return json.message?.content || "";
}
