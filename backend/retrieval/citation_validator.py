import re
from typing import List, Dict

class CitationValidator:
    """
    Validates citations against the McGill Guide formatting and verifies
    their existence against CanLII to prevent hallucinations.
    """
    
    # Regex for standard neutral citations (e.g., 2019 SCC 65, 2020 ONCA 12)
    NEUTRAL_CITATION_PATTERN = re.compile(r'\b(19|20)\d{2}\s+[A-Z]{2,4}\s+\d+\b')
    
    def extract_citations(self, text: str) -> List[str]:
        """
        Extracts neutral citations from generated text.
        """
        return self.NEUTRAL_CITATION_PATTERN.findall(text)

    def validate_citation(self, citation: str) -> bool:
        """
        Verifies if a citation follows the McGill Guide and actually exists.
        For MVP, this validates format. Future: API call to CanLII.
        """
        if not self.NEUTRAL_CITATION_PATTERN.match(citation):
            return False
            
        # TODO: Add logic to hit CanLII to ensure the case actually exists
        return True

    def audit_generated_text(self, text: str) -> Dict[str, any]:
        """
        Audits text for unsupported claims or hallucinated citations.
        """
        found_citations = [m.group(0) for m in self.NEUTRAL_CITATION_PATTERN.finditer(text)]
        unverified = [cit for cit in found_citations if not self.validate_citation(cit)]
        
        return {
            "is_valid": len(unverified) == 0,
            "citations": found_citations,
            "unverified_citations": unverified
        }
