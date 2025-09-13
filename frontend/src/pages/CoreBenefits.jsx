// src/pages/CoreBenefits.jsx
export default function CoreBenefits() {
  const benefits = [
    {
      title: "12 months real-life experience in India’s top companies",
      icon: BriefcaseIcon(),
    },
    {
      title:
        "Monthly assistance of 4500 rs. by Government of India and 500 rs. by Industry",
      icon: BuildingsIcon(),
    },
    {
      title: "One time Grant of 6000 rs. for incidentals",
      icon: CoinsIcon(),
    },
    {
      title: "Select from top sectors and from top companies of india",
      icon: WalletRupeeIcon(),
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-blue-900/90 to-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-center md:text-left">
          Core Benefits of{" "}
          <span className="text-cyan-400">PM Internship Scheme?</span>
        </h2>

        {/* Grid */}
        <div className="grid gap-14 md:gap-16 lg:grid-cols-2">
          {benefits.map((b, i) => (
            <BenefitCard key={i} title={b.title} icon={b.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Card ---------- */
function BenefitCard({ title, icon }) {
  return (
    <div className="relative">
      {/* floating icon */}
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0">
        {icon}
      </div>

      <div className="rounded-lg border border-white/70 bg-gradient-to-r from-blue-700 to-blue-600 shadow-lg">
        <div className="px-6 md:px-10 py-16 text-center">
          <p className="font-semibold text-xl leading-relaxed">{title}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Inline SVG Icons (no extra deps) ---------- */
function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-20 h-20 text-white drop-shadow"
      fill="currentColor"
    >
      <rect x="10" y="20" width="44" height="28" rx="4" />
      <path d="M24 20v-3a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3h-6v-2h-4v2h-6z" />
      <rect x="10" y="30" width="44" height="6" />
    </svg>
  );
}

function BuildingsIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-20 h-20 text-white drop-shadow"
      fill="currentColor"
    >
      <rect x="12" y="20" width="14" height="28" rx="1.5" />
      <rect x="28" y="12" width="14" height="36" rx="1.5" />
      <rect x="44" y="24" width="8" height="24" rx="1.2" />
      <g>
        <rect x="16" y="24" width="6" height="3" />
        <rect x="16" y="30" width="6" height="3" />
        <rect x="16" y="36" width="6" height="3" />
        <rect x="32" y="16" width="6" height="3" />
        <rect x="32" y="22" width="6" height="3" />
        <rect x="32" y="28" width="6" height="3" />
        <rect x="32" y="34" width="6" height="3" />
      </g>
    </svg>
  );
}

function CoinsIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-20 h-20 drop-shadow"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <defs>
        <linearGradient id="coin" x1="0" x2="1">
          <stop offset="0" stopColor="#FFB300" />
          <stop offset="1" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      <g stroke="url(#coin)" fill="url(#coin)">
        <ellipse cx="26" cy="28" rx="12" ry="7" />
        <rect x="14" y="28" width="24" height="14" rx="4" />
        <ellipse cx="26" cy="42" rx="12" ry="7" />
        <ellipse cx="42" cy="38" rx="12" ry="7" />
      </g>
    </svg>
  );
}

function WalletRupeeIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="w-20 h-20 text-white drop-shadow"
      fill="currentColor"
    >
      <path d="M10 22h36a6 6 0 0 1 6 6v3h-8a6 6 0 0 0 0 12h8v3a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6z" />
      {/* rupee note */}
      <rect x="36" y="28" width="18" height="14" rx="3" fill="#9c27b0" />
      <circle cx="45" cy="35" r="3" fill="#ffeb3b" />
    </svg>
  );
}
