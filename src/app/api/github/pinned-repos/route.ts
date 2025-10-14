import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'leonleerl';

  const query = `
    query {
      user(login: "${username}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
              owner {
                login
              }
              isPrivate
            }
          }
        }
      }
    }
  `;

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add GitHub token if available for higher rate limits
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', response.status, errorText);
      throw new Error(`Failed to fetch from GitHub API: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GitHub API errors:', data.errors);
      return NextResponse.json(
        { error: 'GitHub API returned errors', details: data.errors },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching pinned repos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pinned repositories' },
      { status: 500 }
    );
  }
}

