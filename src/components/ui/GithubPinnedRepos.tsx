'use client';

import React, { useEffect, useState } from 'react';
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

export function GithubPinnedRepos({ username = 'leonleerl' }: GithubPinnedReposProps) {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPinnedRepos() {
      try {
        const response = await fetch(`/api/github/pinned-repos?username=${username}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch pinned repositories');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

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

  if (loading) {
    return (
      <div className="mb-20">

        <div className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Projects</div>

        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-300 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              <div className="flex gap-4">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-amber-900 font-semibold mb-3">⚠️ GitHub Token Required</p>
          <p className="text-amber-800 text-sm mb-3">
            The GitHub GraphQL API requires authentication. Please follow these steps:
          </p>
          <ol className="text-amber-800 text-sm space-y-2 list-decimal list-inside mb-3">
            <li>Create a token at: <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">github.com/settings/tokens</a></li>
            <li>Select <code className="bg-amber-100 px-1 rounded">public_repo</code> and <code className="bg-amber-100 px-1 rounded">read:user</code> scopes</li>
            <li>Add to <code className="bg-amber-100 px-1 rounded">.env.local</code>: <code className="bg-amber-100 px-1 rounded">GITHUB_TOKEN=your_token</code></li>
            <li>Restart the development server</li>
          </ol>
          <p className="text-amber-700 text-xs">
            Error details: {error}
          </p>
        </div>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600">No pinned repositories found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Featured Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {repos.map((repo) => (
          <Link
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="bg-white rounded-lg border border-gray-300 p-6 h-full dark:bg-slate-100 hover:border-blue-500 hover:shadow-md transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <svg
                    className="flex-shrink-0 text-gray-600"
                    height="16"
                    width="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                  </svg>
                  <h3 className="text-lg font-semibold text-blue-600 group-hover:underline truncate">
                    {repo.name}
                  </h3>
                </div>
                <ExternalLink className="flex-shrink-0 w-4 h-4 text-gray-400 ml-2" />
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                {repo.description || 'No description available'}
              </p>

              {/* Footer */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {/* Language */}
                {repo.primaryLanguage && (
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: repo.primaryLanguage.color }}
                    ></span>
                    <span>{repo.primaryLanguage.name}</span>
                  </div>
                )}

                {/* Stars */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{repo.stargazerCount}</span>
                </div>

                {/* Forks */}
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  <span>{repo.forkCount}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

