"use client";

import { useState } from "react";
import type { MikeMessage, MikeCitationAnnotation } from "@/app/components/shared/types";

export function useCanadianChat() {
    const [messages, setMessages] = useState<MikeMessage[]>([]);
    const [isResponseLoading, setIsResponseLoading] = useState(false);

    const handleChat = async (message: MikeMessage) => {
        if (!message.content.trim()) return null;

        const newMessages = [...messages, message];
        setMessages([...newMessages, { role: "assistant", content: "", events: [{ type: "thinking", isStreaming: true }] }]);
        setIsResponseLoading(true);

        try {
            let finalContent = "";
            let annotations: MikeCitationAnnotation[] = [];
            const isLegislation = /act|code|legislation|statute/i.test(message.content);

            if (isLegislation) {
                // Simulate Justice Canada MCP Legislation Search
                finalContent = `I found a relevant Canadian statute provision: **Criminal Code, RSC 1985, c C-46, s 380(1)**.`;
                annotations.push({
                    type: "citation",
                    document_id: "mcp-legis-1",
                    filename: "Criminal Code, RSC 1985, c C-46, s 380",
                    quote: "Every one who, by deceit, falsehood or other fraudulent means, whether or not it is a false pretence within the meaning of this Act, defrauds the public or any person... of any property, money or valuable security or any service, (a) is guilty of an indictable offence and liable to a term of imprisonment not exceeding fourteen years...",
                    page_number: null,
                    ref: 1
                } as any);
            } else {
                // Existing CanLII Case Law Query
                const res = await fetch("/api/v1/query", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query: message.content, is_tribunal_matter: false })
                });

                if (!res.ok) throw new Error("Failed to query Canadian Legal Data.");
                const data = await res.json();

                finalContent = data.result || "";

                if (data.citation) {
                    finalContent = `I found a relevant Canadian case: **${data.citation}**.`;
                    annotations.push({
                        type: "citation",
                        document_id: "mcp-doc-1",
                        filename: data.citation,
                        quote: data.highlight_text || "",
                        page_number: null,
                        ref: 1
                    } as any);
                }
            }

            setMessages([...newMessages, {
                role: "assistant",
                content: finalContent,
                annotations,
                events: []
            }]);
        } catch (e: any) {
            setMessages([...newMessages, { role: "assistant", content: "Error: " + e.message, events: [] }]);
        } finally {
            setIsResponseLoading(false);
        }
        return null;
    };

    const handleNewChat = async (message: MikeMessage) => {
        await handleChat(message);
        return null;
    };

    const cancel = () => { setIsResponseLoading(false); };

    return { messages, isResponseLoading, handleChat, handleNewChat, cancel };
}
