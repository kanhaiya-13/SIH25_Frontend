import React from "react";
import { Search } from "lucide-react";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Hexagonal Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        {/* Top right hexagons */}
        <div className="absolute top-8 right-8 w-64 h-64">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {Array.from({ length: 15 }, (_, i) => {
              const row = Math.floor(i / 5);
              const col = i % 5;
              const x = col * 25 + (row % 2) * 12.5;
              const y = row * 22;
              return (
                <polygon
                  key={i}
                  points="12,2 22,8 22,18 12,24 2,18 2,8"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="0.5"
                  transform={`translate(${x}, ${y})`}
                />
              );
            })}
          </svg>
        </div>

        {/* Bottom left hexagons */}
        <div className="absolute bottom-8 left-8 w-48 h-48">
          <svg viewBox="0 0 150 150" className="w-full h-full">
            {Array.from({ length: 12 }, (_, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const x = col * 25 + (row % 2) * 12.5;
              const y = row * 22;
              return (
                <polygon
                  key={i}
                  points="12,2 22,8 22,18 12,24 2,18 2,8"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="0.5"
                  transform={`translate(${x}, ${y})`}
                />
              );
            })}
          </svg>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header with Search Box */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="bg-blue-500 rounded-full px-6 py-3 flex items-center gap-3 shadow-lg">
              <span className="text-white font-medium text-lg">
                But what's the process of applying for internship?
              </span>
              <div className="bg-blue-400 rounded-full p-2">
                <Search className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-16">
          <h2 className="text-white text-xl font-medium">
            Well here are some easy steps you can follow.
          </h2>
        </div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto">
          {/* First Row */}
          <div className="flex justify-center gap-12 mb-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-2 border-cyan-400 bg-slate-800/50 flex items-center justify-center relative overflow-hidden group hover:border-cyan-300 transition-colors duration-300">
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-full">
                    <svg
                      className="w-full h-full animate-spin"
                      style={{ animationDuration: "8s" }}
                    >
                      <circle
                        cx="50%"
                        cy="50%"
                        r="49%"
                        fill="none"
                        stroke="url(#gradient1)"
                        strokeWidth="2"
                        strokeDasharray="20 10"
                        opacity="0.7"
                      />
                      <defs>
                        <linearGradient id="gradient1">
                          <stop offset="0%" stopColor="#0ea5e9" />
                          <stop offset="50%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#0ea5e9" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-center z-10">
                    <div className="text-white font-semibold text-lg mb-1">
                      Select your
                    </div>
                    <div className="text-white font-semibold text-lg">
                      Education
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-2 border-cyan-400 bg-slate-800/50 flex items-center justify-center relative overflow-hidden group hover:border-cyan-300 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-full">
                    <svg
                      className="w-full h-full animate-spin"
                      style={{
                        animationDuration: "10s",
                        animationDirection: "reverse",
                      }}
                    >
                      <circle
                        cx="50%"
                        cy="50%"
                        r="49%"
                        fill="none"
                        stroke="url(#gradient2)"
                        strokeWidth="2"
                        strokeDasharray="15 15"
                        opacity="0.7"
                      />
                      <defs>
                        <linearGradient id="gradient2">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="50%" stopColor="#0ea5e9" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-center z-10">
                    <div className="text-white font-semibold text-lg mb-1">
                      Add your
                    </div>
                    <div className="text-white font-semibold text-lg">
                      skills
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-2 border-cyan-400 bg-slate-800/50 flex items-center justify-center relative overflow-hidden group hover:border-cyan-300 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-full">
                    <svg
                      className="w-full h-full animate-spin"
                      style={{ animationDuration: "12s" }}
                    >
                      <circle
                        cx="50%"
                        cy="50%"
                        r="49%"
                        fill="none"
                        stroke="url(#gradient3)"
                        strokeWidth="2"
                        strokeDasharray="25 5"
                        opacity="0.7"
                      />
                      <defs>
                        <linearGradient id="gradient3">
                          <stop offset="0%" stopColor="#0ea5e9" />
                          <stop offset="50%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#0ea5e9" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-center z-10">
                    <div className="text-white font-semibold text-lg mb-1">
                      Select your
                    </div>
                    <div className="text-white font-semibold text-lg">
                      sector/interest
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex justify-center gap-12 mb-16">
            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-2 border-cyan-400 bg-slate-800/50 flex items-center justify-center relative overflow-hidden group hover:border-cyan-300 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-full">
                    <svg
                      className="w-full h-full animate-spin"
                      style={{
                        animationDuration: "9s",
                        animationDirection: "reverse",
                      }}
                    >
                      <circle
                        cx="50%"
                        cy="50%"
                        r="49%"
                        fill="none"
                        stroke="url(#gradient4)"
                        strokeWidth="2"
                        strokeDasharray="18 12"
                        opacity="0.7"
                      />
                      <defs>
                        <linearGradient id="gradient4">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="50%" stopColor="#0ea5e9" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-center z-10">
                    <div className="text-white font-semibold text-lg mb-1">
                      Enter location
                    </div>
                    <div className="text-white font-semibold text-lg">
                      you want
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-2 border-cyan-400 bg-slate-800/50 flex items-center justify-center relative overflow-hidden group hover:border-cyan-300 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-full">
                    <svg
                      className="w-full h-full animate-spin"
                      style={{ animationDuration: "11s" }}
                    >
                      <circle
                        cx="50%"
                        cy="50%"
                        r="49%"
                        fill="none"
                        stroke="url(#gradient5)"
                        strokeWidth="2"
                        strokeDasharray="22 8"
                        opacity="0.7"
                      />
                      <defs>
                        <linearGradient id="gradient5">
                          <stop offset="0%" stopColor="#0ea5e9" />
                          <stop offset="50%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#0ea5e9" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-center z-10">
                    <div className="text-white font-semibold text-lg mb-1">
                      Get recommen
                    </div>
                    <div className="text-white font-semibold text-lg">
                      dations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
