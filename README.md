# MikeOSS Canada Fork

A Canadian-first adaptation of the MikeOSS legal AI platform, customized for Canadian legal practice, CanLII integration, and Law Society of Ontario compliance.

## Features
- **CanLII Retrieval Layer:** Prioritizes SCC, appellate, and Ontario court decisions.
- **McGill Guide Citation:** Validates and formats all generated citations according to the Canadian Guide to Uniform Legal Citation.
- **LSO Compliance:** Built with the Law Society of Ontario's Generative AI guidelines in mind (competence, confidentiality, supervision).
- **Audit Logging:** Every response includes verifiable citation sources and confidence scores.

## Architecture
- **Backend:** FastAPI, Python 3.11+
- **Retrieval:** CanLII API integration / Web Scraping (fallback)
- **Vector DB:** Qdrant (local by default for data sovereignty)
- **Frontend:** React / Next.js (coming soon)

## Getting Started
Copy `.env.example` to `.env` and configure your API keys.
Run `docker-compose up -d` to start the local stack.
