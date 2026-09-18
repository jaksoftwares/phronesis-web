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

  return (
    <div className="min-h-screen bg-cloud text-ink font-sans pb-16">
      <header className="border-b border-mist p-8 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="h3 text-phronesis-blue">Phronesis Brand Asset Library</h1>
            <p className="mt-2 text-slate body-text">
              Official institutional vector logos, variations, and downloads.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 pt-12 space-y-12">
        {/* Palette Selector */}
        <section>
          <h2 className="h4 mb-4 text-phronesis-blue">Color Palette Variants</h2>
          <div className="flex flex-wrap gap-4">
            {palettes.map((palette) => (
              <button
                key={palette.id}
                onClick={() => setActivePalette(palette.id)}
                className={`px-6 py-3 rounded-input border font-medium transition-all ${
                  activePalette === palette.id
                    ? 'border-phronesis-teal bg-phronesis-teal/10 text-phronesis-teal'
                    : 'border-mist hover:border-slate bg-white text-ink'
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
              <div className="border-b border-mist pb-4">
                <h3 className="h4 text-phronesis-blue">{struct.label}</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {/* Visual Preview */}
                <div className={`col-span-1 lg:col-span-2 rounded-panel p-12 flex items-center justify-center border border-mist shadow-institutional ${activePalette === 'white' ? 'bg-ink' : 'bg-white'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/brand/${struct.folder}/phronesis-${struct.id}-${activePalette}.svg`}
                    alt={`Phronesis ${struct.label}`}
                    className="max-w-full h-auto object-contain transition-opacity duration-300"
                    style={{ maxHeight: '400px' }}
                  />
                </div>

                {/* Downloads */}
                <div className="rounded-panel p-8 border border-mist shadow-institutional flex flex-col justify-center space-y-6 bg-white">
                  <div>
                    <h4 className="font-semibold text-lg text-ink">Download Formats</h4>
                    <p className="text-sm mt-1 text-slate">
                      Crisp, high-resolution vector and raster assets.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {formats.map((format) => (
                      <a
                        key={format}
                        href={`/brand/${struct.folder}/phronesis-${struct.id}-${activePalette}.${format}`}
                        download
                        className={`flex items-center justify-center py-3 px-4 rounded-input font-semibold text-sm uppercase transition-colors ${
                          format === 'svg' || format === 'pdf'
                            ? 'bg-phronesis-blue text-white hover:bg-phronesis-blue/90 shadow-sm'
                            : 'bg-cloud text-ink hover:bg-mist border border-mist'
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
