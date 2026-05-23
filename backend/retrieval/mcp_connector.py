import logging
import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

class A2AJ_MCP_Client:
    """
    Model Context Protocol (MCP) Client for A2AJ.
    Refactored to use the native OpenAI SDK's MCP tools configuration,
    as demonstrated in the A2AJ official notebook guide.
    """
    def __init__(self, mcp_url: str = "https://api.a2aj.ca/mcp"):
        # Note: API version used per the 2025/2026 guidelines for OpenAI compatibility
        self.mcp_url = mcp_url
        self.client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    async def execute_mcp_query(self, query: str):
        """
        Executes a legal query by natively passing the A2AJ MCP server 
        as a tool to the OpenAI client.
        """
        try:
            # Using the new responses API that natively supports remote MCP servers
            response = await self.client.responses.create(
                model=os.getenv("LLM_MODEL", "gpt-4o"), # Fallback to 4o if gpt-5 unavailable
                input=query,
                tools=[
                    {
                        "type": "mcp",
                        "server_label": "a2aj",
                        "server_url": self.mcp_url,
                        "require_approval": "never",
                    }
                ]
            )
            return {
                "answer": response.output_text,
                "raw_response": response.model_dump()
            }
        except Exception as e:
            logger.error(f"Failed to execute MCP query via OpenAI SDK: {e}")
            return {"error": str(e)}

