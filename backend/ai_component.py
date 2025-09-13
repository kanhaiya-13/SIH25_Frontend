import re
from typing import Dict, List, Optional, Tuple

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

try:
    import textstat
except ImportError:
    textstat = None

try:
    import language_tool_python
except ImportError:
    language_tool_python = None


# --- Text Processing Utilities ---

def normalize(s: str) -> str:
    """Lowercase, remove special chars, and normalize whitespace."""
    s = s.lower()
    s = re.sub(r"[^a-z0-9+.#/\- ]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


# --- Skill Extraction & Inference ---

DEFAULT_SKILLS = {
    # Existing Tech Skills
    "python", "java", "c", "c++", "c#", ".net", "javascript", "typescript",
    "node", "node.js", "react", "angular", "vue", "django", "flask",
    "spring", "fastapi", "sql", "mysql", "postgres", "mongodb", "redis",
    "elasticsearch", "aws", "azure", "gcp", "docker", "kubernetes",
    "terraform", "linux", "pandas", "numpy", "scikit-learn", "sklearn",
    "tensorflow", "pytorch", "nlp", "llm", "machine learning",
    "deep learning", "data science", "etl", "airflow", "html", "css", "git",
    "matlab",
    
    # Skills from Image
    "typing", "adobe photoshop", "illustrator", "figma", "canva",
    "seo", "creative writing", "wordpress", "proofreading",
    "recruiting", "onboarding", "ms office", "communication",
    "financial modeling", "ms excel", "data analysis", "valuation",
    "instagram marketing", "facebook ads", "content creation", "analytics",
    "autocad", "solidworks", "prototyping", "thermodynamics"
}

SKILL_SYNONYMS = {
    "js": "javascript", "ts": "typescript", "tf": "tensorflow",
    "scikit learn": "scikit-learn", "ml": "machine learning",
    "dl": "deep learning", "postgresql": "postgres",
    "photoshop": "adobe photoshop", "excel": "ms excel", "office": "ms office"
}

SKILL_TRIGGERS = {
    "management": ["manage", "led a team", "spearheaded", "oversaw", "directed the"],
    "leadership": ["led", "lead", "mentored", "guided", "directed", "coached"],
    "communication": ["presented", "authored", "negotiated", "liaised", "wrote", "reported"],
    "problem-solving": ["optimized", "resolved", "troubleshoot", "debugged", "fixed"],
    "software development": ["developed", "engineered", "built", "coded", "programmed", "deployed"],
    "data analysis": ["analyzed", "interpreted", "visualized data", "data model", "forecasted"],
    "design": ["designed", "prototyped", "wireframed", "ux", "ui", "created mockups", "illustrated"],
    "marketing": ["marketed", "promoted", "ran campaigns", "managed social media", "created content", "analyzed engagement"],
    "writing/editing": ["wrote", "edited", "proofread", "published", "authored", "copywrote"],
    "human resources": ["recruited", "hired", "onboarded", "interviewed", "managed employee relations"],
    "finance": ["valued", "modeled financials", "analyzed budgets", "audited", "financial analysis"]
}


def canonicalize_skill(tok: str) -> str:
    """Map skill synonyms to a canonical form."""
    t = tok.strip().lower()
    return SKILL_SYNONYMS.get(t, t)


def extract_skills(
        text: str, custom_list: Optional[List[str]] = None
) -> List[str]:
    """Extract a sorted list of unique explicit skills from text."""
    normalized_text = normalize(text)
    toks = normalized_text.split()
    found_skills = set()

    for t in toks:
        c = canonicalize_skill(t)
        if c in DEFAULT_SKILLS:
            found_skills.add(c)

    bigrams = zip(toks, toks[1:])
    for a, b in bigrams:
        bigram = canonicalize_skill(f"{a} {b}")
        if bigram in DEFAULT_SKILLS:
            found_skills.add(bigram)

    if custom_list:
        for s in custom_list:
            s_norm = canonicalize_skill(s)
            if s_norm in normalized_text:
                found_skills.add(s_norm)

    return sorted(list(found_skills))


def infer_skills_from_text(resume_text: str) -> List[str]:
    """Infers skills from descriptive text using trigger phrases."""
    inferred_skills = set()
    text = resume_text.lower()
    for skill, triggers in SKILL_TRIGGERS.items():
        for trigger in triggers:
            if trigger in text:
                inferred_skills.add(skill)
                break
    return sorted(list(inferred_skills))


# --- Fit Scoring Logic ---

def tfidf_cosine(a: str, b: str) -> float:
    """Calculate cosine similarity between two strings using TF-IDF."""
    try:
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform([a, b])
        return float(cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0])
    except ValueError:
        return 0.0


