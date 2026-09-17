import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Phronesis Homeschool Platform</h1>
        <p className="mt-4 text-xl">Institutional grade digital education platform.</p>
      </main>
      <Footer />
    </div>
  );
}
