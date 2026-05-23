import logging
import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

class MikeOSS_MCP_Manager:
    """
    Model Context Protocol (MCP) Manager for MikeOSS Canada.
    Manages connections to multiple legal MCP servers (A2AJ, CourtListener, and Ansvar).
    """
    def __init__(self):
        self.client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        # Remote SSE/HTTP MCP Servers
        self.a2aj_url = "https://api.a2aj.ca/mcp"
        self.courtlistener_url = "https://mcp.courtlistener.com"
        
        # Local Stdio MCP Server (requires node/npx environment)
        # npm: @ansvar/canadian-law-mcp
        self.ansvar_command = ["npx", "-y", "@ansvar/canadian-law-mcp"]

    def _get_openai_mcp_tools(self):
        """
        Builds the tool array for the OpenAI Responses API.
        Note: The OpenAI Responses API natively supports remote URL-based MCP servers.
        For the local Stdio @ansvar MCP, a separate stdio-to-sse bridge would be needed
        in a full production environment, but we define it here structurally.
        """
        return [
            {
                "type": "mcp",
                "server_label": "a2aj",
                "server_url": self.a2aj_url,
                "require_approval": "never",
            },
            {
                "type": "mcp",
                "server_label": "courtlistener",
                "server_url": self.courtlistener_url,
                "require_approval": "never",
            }
            # The @ansvar/canadian-law-mcp would be appended here via a local SSE bridge URL
            # e.g., "server_url": "http://localhost:8001/mcp"
        ]

    async def execute_mcp_query(self, query: str):
        """
        Executes a legal query by natively passing all registered MCP servers
        as tools to the OpenAI client.
        """
        try:
            response = await self.client.responses.create(
                model=os.getenv("LLM_MODEL", "gpt-4o"),
                input=query,
                tools=self._get_openai_mcp_tools()
            )
            return {
                "answer": response.output_text,
                "raw_response": response.model_dump()
            }
        except Exception as e:
            logger.error(f"Failed to execute Multi-MCP query via OpenAI SDK: {e}")
            return {"error": str(e)}


