import { Suspense } from 'react';
import CatalogPage from './CatalogPage';

export const metadata = {
  title: 'Explore Curriculum | Phronesis',
  description: 'Discover thousands of high-quality educational resources tailored to your learning level.',
};

function CatalogSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 animate-pulse">
      <div className="bg-gradient-to-r from-[#163A5F] to-[#1cb5c5] h-44" />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-8">
          <div className="w-64 h-96 bg-slate-200 rounded-2xl" />
          <div className="flex-1 grid grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-slate-200 rounded-2xl h-56" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogPage />
    </Suspense>
  );
}
