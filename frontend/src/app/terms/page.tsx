import { SiteLogo } from "@/components/site-logo";

export default function TermsOfUse() {
    return (
        <div className="min-h-dvh bg-white py-20 px-6 sm:px-12">
            <div className="max-w-3xl mx-auto">
                <div className="mb-10 text-center">
                    <SiteLogo size="lg" className="md:text-4xl" asLink />
                </div>
                <h1 className="text-3xl font-serif font-bold mb-8">Terms of Use</h1>
                
                <div className="prose prose-gray max-w-none text-gray-700 space-y-6">
                    <p className="font-semibold">Effective Date: {new Date().toLocaleDateString()}</p>
                    
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using this application ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. "As Is" Open Source Software</h2>
                        <p>
                            This project is an open-source adaptation. The Service is provided "AS IS", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Professional Responsibility (LSO Compliance)</h2>
                        <p>
                            <strong>Rule 3.1-2:</strong> AI outputs must be independently verified against primary legal sources (e.g., CanLII). Users are fully accountable for AI-fabricated citations or inaccurate legal arguments. The Service does not provide legal advice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Confidentiality & Data Sovereignty</h2>
                        <p>
                            <strong>Rule 3.3-1:</strong> Users must not input confidential, identifying, or privileged client information into third-party cloud models (BYOK). Doing so may waive solicitor-client privilege. It is the user's responsibility to select the appropriate local inference provider (e.g., Ollama) for strict data isolation.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
