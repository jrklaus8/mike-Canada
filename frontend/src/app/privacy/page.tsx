import { SiteLogo } from "@/components/site-logo";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-dvh bg-white py-20 px-6 sm:px-12">
            <div className="max-w-3xl mx-auto">
                <div className="mb-10 text-center">
                    <SiteLogo size="lg" className="md:text-4xl" asLink />
                </div>
                <h1 className="text-3xl font-serif font-bold mb-8">Privacy Policy</h1>
                
                <div className="prose prose-gray max-w-none text-gray-700 space-y-6">
                    <p className="font-semibold">Effective Date: {new Date().toLocaleDateString()}</p>
                    
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
                        <p>
                            We are committed to maintaining the accuracy, confidentiality, and security of your personally identifiable information ("Personal Information"). As part of this commitment, our privacy policy governs our actions as they relate to the collection, use and disclosure of Personal Information. Our privacy policy is based upon the values set by the Canadian Standards Association's Model Code for the Protection of Personal Information and Canada's <strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Identifying Purposes (Principle 4.2)</h2>
                        <p>
                            We collect, use and disclose Personal Information to provide you with the product or service you have requested and to offer you additional products and services we believe you might be interested in. The purposes for which we collect Personal Information will be identified before or at the time we collect the information.
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Account Data:</strong> Email addresses and optional names/organizations are collected to authenticate users and manage access to the application.</li>
                            <li><strong>Application Data:</strong> Chat logs, documents, and project data are collected to provide the core AI assistant functionalities.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Consent (Principle 4.3)</h2>
                        <p>
                            Knowledge and consent are required for the collection, use or disclosure of Personal Information except where required or permitted by law. By registering for an account and using our services, you expressly consent to the collection and use of your Personal Information as outlined in this policy. Providing us with your Personal Information is always your choice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Safeguards & Data Sovereignty (Principle 4.7)</h2>
                        <p>
                            Personal Information will be protected by security safeguards that are appropriate to the sensitivity level of the information.
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Row Level Security (RLS):</strong> Our database isolates your data strictly to your authenticated session. It is mathematically impossible for other users to access your data.</li>
                            <li><strong>Local Inference vs Cloud APIs:</strong> When using the Ollama provider, inference runs locally on the firm's hardware, ensuring zero external API calls. If you configure a "Bring Your Own Key" (BYOK) for third-party cloud providers (e.g., Anthropic, Google), you acknowledge that document content will be transmitted to those providers in accordance with their respective privacy policies.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Right to Erasure / Account Deletion (Principle 4.9)</h2>
                        <p>
                            Upon request, you will be informed of the existence, use and disclosure of your Personal Information, and will be given access to it. You may verify the accuracy and completeness of your Personal Information, and may request that it be amended or completely erased, if appropriate.
                        </p>
                        <p className="mt-2">
                            To exercise your Right to Erasure, you may use the "Delete Account" function in your account settings, or contact our Privacy Officer. Deletion requests will result in a hard delete of your user profile, chats, and uploaded documents from our servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Accountability & Contact</h2>
                        <p>
                            We are responsible for maintaining and protecting the Personal Information under our control. We have designated an individual or individuals who is/are responsible for compliance with our privacy policy.
                        </p>
                        <p className="mt-2 font-medium">
                            Privacy Officer Contact: [Insert Privacy Officer Email / Firm Details]
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
