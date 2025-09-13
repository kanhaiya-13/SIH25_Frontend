// src/pages/StartProcess.jsx
import { useState } from "react";

export default function StartProcess() {
  const educationOptions = [
    "10th Pass",
    "12th Pass",
    "Diploma",
    "Undergraduate",
    "Graduate",
    "Postgraduate",
  ];

  const skillOptions = [
    "JavaScript",
    "HTML/CSS",
    "React",
    "Data Analysis",
    "Marketing",
    "Design",
    "Sales",
  ];

  const sectorOptions = [
    "0",
    "1",
    "2",
    "3",
    "4",
  ];

  const locationOptions = [
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Remote",
  ];

  const [form, setForm] = useState({
    education: "",
    skills: [],
    sector: "",
    location: "",
  });

  function handleChange(e) {
    const { name, value, options, multiple } = e.target;
    if (multiple) {
      const vals = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setForm((prev) => ({ ...prev, [name]: vals }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function submit(e) {
    e.preventDefault();
    // TODO: wire to your API / loader
    console.log("Form:", form);
    alert(
      `Education: ${form.education}\nSkills: ${form.skills.join(
        ", "
      )}\nSector: ${form.sector}\nLocation: ${form.location}`
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        {/* Left: form */}
        <div>
          {/* Heading pill */}
          <div className="inline-block rounded-xl border border-white/20 bg-gradient-to-b from-neutral-800 to-neutral-700 px-6 py-4 shadow-xl mb-6">
            <h2 className="text-lg md:text-xl font-semibold">
              Let’s get started with the process!
            </h2>
          </div>

          {/* Form card */}
          <form
            onSubmit={submit}
            className="rounded-xl border-2 border-dashed border-indigo-400/50 p-6 md:p-8 bg-black/10 backdrop-blur"
          >
            {/* 1. Education */}
            <FieldLabel index="1." label="Select your education" />
            <GradientSelect
              name="education"
              value={form.education}
              onChange={handleChange}
              placeholder="Choose education"
              options={educationOptions}
            />

            {/* 2. Skills (multi) */}
            <FieldLabel index="2." label="Add Skills" className="mt-6" />
            <GradientSelect
              name="skills"
              multiple
              value={form.skills}
              onChange={handleChange}
              placeholder="Select one or more skills"
              options={skillOptions}
            />

            {/* 3. Sector / interest */}
            <FieldLabel
              index="3."
              label="Experience"
              className="mt-6"
            />
            <GradientSelect
              name="sector"
              value={form.sector}
              onChange={handleChange}
              placeholder="Select your experience"
              options={sectorOptions}
            />

            {/* 4. Location */}
            <FieldLabel index="4." label="Select Location" className="mt-6" />
            <GradientSelect
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Choose a location"
              options={locationOptions}
            />

            {/* CTA */}
            <button
              type="submit"
              className="mt-7 w-full md:w-auto rounded-xl bg-gradient-to-r from-sky-500 to-indigo-700 px-6 py-3 font-extrabold shadow-[0_0_25px_rgba(56,189,248,.35)] border border-white/30"
            >
              Get Recommendations
            </button>
          </form>
        </div>

        {/* Right: decorative hexagons */}
        <HexDecor />
      </div>
    </section>
  );
}

/* ---------------- Small building blocks ---------------- */

function FieldLabel({ index, label, className = "" }) {
  return (
    <label className={`block font-extrabold text-white mb-2 ${className}`}>
      <span className="mr-2">{index}</span>
      {label}
    </label>
  );
}

function GradientSelect({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  multiple = false,
}) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        multiple={multiple}
        className={`w-full appearance-none rounded-md border border-white/20 bg-gradient-to-r from-blue-700 to-blue-500/80 px-4 py-3 pr-10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 ${
          multiple ? "min-h-[3.25rem]" : ""
        }`}
      >
        {!multiple && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-slate-800">
            {opt}
          </option>
        ))}
      </select>

      {/* caret */}
      {!multiple && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/90">
          ▾
        </span>
      )}
    </div>
  );
}

/* ---------------- Decorative right side ---------------- */
function HexDecor() {
  return (
    <div className="relative hidden md:block">
      {/* honeycomb top-right */}
      <svg
        className="absolute -top-4 right-6 w-40 opacity-40"
        viewBox="0 0 200 120"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="2"
      >
        {mesh(6, 3, 28, 18).map((p, i) => (
          <polygon key={i} points={p} />
        ))}
      </svg>

      {/* stacked translucent hexes */}
      <div className="relative h-[520px]">
        <Hex x="36" y="120" size="110" />
        <Hex x="210" y="210" size="80" />
        <Hex x="150" y="330" size="110" />
        <Hex x="300" y="420" size="85" />
      </div>
    </div>
  );
}

function Hex({ x, y, size }) {
  const s = Number(size);
  const pts = hexPoints(s)
    .map(([px, py]) => `${px + x},${py + y}`)
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${s * 2} ${s * 2}`}
      width={s * 2}
      height={s * 2}
      className="absolute opacity-60"
      style={{ left: x, top: y }}
    >
      <polygon
        points={pts}
        fill="rgba(59,130,246,0.1)"
        stroke="rgba(148,163,184,0.35)"
        strokeWidth="2"
      />
    </svg>
  );
}

/* --- helpers for the hex mesh --- */
function hexPoints(r) {
  const a = (Math.PI / 180) * 30; // flat-top
  const coords = [];
  for (let i = 0; i < 6; i++) {
    const angle = a + (i * Math.PI) / 3;
    coords.push([r + r * Math.cos(angle), r + r * Math.sin(angle)]);
  }
  return coords;
}
function mesh(cols, rows, size, gap) {
  const pts = [];
  const w = size * Math.sqrt(3);
  const h = size * 1.5;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * (w + gap) + (r % 2 ? (w + gap) / 2 : 0);
      const y = r * (h + gap * 0.6);
      const p = hexPoints(size)
        .map(([px, py]) => `${px + x},${py + y}`)
        .join(" ");
      pts.push(p);
    }
  }
  return pts;
}
