import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import Features from "./Features";
import Eligibility from "./Eligibility";
import CoreBenefits from "./CoreBenefits";
import Footer from "./Footer";

const sampleRecs = [
  {
    id: 1,
    company: "amazon",
    title: "Title1",
    blurb:
      "Learn/ship at giant companies to accelerate your PM instincts and product taste.",
    cta: "Apply Now",
    badge: "Details",
    logoBg: "bg-black",
  },
  {
    id: 2,
    company: "Portal",
    title: "Title2",
    blurb:
      "Leverage high-growth environments to own 0→1 scopes and experiments.",
    cta: "Apply Now",
    badge: "Details",
    logoBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
  },
  {
    id: 3,
    company: "SILBER",
    title: "Title3",
    blurb:
      "Ship customer-obsessed features while learning prioritization and roadmapping.",
    cta: "Apply Now",
    badge: "Details",
    logoBg: "bg-indigo-900",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen text-white bg-brand-900 bg-grid">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pt-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT: Hero */}
          <HeroPanel />

          {/* RIGHT: Recommendations + Form */}
          <RightPanel />
        </div>
      </main>
      <Features />
      <Eligibility />
      <CoreBenefits />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function TopNav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-brand-900/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* logo stub */}
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-brand.neon to-brand.accent shadow-neon" />
            <span className="font-semibold tracking-wide">
              PM INTERNSHIP RECOMMENDER
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#" className="hover:text-white">
              Home
            </a>
            <a href="#" className="hover:text-white">
              About us
            </a>
            <a href="#" className="hover:text-white">
              Contact
            </a>
            <a href="/start-process" className="ml-2 rounded-lg bg-white text-black px-4 py-2 font-medium hover:bg-white/90 transition">
              Sign up/Login
            </a>
          </nav>

          {/* mobile auth button */}
          <button className="md:hidden rounded-lg bg-white text-black px-3 py-2 font-medium">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}

/* --------------- LEFT HERO --------------- */
function HeroPanel() {
  const navigate = useNavigate();
  return (
    <section className="relative rounded-2xl border border-white/10 bg-brand-800/60 p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,.25)] overflow-hidden">
      {/* neon corner line (just a vibe) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-2 top-6 bottom-6 w-1 bg-brand-neon/70 blur-[2px] rounded-full shadow-[0_0_25px_rgba(57,210,255,.65)]" />
      </div>

      <div className="max-w-xl space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05]">
          <span className="block">Take The</span>
          <span className="block">internship.</span>
        </h1>

        <p className="text-white/80 leading-relaxed">
          Explore opportunities that help you grow. Gain real-world experience
          and build a successful career path tailored just for you!
        </p>

        <div className="flex gap-4 pt-2">
          <button className="rounded-xl bg-brand-neon/90 text-black px-5 py-3 font-semibold shadow-neon hover:bg-brand-neon transition">
            Start now!
          </button>
          <button
            className="rounded-xl bg-white/10 px-5 py-3 font-semibold border border-white/15 hover:bg-white/15 transition"
            onClick={() => {
              navigate("/process-exp");
            }}
          >
            Learn how it works
          </button>
        </div>

        {/* footer glow line */}
        <div className="mt-10 h-1 w-full bg-gradient-to-r from-transparent via-brand-neon/60 to-transparent blur-[1px]" />
      </div>
    </section>
  );
}

/* --------------- RIGHT PANEL --------------- */
function RightPanel() {
  return (
    <section className="space-y-8">
      <RecommendationTray />
      <ApplicationForm />
    </section>
  );
}

/* --------------- RECOMMENDATIONS --------------- */
function RecommendationTray() {
  return (
    <div className="rounded-2xl border border-white/10 bg-brand-800/60 p-5 md:p-6 shadow-[0_0_40px_rgba(0,0,0,.25)]">
      <div className="mb-4">
        <div className="mx-auto w-full max-w-md rounded-full border border-white/10 bg-black/30 text-center py-2 text-sm tracking-wide">
          Your Recommended Internships
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleRecs.map((r) => (
          <RecCard key={r.id} rec={r} />
        ))}
      </div>
    </div>
  );
}

