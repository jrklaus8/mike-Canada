import httpx
import logging

logger = logging.getLogger(__name__)

class A2AJ_MCP_Client:
    """
    Model Context Protocol (MCP) Client designed to connect to the A2AJ server
    (https://mcp.a2aj.ca/mcp) for Canadian legal retrieval, as inspired by 
    the Emilie (Swiss) fork.
    """
    def __init__(self, mcp_url: str = "https://mcp.a2aj.ca/mcp"):
        self.mcp_url = mcp_url
        self.client = httpx.AsyncClient()

    async def list_tools(self):
        """
        Interrogates the MCP server for available legal retrieval tools.
        """
        try:
            # MCP standard tool listing (JSON-RPC wrapper representation)
            response = await self.client.post(self.mcp_url, json={
                "jsonrpc": "2.0",
                "id": 1,
                "method": "tools/list"
            })
            return response.json()
        except Exception as e:
            logger.error(f"Failed to connect to A2AJ MCP: {e}")
            return {"error": str(e)}

    async def call_tool(self, tool_name: str, arguments: dict):
        """
        Calls a specific tool on the A2AJ server (e.g., fetch_case_law, verify_citation).
        """
        try:
            response = await self.client.post(self.mcp_url, json={
                "jsonrpc": "2.0",
                "id": 2,
                "method": "tools/call",
                "params": {
                    "name": tool_name,
                    "arguments": arguments
                }
            })
            return response.json()
        except Exception as e:
            logger.error(f"Failed to execute MCP tool {tool_name}: {e}")
            return {"error": str(e)}
