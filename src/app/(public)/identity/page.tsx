import { Logo } from "@/components/ui/Logo";

export default function IdentityReference() {
  return (
    <div className="min-h-screen bg-cloud p-8 md:p-16 text-ink">
      <div className="max-w-5xl mx-auto space-y-16">
        
        <header className="border-b border-mist pb-8">
          <Logo variant="horizontal" color="deep-blue" width={250} height={80} />
          <h1 className="mt-8 text-3xl font-serif italic text-slate">
            Genesis of Knowledge
          </h1>
        </header>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold border-b border-mist pb-2 text-phronesis-blue">Typography Scale</h2>
          <div className="space-y-6">
            <div>
              <span className="text-sm text-slate block mb-1">Display (Inter)</span>
              <div className="display-text text-phronesis-blue">Inspiring Greatness</div>
            </div>
            <div>
              <span className="text-sm text-slate block mb-1">H1 (Inter)</span>
              <h1 className="h1">Building Knowledge</h1>
            </div>
            <div>
              <span className="text-sm text-slate block mb-1">H2 (Inter)</span>
              <h2 className="h2">Developing Character</h2>
            </div>
            <div>
              <span className="text-sm text-slate block mb-1">H3 (Inter)</span>
              <h3 className="h3">Preparing Leaders</h3>
            </div>
            <div>
              <span className="text-sm text-slate block mb-1">H4 (Inter)</span>
              <h4 className="h4">Structured Learning</h4>
            </div>
            <div>
              <span className="text-sm text-slate block mb-1">Body Large (Inter)</span>
              <p className="body-large">Phronesis provides structured, accessible and engaging learning experiences that help learners build knowledge, develop character and prepare for the future.</p>
            </div>
            <div>
              <span className="text-sm text-slate block mb-1">Body Text (Inter)</span>
              <p className="body-text">The brand should communicate that education at Phronesis is not merely about passing examinations. It is about helping learners develop practical wisdom.</p>
            </div>
            <div>
              <span className="text-sm text-slate block mb-1">Motto (Source Serif 4 Italic)</span>
              <p className="font-serif italic text-phronesis-gold text-xl">Genesis of Knowledge</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold border-b border-mist pb-2 text-phronesis-blue">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Deep Blue", hex: "#163A5F", var: "var(--color-phronesis-blue)", text: "white" },
              { name: "Teal", hex: "#197C7A", var: "var(--color-phronesis-teal)", text: "white" },
              { name: "Gold", hex: "#D5A63A", var: "var(--color-phronesis-gold)", text: "white" },
              { name: "Ink", hex: "#17212B", var: "var(--color-ink)", text: "white" },
              { name: "Slate", hex: "#52616B", var: "var(--color-slate)", text: "white" },
              { name: "Mist", hex: "#E9EEF2", var: "var(--color-mist)", text: "var(--color-ink)" },
              { name: "Cloud", hex: "#F5F7F9", var: "var(--color-cloud)", text: "var(--color-ink)", border: true },
              { name: "White", hex: "#FFFFFF", var: "white", text: "var(--color-ink)", border: true },
            ].map((color) => (
              <div key={color.name} className="space-y-2">
                <div 
                  className={`h-24 rounded-card flex items-end p-3 ${color.border ? 'border border-mist' : ''}`}
                  style={{ backgroundColor: color.var }}
                >
                  <span className="font-mono text-sm font-medium" style={{ color: color.text }}>{color.hex}</span>
                </div>
                <div className="font-medium text-sm">{color.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold border-b border-mist pb-2 text-phronesis-blue">Logo Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-panel border border-mist shadow-institutional">
            <div className="space-y-4">
              <span className="text-sm font-medium text-slate block">Master Seal</span>
              <div className="flex justify-center items-center h-40 bg-cloud rounded-card">
                <Logo variant="seal" color="full-color" width={100} height={100} />
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-sm font-medium text-slate block">Horizontal</span>
              <div className="flex justify-center items-center h-40 bg-cloud rounded-card">
                <Logo variant="horizontal" color="full-color" width={220} height={80} />
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-sm font-medium text-slate block">Stacked</span>
              <div className="flex justify-center items-center h-40 bg-cloud rounded-card">
                <Logo variant="stacked" color="full-color" width={160} height={160} />
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-sm font-medium text-slate block">Brand Mark</span>
              <div className="flex justify-center items-center h-40 bg-cloud rounded-card">
                <Logo variant="mark" color="full-color" width={80} height={80} />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold border-b border-mist pb-2 text-phronesis-blue">Button UI Foundation</h2>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-phronesis-blue text-white font-medium rounded-input hover:bg-[#112d4a] transition-colors">
              Primary Action
            </button>
            <button className="px-6 py-2.5 bg-white border border-mist text-ink font-medium rounded-input hover:bg-cloud shadow-sm transition-colors">
              Secondary Action
            </button>
            <button className="px-6 py-2.5 text-phronesis-blue font-medium rounded-input hover:bg-cloud transition-colors">
              Tertiary Action
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
