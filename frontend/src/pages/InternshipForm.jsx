// src/pages/InternshipForm.jsx
import { useState } from "react";

export default function InternshipForm() {
  // dummy defaults
  const [title] = useState("Internship Title");
  const [details, setDetails] = useState(
    "Work with our product team to assist in feature research, documentation, and QA. Shadow PMs during standups and sprint planning."
  );
  const [skills, setSkills] = useState([
    { name: "Communication", hasIt: null },
    { name: "MS Excel / Google Sheets", hasIt: null },
    { name: "Basic SQL", hasIt: null },
  ]);
  const [locationInfo, setLocationInfo] = useState(
    "Hybrid · Bengaluru · 3 days onsite · Stipend ₹15,000"
  );

  function updateSkillName(i, value) {
    setSkills((s) =>
      s.map((row, idx) => (idx === i ? { ...row, name: value } : row))
    );
  }
  function updateSkillHasIt(i, value) {
    setSkills((s) =>
      s.map((row, idx) => (idx === i ? { ...row, hasIt: value } : row))
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    const payload = { title, details, skills, locationInfo };
    console.log(payload);
    alert("Submitted! Check console for payload.");
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 text-white p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        {/* Title pill */}
        <div className="rounded-xl border border-white/25 bg-gradient-to-b from-neutral-800 to-neutral-700 px-6 py-4 text-center shadow-xl mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold">{title}</h1>
        </div>

        <form onSubmit={onSubmit} className="grid md:grid-cols-3 gap-8">
          {/* Details (full width) */}
          <div className="md:col-span-3">
            <label className="block text-xl font-extrabold mb-2">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-white/30 bg-gradient-to-r from-blue-800 to-blue-600 p-4 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
            />
          </div>

          {/* Skills column */}
          <div className="">
            <h3 className="text-xl font-extrabold mb-3">Skills Required</h3>
            <div className="space-y-4">
              {skills.map((row, i) => (
                <input
                  key={i}
                  value={row.name}
                  onChange={(e) => updateSkillName(i, e.target.value)}
                  className="w-full rounded-full border border-white/30 bg-gradient-to-r from-blue-700 to-blue-500/80 px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                />
              ))}
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-700 px-6 py-3 font-extrabold shadow-[0_0_24px_rgba(56,189,248,.35)] border border-white/30"
            >
              Apply Now
            </button>
          </div>

          {/* Candidate has it? (per skill) */}
          <div>
            <h3 className="text-xl font-extrabold mb-1">candidate has it?</h3>
            <div className="flex gap-12 text-sm text-white/80 mb-2">
              <span>Yes</span>
              <span>No</span>
            </div>

            <div className="space-y-6">
              {skills.map((row, i) => (
                <div key={i} className="flex items-center gap-16">
                  {/* Yes */}
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`hasIt-${i}`}
                      checked={row.hasIt === true}
                      onChange={() => updateSkillHasIt(i, true)}
                      className="h-5 w-5 accent-cyan-400"
                    />
                  </label>
                  {/* No */}
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`hasIt-${i}`}
                      checked={row.hasIt === false}
                      onChange={() => updateSkillHasIt(i, false)}
                      className="h-5 w-5 accent-cyan-400"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Location info */}
          <div>
            <h3 className="text-xl font-extrabold mb-3">Location Info</h3>
            <textarea
              value={locationInfo}
              onChange={(e) => setLocationInfo(e.target.value)}
              rows={8}
              className="w-full rounded-lg border border-white/30 bg-gradient-to-r from-blue-800 to-blue-600 p-4 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
