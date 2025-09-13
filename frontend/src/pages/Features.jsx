import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Features() {
  const features = ["100% Free", "Government Approved", "Mobile Friendly"];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-black">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 text-center sm:text-left">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center sm:justify-start gap-3"
            >
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
              <span className="text-white font-semibold text-lg">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