def compute_fit(requirements: dict, resume_text: str) -> Tuple[float, dict]:
    """
    Calculate a candidate's fit score for an internship based on their resume,
    now including inferred skills.
    """
    req_text_parts = requirements.get("skills", []) + requirements.get("education", [])
    if requirements.get("experience"):
        req_text_parts.append(f"{requirements['experience']} years experience")
    req_text = " ".join(req_text_parts)

    sim = tfidf_cosine(req_text, resume_text)

    req_skills = {canonicalize_skill(s) for s in requirements.get("skills", [])}

    explicit_cand_skills = extract_skills(resume_text, custom_list=list(req_skills))
    inferred_cand_skills = infer_skills_from_text(resume_text)
    cand_skills = set(explicit_cand_skills) | set(inferred_cand_skills)

    jaccard = len(req_skills & cand_skills) / len(req_skills) if req_skills else 1.0
    skills_score = int(round(jaccard * 100))

    req_years = requirements.get("experience", 0)
    cand_years = max(
        [float(m.group(1)) for m in re.finditer(r"(\d+(?:\.\d+)?)\s*\+?\s*(?:years?|yrs?)", resume_text, re.I)] or [0]
    )
    if not req_years:
        exp_score = 100
    else:
        ratio = min(1.0, cand_years / req_years)
        exp_score = int(40 + 60 * ratio)

    edu_score = 70 if any(kw in resume_text.lower() for kw in ["b.tech", "bachelor", "master", "mca"]) else 40

    weights = {"skills": 0.60, "experience": 0.25, "education": 0.15}
    overall = (
            skills_score * weights["skills"] +
            exp_score * weights["experience"] +
            edu_score * weights["education"]
    )
    overall = 0.9 * overall + 0.1 * (sim * 100)

    breakdown = {
        "skills_score": skills_score,
        "experience_score": exp_score,
        "education_score": edu_score,
        "semantic_similarity": int(round(sim * 100)),
        "matched_skills": sorted(list(req_skills & cand_skills)),
        "missing_skills": sorted(list(req_skills - cand_skills)),
        "inferred_skills": inferred_cand_skills,
    }
    return round(overall, 2), breakdown


# --- Resume Quality Analysis (Enhanced LanguageTool) ---

ACTION_VERBS = ["built", "developed", "designed", "led", "optimized", "implemented"]
GENERIC_PHRASES = ["responsible for", "worked on", "team player", "duties included"]
PASSIVE_HINT_PATTERN = re.compile(r"\b(?:was|were|is|are|been)\b\s+\w+ed\b", re.I)


def resume_quality(resume_text: str) -> Dict[str, object]:
    """
    Analyzes resume text for quality and provides actionable feedback
    with context for each issue.
    """
    suggestions = []

    for phrase in GENERIC_PHRASES:
        if phrase in resume_text.lower():
            suggestions.append({
                "message": "Avoid generic phrases. Use specific action verbs to describe your impact.",
                "context": phrase
            })

    for match in PASSIVE_HINT_PATTERN.finditer(resume_text):
        suggestions.append({
            "message": "Prefer active voice ('I built X') over passive voice ('X was built').",
            "context": match.group(0)
        })

    if not any(verb in resume_text.lower() for verb in ACTION_VERBS):
        suggestions.append({
            "message": "Start bullet points with strong action verbs like 'developed', 'optimized', or 'led'.",
            "context": None
        })

    readability = {}
    if textstat:
        try:
            readability['flesch_reading_ease'] = textstat.flesch_reading_ease(resume_text)
        except Exception:
            pass

    grammar_issues = []
    if language_tool_python:
        try:
            # --- MODIFICATION START ---
            # Initialize the tool with more advanced, picky rules enabled.
            tool = language_tool_python.LanguageTool(
                'en-US',
                config={
                    'enabledRules': 'TYPOS,GRAMMAR,UNPAIRED_BRACKETS,PUNCTUATION',
                    'enabledOnly': False,  # This is key, it enables more than just the basics
                    'disabledCategories': 'CASING'  # Ignore simple casing issues
                }
            )
            # --- MODIFICATION END ---

            matches = tool.check(resume_text)
            seen_sentences = set()
            for m in matches:
                # You can filter out rules you find too noisy here
                if m.ruleId in ['MORFOLOGIK_RULE_EN_US', 'UPPERCASE_SENTENCE_START']:
                    continue

                context_sentence = m.sentence
                # --- MODIFICATION START ---
                # Increased the limit of issues from 5 to 8 for more feedback
                if context_sentence not in seen_sentences and len(grammar_issues) < 8:
                    grammar_issues.append({
                        "message": m.message,
                        "context": context_sentence,
                        "replacements": m.replacements[:3]  # Show up to 3 direct suggestions
                    })
                    seen_sentences.add(context_sentence)
                # --- MODIFICATION END ---
        except Exception:
            pass

    return {
        "readability": readability,
        "grammar_issues": grammar_issues,
        "suggestions": suggestions,
    }