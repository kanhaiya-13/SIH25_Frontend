import json
import sqlite3

DB_NAME = 'internships.db'


def init_db():
    """Initializes the database and creates tables if they don't exist."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS internships (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            sector TEXT,
            location TEXT,
            skills_required TEXT, -- Stored as a JSON string
            experience INTEGER,
            education TEXT -- Stored as a JSON string
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS candidates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            resume_text TEXT NOT NULL
        )
    ''')

    conn.commit()
    conn.close()


def add_internship(
    id, title, sector, location, requirements
):
    """Adds or replaces an internship in the database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT OR REPLACE INTO internships (
            id, title, sector, location, skills_required, experience, education
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            id,
            title,
            sector,
            location,
            json.dumps(requirements.get("skills", [])),
            requirements.get("experience"),
            json.dumps(requirements.get("education", [])),
        ),
    )
    conn.commit()
    conn.close()


def get_all_internships():
    """Retrieves all internships from the database."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, title, sector, location, skills_required, experience, education FROM internships"
    )
    rows = cursor.fetchall()
    conn.close()

    internships = []
    for row in rows:
        internships.append({
            "internship_id": row[0],
            "title": row[1],
            "sector": row[2],
            "location": row[3],
            "requirements": {
                "skills": json.loads(row[4]),
                "experience": row[5],
                "education": json.loads(row[6]),
            },
        })
    return internships


def add_candidate(name, resume_text):
    """Adds a new candidate to the database and returns their ID."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO candidates (name, resume_text) VALUES (?, ?)",
        (name, resume_text)
    )
    conn.commit()
    candidate_id = cursor.lastrowid
    conn.close()
    return candidate_id