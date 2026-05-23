import os
from fastapi import FastAPI, HTTPException, Request, Depends
from pydantic import BaseModel
from typing import List, Optional

from backend.api.auth import SovereigntyAuth
from backend.retrieval.mcp_connector import MikeOSS_MCP_Manager
from backend.reasoning.council import MultiModelCouncil
from backend.retrieval.redline_parser import RedlineParser

app = FastAPI(title="MikeOSS Canada API", description="Canadian legal intelligence system API", version="0.2.0")

mcp_manager = MikeOSS_MCP_Manager()
council = MultiModelCouncil()
redline_parser = RedlineParser()

class LegalQuery(BaseModel):
    query: str
    jurisdiction: Optional[str] = "ON"
    include_tribunals: Optional[bool] = True
    is_tribunal_matter: Optional[bool] = False

class LegalResponse(BaseModel):
    answer: str
    citations: List[str]
    confidence_score: float
    council_results: Optional[dict] = None

@app.get("/")
def read_root():
    return {"status": "ok", "message": "MikeOSS Canada API is running."}

@app.post("/api/v1/auth/token")
async def login():
    # Placeholder for auth routing using Custom JWT logic
    token = SovereigntyAuth.create_access_token({"sub": "lawyer_demo"})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/api/v1/query", response_model=LegalResponse)
async def process_legal_query(query_data: LegalQuery, request: Request):
    # If tribunal matter, use MultiModel Council (Mike-KC)
    council_res = None
    if query_data.is_tribunal_matter:
        council_res = await council.convene_council(query_data.query)
        
    # Standard response integrating MCP (Emilie)
    return LegalResponse(
        answer="This is a stub response. The system prioritizes CanLII results and SCC precedents via MCP.",
        citations=["R v Jordan, 2016 SCC 27"],
        confidence_score=0.95,
        council_results=council_res
    )

@app.get("/api/v1/citation/{neutral_citation}")
async def get_citation_text(neutral_citation: str):
    """
    MikeNL feature: Side-panel citation reader endpoint.
    Fetches exact text to highlight based on the citation clicked in the UI.
    """
    # Uses MCP to fetch case
    return {"citation": neutral_citation, "highlight_text": "Placeholder for CanLII retrieved text."}

@app.post("/api/v1/document/redline")
async def parse_redline_document(file_path: str):
    """
    Mike-redline feature: parse docx to keep tracked changes for LLM.
    """
    return redline_parser.parse_docx_redlines(file_path)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
