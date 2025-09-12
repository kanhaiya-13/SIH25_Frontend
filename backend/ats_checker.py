import re


# --- ATS Friendliness Checker ---

def check_ats_friendliness(resume_text: str) -> dict:
    """
    Analyzes resume text for ATS compatibility and provides a report.
    """
    suggestions = []
    score = 100
    text = resume_text.lower()

    # 1. Check for standard section headings
    essential_sections = ["experience", "education", "skills"]
    missing_sections = [s for s in essential_sections if s not in text]
    if missing_sections:
        suggestions.append(
            f"Your resume might be missing these standard sections: {', '.join(missing_sections)}. "
            "ATS parsers rely on these headings."
        )
        score -= 25

    # 2. Check for text extractability (detects image-based resumes)
    if len(resume_text) < 500:  # Very short text may indicate an image
        suggestions.append(
            "Your resume has very little text. Ensure it is not an image-based file, "
            "as ATS cannot read text from images."
        )
        score -= 40

    # 3. Check for clear contact information
    if not re.search(r'[\w\.-]+@[\w\.-]+', text):
        suggestions.append("No email address found. Ensure your contact information is in a standard, readable format.")
        score -= 15

    if not re.search(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text):
        suggestions.append("A standard phone number format was not found. ATS may have trouble parsing it.")
        score -= 10

    # 4. Check for problematic formatting
    if "http" not in text and ("www" in text or ".com" in text):
        suggestions.append(
            "Include full hyperlinks (e.g., 'https://www.linkedin.com...') for portfolio or LinkedIn profiles.")
        score -= 5

    # Final score calculation
    final_score = max(0, score)

    return {
        "score": final_score,
        "suggestions": suggestions
    }