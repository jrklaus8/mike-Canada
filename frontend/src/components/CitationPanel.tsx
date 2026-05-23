import React from 'react';

interface CitationPanelProps {
    citation: string | null;
    highlightText: string | null;
    onClose: () => void;
}

export function CitationPanel({ citation, highlightText, onClose }: CitationPanelProps) {
    if (!citation) return null;

    return (
        <div className="w-96 border-l bg-gray-50 p-4 h-full overflow-y-auto flex flex-col shadow-inner">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-lg text-gray-900">CanLII Citation</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800 font-bold">
                    &times;
                </button>
            </div>
            
            <div className="bg-white p-4 border rounded shadow-sm flex-1">
                <h4 className="font-bold text-md mb-2 text-blue-900">{citation}</h4>
                <div className="text-sm text-gray-700 leading-relaxed font-serif whitespace-pre-wrap">
                    {highlightText || "Retrieving document from MCP..."}
                </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-400 text-center">
                Powered by A2AJ MCP API
            </div>
        </div>
    );
}
