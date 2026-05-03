'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Star, GitFork } from 'lucide-react';

interface Repository {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  owner: {
    login: string;
  };
  isPrivate: boolean;
}

interface GithubPinnedReposProps {
  username?: string;
}

function RepoCard({ repo, index }: { repo: Repository; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 10}deg) translateZ(0)`;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  };

  return (
    <Link
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative h-full rounded-2xl p-[1px] transition-transform duration-300 ease-out will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, rgba(34,211,238,0.6), rgba(168,85,247,0.6), rgba(244,114,182,0.6))',
          backgroundSize: '200% 200%',
          animation: 'gradient-x 6s ease infinite',
          animationDelay: `${index * 0.2}s`,
        }}
      >
        <div
          className="relative h-full rounded-2xl bg-white/90 dark:bg-[#0a0f1a]/95 p-6 backdrop-blur-md overflow-hidden"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
        >
          {/* spotlight */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background:
                'radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(168,85,247,0.18), transparent 40%)',
            }}
          />

          {/* Header */}
          <div className="relative flex items-start justify-between mb-3" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <svg
                className="flex-shrink-0 text-fuchsia-500 dark:text-cyan-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125"
                height="20"
                width="20"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
              </svg>
              <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-amber-500 dark:from-cyan-300 dark:via-fuchsia-400 dark:to-amber-300 bg-clip-text text-transparent truncate">
                {repo.name}
              </h3>
            </div>
            <ExternalLink className="flex-shrink-0 w-4 h-4 text-slate-400 dark:text-slate-300 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>

          <p
            className="relative text-slate-700 dark:text-slate-300 text-sm mb-5 line-clamp-2 min-h-[2.5rem]"
            style={{ transform: 'translateZ(15px)' }}
          >
            {repo.description || 'No description available'}
          </p>

          <div
            className="relative flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 font-mono"
            style={{ transform: 'translateZ(10px)' }}
          >
            {repo.primaryLanguage && (
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full ring-2 ring-white dark:ring-slate-900 shadow"
                  style={{
                    backgroundColor: repo.primaryLanguage.color,
                    boxShadow: `0 0 10px ${repo.primaryLanguage.color}`,
                  }}
                />
                <span>{repo.primaryLanguage.name}</span>
              </div>
            )}
            <div className="flex items-center gap-1 group/star">
              <Star className="w-4 h-4 transition-all group-hover/star:fill-amber-400 group-hover/star:text-amber-400" />
              <span>{repo.stargazerCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{repo.forkCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function GithubPinnedRepos({ username = 'leonleerl' }: GithubPinnedReposProps) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPinnedRepos() {
      try {
        const response = await fetch(`/api/github/pinned-repos?username=${username}`);
        if (!response.ok) throw new Error('Failed to fetch pinned repositories');
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        const repositories = data.data?.user?.pinnedItems?.nodes || [];
        setRepos(repositories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPinnedRepos();
  }, [username]);

  return (
    <div className="mb-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300 font-mono">
          {'// '}built with passion · powered by curiosity
        </p>
      </div>

      {loading && (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 animate-pulse bg-white/70 dark:bg-slate-900/40">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-4" />
              <div className="flex gap-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-amber-300/60 bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur p-6">
          <p className="text-amber-900 dark:text-amber-200 font-semibold mb-3">⚠️ GitHub Token Required</p>
          <p className="text-amber-800 dark:text-amber-200 text-sm mb-3">
            The GitHub GraphQL API requires authentication.
          </p>
          <p className="text-amber-700 dark:text-amber-300 text-xs">Error details: {error}</p>
        </div>
      )}

      {!loading && !error && repos.length === 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white/70 dark:bg-slate-900/40">
          <p className="text-slate-600 dark:text-slate-300">No pinned repositories found</p>
        </div>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6" style={{ perspective: '1500px' }}>
          {repos.map((repo, idx) => (
            <RepoCard key={repo.name} repo={repo} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
