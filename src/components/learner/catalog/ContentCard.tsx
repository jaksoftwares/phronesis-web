'use client';

import React from 'react';
import Link from 'next/link';

const typeConfig: Record<number, { label: string; icon: string; gradient: string }> = {
  0: { label: 'Document',    icon: '📄', gradient: 'from-blue-500 to-indigo-600' },
  1: { label: 'Video',       icon: '🎬', gradient: 'from-rose-500 to-pink-600' },
  2: { label: 'Interactive', icon: '🎮', gradient: 'from-emerald-500 to-teal-600' },
  3: { label: 'Audio',       icon: '🎧', gradient: 'from-violet-500 to-purple-600' },
  4: { label: 'Simulation',  icon: '🔬', gradient: 'from-amber-500 to-orange-600' },
};

interface ContentCardProps {
  id: string;
  title: string;
  description?: string;
  contentType: number;
  isPremium: boolean;
  tags?: string[];
  primaryAttachmentUrl?: string | null;
  authorId?: string;
  publishedAt?: string;
}

export default function ContentCard({
  id,
  title,
  description,
  contentType,
  isPremium,
  tags = [],
  primaryAttachmentUrl,
  publishedAt,
}: ContentCardProps) {
  const type = typeConfig[contentType] ?? typeConfig[0];

  return (
    <Link href={`/learner/catalog/${id}`} className="group block">
      <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out h-full flex flex-col">
        
        {/* Thumbnail / Hero */}
        <div className={`relative h-40 bg-gradient-to-br ${type.gradient} flex items-center justify-center overflow-hidden`}>
          {primaryAttachmentUrl ? (
            <img src={primaryAttachmentUrl} alt={title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="flex flex-col items-center justify-center text-white/90 select-none">
              <span className="text-5xl mb-1">{type.icon}</span>
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/30">
              {type.icon} {type.label}
            </span>
          </div>

          {/* Premium badge */}
          {isPremium && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                ⭐ Premium
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 p-4 flex flex-col">
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors mb-1.5">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-slate-500 line-clamp-2 mb-3 flex-1">
              {description}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-slate-100">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-slate-400">+{tags.length - 3}</span>
              )}
            </div>
          )}

          {publishedAt && (
            <p className="text-xs text-slate-400 mt-2">
              {new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
