import os
import tempfile

import docx
import fitz
import pdfplumber
from flask import Flask, jsonify, render_template, request
from werkzeug.utils import secure_filename

from ai_component import compute_fit, resume_quality
from database import (add_candidate, add_internship, get_all_internships,
                      init_db)
# --- NEW: Import the ATS checker ---
from ats_checker import check_ats_friendliness

# --- App Setup ---
app = Flask(__name__)
UPLOAD_FOLDER = tempfile.gettempdir()
ALLOWED_EXTENSIONS = {"pdf", "docx"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

init_db()


# --- Utility Functions ---
def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def extract_text_from_file(file_path):
    """Extract raw text from a PDF or DOCX file."""
    ext = file_path.rsplit(".", 1)[1].lower()
    text = ""
    try:
        if ext == "pdf":
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    text += (page.extract_text() or "") + "\n"
            if not text.strip():
                doc = fitz.open(file_path)
                for page in doc:
                    text += page.get_text("text") + "\n"
        elif ext == "docx":
            doc = docx.Document(file_path)
            text = "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        print(f"Error extracting text from {file_path}: {e}")
        return None
    return text.strip()


# --- API Endpoints ---
@app.route("/internship", methods=["POST"])
def create_internship():
    """Endpoint to add a new internship to the database."""
    data = request.get_json(force=True)
    add_internship(
        id=int(data["id"]),
        title=data["title"],
        sector=data.get("sector", ""),
        location=data.get("location", ""),
        requirements=data.get("requirements", {})
    )
    return jsonify({"message": "Internship successfully added."})


@app.route("/internships", methods=["GET"])
def list_internships():
    """Endpoint to retrieve all internships from the database."""
    return jsonify(get_all_internships())


@app.route("/recommendations", methods=["POST"])
def get_recommendations_from_resume():
    """
    Handles resume upload, analysis, and returns internship recommendations.
    """
    if "file" not in request.files or "name" not in request.form:
        return jsonify({"error": "Missing file or candidate name"}), 400

    file = request.files["file"]
    name = request.form["name"]

    if file.filename == "" or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file or empty filename"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    resume_text = extract_text_from_file(file_path)
    os.remove(file_path)

    if not resume_text:
        return jsonify({
            "error": "Could not extract text from the resume."
        }), 500

    candidate_id = add_candidate(name, resume_text)
    all_internships = get_all_internships()
    results = []

    for internship in all_internships:
        fit_score, breakdown = compute_fit(
            internship["requirements"], resume_text
        )
        results.append({
            "internship_id": internship["internship_id"],
            "title": internship["title"],
            "fit_score": fit_score,
            "fit_breakdown": breakdown,
        })

    results.sort(key=lambda x: x["fit_score"], reverse=True)

    # --- NEW: Call the ATS checker and quality functions ---
    quality_report = resume_quality(resume_text)
    ats_report = check_ats_friendliness(resume_text)

    return jsonify({
        "candidate_id": candidate_id,
        "recommendations": results[:5],
        "resume_quality": quality_report,
        "ats_report": ats_report,  # Add the ATS report to the response
    })


# --- HTML Page Routes ---
@app.route("/")
def home():
    """Renders the home page."""
    return render_template("index.html")


@app.route("/internship_page")
def internship_page():
    """Renders the internship registration page."""
    return render_template("internship.html")


@app.route("/candidate_page")
def candidate_page():
    """Renders the candidate application page."""
    return render_template("candidate.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)