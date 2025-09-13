export default function Eligibility() {
  const criteria = [
    {
      title: "Age",
      desc: "21–24 years",
      icon: (
        <div className="text-white text-3xl font-extrabold border-4 border-dashed rounded-full w-16 h-16 flex items-center justify-center">
          21+
        </div>
      ),
    },
    {
      title: "Job status",
      desc: "Not employed fulltime",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="orange"
          viewBox="0 0 24 24"
          className="w-12 h-12"
        >
          <path d="M9 2a1 1 0 0 0-1 1v1H6a2 2 0 0 0-2 2v3h16V6a2 2 0 0 0-2-2h-2V3a1 1 0 0 0-1-1H9zm1 2h4V4h-4v0zm-6 7v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9H4z" />
        </svg>
      ),
    },
    {
      title: "Education",
      desc: "Not enrolled fulltime",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          className="w-12 h-12"
        >
          <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" />
          <path d="M11 12.84L3 9v2l8 3.84V21h2v-6.16L21 11V9l-10 3.84z" />
        </svg>
      ),
    },
    {
      title: "Family",
      desc: (
        <>
          <p>No one is earning more than 8 lacs</p>
          <p>No one has Govt. Job</p>
        </>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          className="w-12 h-12"
        >
          <path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V21h14v-4.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V21h6v-4.5C23 14.17 18.33 13 16 13z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-blue-900/90 to-black text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center">
          Are You <span className="text-cyan-400">Eligible?</span>
        </h2>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2">
          {criteria.map((c, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center text-center p-6 rounded-lg border border-white/60 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg"
            >
              <div className="mb-4">{c.icon}</div>
              <h3 className="text-xl font-bold">{c.title}</h3>
              <div className="mt-2 text-white/90 text-sm">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
