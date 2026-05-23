import json
from datetime import datetime
import hashlib
import re

class LSOAuditor:
    """
    Handles logging and compliance for Law Society of Ontario guidelines,
    specifically focusing on competence (audit trails) and confidentiality (PII scrubbing).
    """

    def __init__(self, log_file: str = "audit_log.jsonl"):
        self.log_file = log_file

    def scrub_pii(self, text: str) -> str:
        """
        Removes easily identifiable PII before sending to external LLMs.
        Note: True confidentiality requires local LLM hosting.
        """
        # Basic regex to strip out SINs, phone numbers, and standard email formats
        text = re.sub(r'\b\d{3}-\d{3}-\d{3}\b', '[REDACTED SIN]', text)
        text = re.sub(r'\b[\w\.-]+@[\w\.-]+\.\w+\b', '[REDACTED EMAIL]', text)
        text = re.sub(r'\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b', '[REDACTED PHONE]', text)
        return text

    def log_interaction(self, lawyer_id: str, prompt: str, generated_text: str, sources_used: list):
        """
        Maintains an audit trail of how an output was generated for supervisory review.
        """
        entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "lawyer_id_hash": hashlib.sha256(lawyer_id.encode()).hexdigest(),
            "prompt_length": len(prompt),
            "output_length": len(generated_text),
            "sources_used": sources_used,
            "verification_required": True
        }
        
        with open(self.log_file, "a") as f:
            f.write(json.dumps(entry) + "\n")
            
        return entry
