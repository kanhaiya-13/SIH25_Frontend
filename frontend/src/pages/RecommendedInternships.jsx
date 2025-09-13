// src/pages/RecommendedInternships.jsx
export default function RecommendedInternships() {
  const items = [
    {
      id: 1,
      brand: "amazon",
      title: "Title1",
      desc:
        "I Leikanger har Digdire sommarmcamp for IT-studentar. Vi gir sommarjobb til inntil åtte studentar.",
      logo: <AmazonLogo />,
      topBg: "bg-slate-900",
      bottomGrad: "from-fuchsia-400 via-purple-500 to-sky-400",
    },
    {
      id: 2,
      brand: "portal",
      title: "Title2",
      desc:
        "I Leikanger har Digdire sommarmcamp for IT-studentar. Vi gir sommarjobb til inntil åtte studentar.",
      logo: <PortalLogo />,
      topBg: "bg-slate-900",
      bottomGrad: "from-rose-600 to-indigo-700",
      curve: true,
    },
    {
      id: 3,
      brand: "silber",
      title: "Title3",
      desc:
        "I Leikanger har Digdire sommarmcamp for IT-studentar. Vi gir sommarjobb til inntil åtte studentar.",
      logo: <SilberLogo />,
      topBg: "bg-violet-900",
      bottomGrad: "from-indigo-600 via-blue-600 to-sky-400",
    },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading pill */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/30 bg-gradient-to-b from-neutral-800 to-neutral-900 text-center px-6 py-6 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            Your Recommended Internships
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Card key={it.id} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Card ---------------- */
function Card({ title, desc, logo, topBg, bottomGrad, curve = false }) {
  return (
    <article className="rounded-xl border border-white/40 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,.35)] backdrop-blur">
      {/* top logo zone */}
      <div className={`${topBg} relative h-52 flex items-center justify-center`}>
        {logo}
        {curve && (
          <div className="absolute right-0 bottom-0 w-20 h-20 bg-lime-300 rounded-tl-[100%]" />
        )}
      </div>

      {/* bottom gradient zone */}
      <div
        className={`bg-gradient-to-r ${bottomGrad} p-6 space-y-4`}
      >
        <h3 className="text-2xl font-bold underline decoration-white/60 underline-offset-4">
          {title}
        </h3>
        <p className="text-white/90 leading-relaxed">{desc}</p>

        <div className="flex items-center gap-6 pt-2">
          <GlowBtn>Apply Now</GlowBtn>
          <GlowBtn variant="outline">Details</GlowBtn>
        </div>
      </div>
    </article>
  );
}

/* ---------------- Buttons ---------------- */
function GlowBtn({ children, variant = "solid" }) {
  const base =
    "px-6 py-3 rounded-xl text-lg font-extrabold tracking-wide transition-all duration-200";
  if (variant === "solid") {
    return (
      <button
        className={`${base} text-white shadow-[0_0_18px_rgba(56,189,248,.45)] bg-gradient-to-b from-sky-500 to-indigo-700 border border-white/40`}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={`${base} text-white shadow-[0_0_18px_rgba(99,102,241,.35)] bg-gradient-to-b from-sky-400/60 to-indigo-800/70 border border-white/50`}
    >
      {children}
    </button>
  );
}

/* ---------------- Logos (inline SVGs) ---------------- */
function AmazonLogo() {
  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 300 80" className="w-56 h-16">
        <text
          x="0"
          y="55"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="56"
          fill="#ffffff"
        >
          amazon
        </text>
        <path
          d="M98 66c40 12 84 10 124-8"
          fill="none"
          stroke="#ff9900"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function PortalLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <defs>
          <linearGradient id="pgrad" x1="0" x2="1">
            <stop offset="0" stopColor="#22c55e" />
            <stop offset="0.5" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path
          d="M24 8a16 16 0 0 0 0 32h8a8 8 0 1 0 0-16h-8a8 8 0 1 0 0 16"
          fill="url(#pgrad)"
        />
      </svg>
      <span className="text-4xl font-semibold">Portal</span>
    </div>
  );
}

function SilberLogo() {
  return (
    <div className="text-5xl tracking-widest font-semibold">SILBER</div>
  );
}
