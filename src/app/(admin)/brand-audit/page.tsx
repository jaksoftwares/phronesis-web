"use client";

import { useState } from "react";

const structures = [
  { id: "seal", label: "01 Master Seal", folder: "01-master-seal", width: 400, height: 400 },
  { id: "horizontal", label: "02 Horizontal Lockup", folder: "02-horizontal", width: 800, height: 200 },
  { id: "stacked", label: "03 Stacked Lockup", folder: "03-stacked", width: 400, height: 500 },
  { id: "mark", label: "04 Brand Mark", folder: "04-mark", width: 400, height: 400 },
  { id: "profile", label: "05 Social Profile", folder: "05-social-profile", width: 1080, height: 1080 },
  { id: "banner", label: "06 Social Banner", folder: "06-social-banner", width: 1500, height: 500 },
];

const palettes = [
  { id: "full-color", label: "Full Color" },
  { id: "deep-blue", label: "Deep Blue" },
  { id: "black", label: "Black" },
  { id: "white", label: "White (Reversed)" },
];

const formats = ["svg", "png", "jpg", "pdf"];

export default function BrandAuditDashboard() {
  const [activePalette, setActivePalette] = useState(palettes[0].id);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#17212B] text-white' : 'bg-[#F5F7F9] text-[#17212B]'} font-sans`}>
      <header className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-8`}>
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Phronesis Brand Asset Library</h1>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-[#52616B]'}`}>
              Official institutional vector logos, variations, and downloads.
            </p>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-md font-medium border ${
              isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
            }`}
          >
            Toggle {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </div>
      </header>

      <main className="container mx-auto p-8 space-y-12">
        {/* Palette Selector */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
          <div className="flex flex-wrap gap-4">
            {palettes.map((palette) => (
              <button
                key={palette.id}
                onClick={() => setActivePalette(palette.id)}
                className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                  activePalette === palette.id
                    ? 'border-[#197C7A] bg-[#197C7A]/10 text-[#197C7A]'
                    : isDarkMode ? 'border-gray-700 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {palette.label}
              </button>
            ))}
          </div>
        </section>

        {/* Assets Grid */}
        <section className="space-y-16">
          {structures.map((struct) => (
            <div key={struct.id} className="space-y-6">
              <div className={`border-b pb-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className="text-2xl font-bold">{struct.label}</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {/* Visual Preview */}
                <div className={`col-span-1 lg:col-span-2 rounded-xl p-12 flex items-center justify-center border shadow-sm ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/brand/${struct.folder}/phronesis-${struct.id}-${activePalette}.svg`}
                    alt={`Phronesis ${struct.label}`}
                    className="max-w-full h-auto object-contain transition-opacity duration-300"
                    style={{ maxHeight: '400px' }}
                  />
                </div>

                {/* Downloads */}
                <div className={`rounded-xl p-8 border shadow-sm flex flex-col justify-center space-y-6 ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                  <div>
                    <h4 className="font-semibold text-lg">Download Formats</h4>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Crisp, high-resolution vector and raster assets.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {formats.map((format) => (
                      <a
                        key={format}
                        href={`/brand/${struct.folder}/phronesis-${struct.id}-${activePalette}.${format}`}
                        download
                        className={`flex items-center justify-center py-3 px-4 rounded-md font-semibold text-sm uppercase transition-colors ${
                          format === 'svg' || format === 'pdf'
                            ? 'bg-[#163A5F] text-white hover:bg-[#163A5F]/90'
                            : isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {format}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