function RecCard({ rec }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3 flex flex-col gap-3 hover:border-brand-neon/50 transition">
      <div
        className={`h-24 rounded-lg ${rec.logoBg} flex items-center justify-center text-xs uppercase tracking-widest`}
      >
        <span className="opacity-90">{rec.company}</span>
      </div>
      <div className="space-y-2">
        <a href="#" className="text-brand-neon hover:underline text-sm">
          {rec.title}
        </a>
        <p className="text-[12px] text-white/70 leading-relaxed line-clamp-3">
          {rec.blurb}
        </p>
      </div>
      <div className="mt-auto flex items-center gap-2">
        <button className="px-3 py-1.5 rounded-md text-xs font-semibold bg-white text-black">
          {rec.cta}
        </button>
        <button className="px-3 py-1.5 rounded-md text-xs font-semibold bg-white/10 border border-white/15 hover:bg-white/15">
          {rec.badge}
        </button>
      </div>
    </div>
  );
}

/* --------------- FORM --------------- */
function ApplicationForm() {
  const [skills, setSkills] = useState(["", "", ""]);

  return (
    <div className="rounded-2xl border border-white/10 bg-brand-800/60 p-5 md:p-6 shadow-[0_0_40px_rgba(0,0,0,.25)]">
      <div className="mb-4">
        <div className="mx-auto w-full max-w-xs rounded-full border border-white/10 bg-black/30 text-center py-2 text-sm tracking-wide">
          Internship Title
        </div>
      </div>

      <div className="grid gap-5">
        {/* Details */}
        <div>
          <label className="text-sm text-white/80">Details</label>
          <textarea
            className="mt-2 w-full min-h-[120px] rounded-xl bg-black/30 border border-white/15 p-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-neon/60"
            placeholder="Write internship details, responsibilities, and expectations..."
          />
        </div>

        {/* Skills + Candidate has it + Location */}
        <div className="grid gap-5 md:grid-cols-3">
          {/* Skills Required */}
          <div>
            <label className="text-sm text-white/80">Skills Required</label>
            <div className="mt-2 space-y-2">
              {skills.map((val, i) => (
                <input
                  key={i}
                  value={val}
                  onChange={(e) =>
                    setSkills((s) =>
                      s.map((v, idx) => (idx === i ? e.target.value : v))
                    )
                  }
                  placeholder={`Skill ${i + 1}`}
                  className="w-full rounded-lg bg-black/30 border border-white/15 p-2 focus:outline-none focus:ring-2 focus:ring-brand-neon/60 placeholder:text-white/40"
                />
              ))}
            </div>
          </div>

          {/* Candidate has it? */}
          <div>
            <label className="text-sm text-white/80">candidate has it?</label>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <span className="text-white/60">Yes</span>
              <span className="text-white/60">No</span>
              <span className="text-white/60">Maybe</span>
              {[0, 1, 2].map((row) => (
                <div key={row} className="contents">
                  <CheckboxCell />
                  <CheckboxCell />
                  <CheckboxCell />
                </div>
              ))}
            </div>
          </div>

          {/* Location Info */}
          <div>
            <label className="text-sm text-white/80">Location Info</label>
            <textarea
              className="mt-2 w-full h-[130px] rounded-lg bg-black/30 border border-white/15 p-2 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-neon/60"
              placeholder="City, remote/hybrid, visa/help, time-zone overlap…"
            />
          </div>
        </div>

        {/* Apply CTA */}
        <div className="pt-2">
          <button className="rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckboxCell() {
  return (
    <label className="flex items-center justify-center">
      <input type="checkbox" className="size-4 accent-brand-neon rounded-sm" />
    </label>
  );
}
