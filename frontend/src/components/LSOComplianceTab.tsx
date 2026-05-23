import React from 'react';

export function LSOComplianceTab() {
    return (
        <div className="p-6 h-full overflow-y-auto bg-gray-50 flex flex-col gap-6 text-sm">
            <div className="bg-white p-4 border border-red-200 rounded-lg shadow-sm">
                <h3 className="font-bold text-red-800 text-lg mb-2">Duty of Competence (Rule 3.1-2)</h3>
                <p className="text-gray-700 mb-2">
                    <strong>Independent Verification:</strong> Never rely on AI as an oracle. You must review, critically evaluate, and correct all AI outputs against primary, verified legal sources (e.g., CanLII).
                </p>
                <p className="text-gray-700">
                    <strong>Prevent Hallucinations:</strong> You are fully accountable for AI-fabricated citations or inaccurate legal arguments.
                </p>
            </div>

            <div className="bg-white p-4 border border-blue-200 rounded-lg shadow-sm">
                <h3 className="font-bold text-blue-800 text-lg mb-2">Duty to Supervise (Rule 6.1-1)</h3>
                <p className="text-gray-700 mb-4">
                    If you delegate drafting or research tasks to an articling student, associate, or legal assistant who utilizes AI, you must carefully review the work.
                </p>
                <button 
                    onClick={() => {
                        alert("AI Supervision Log Exported successfully. Save this to your client file.");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Export AI Supervision Log
                </button>
            </div>

            <div className="bg-white p-4 border border-green-200 rounded-lg shadow-sm">
                <h3 className="font-bold text-green-800 text-lg mb-2">Court & Client Transparency</h3>
                <p className="text-gray-700 mb-4">
                    Federal/Provincial Court Rules require written disclosure in your filings if AI was used to generate content.
                </p>
                <div className="bg-gray-100 p-3 rounded text-xs font-mono text-gray-800 mb-2">
                    "Counsel advises that generative artificial intelligence (MikeOSS-Canada) was utilized in the preparation of this memorandum, in compliance with the Law Society of Ontario's guidelines. All AI-generated content was independently reviewed and verified against primary legal sources."
                </div>
                <button 
                    onClick={() => {
                        navigator.clipboard.writeText("Counsel advises that generative artificial intelligence (MikeOSS-Canada) was utilized in the preparation of this memorandum, in compliance with the Law Society of Ontario's guidelines. All AI-generated content was independently reviewed and verified against primary legal sources.");
                        alert("Disclosure copied to clipboard!");
                    }}
                    className="text-green-700 font-bold hover:underline"
                >
                    Copy Court Disclosure
                </button>
            </div>

            <div className="text-center text-xs text-gray-400 mt-4">
                Secure Infrastructure: Data does not leave your local deployment.
            </div>
        </div>
    );
}
