import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Resolve a Vercel Blob by file name and 307-redirect to its public URL.
// Browsers will then stream the asset (with Range support) directly from
// Vercel Blob's CDN, while the BLOB_READ_WRITE_TOKEN stays on the server.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const decoded = decodeURIComponent(name)

    const { blobs } = await list({ prefix: decoded })
    const match =
      blobs.find((b) => b.pathname === decoded) ??
      blobs.find((b) => b.pathname.endsWith(`/${decoded}`)) ??
      blobs[0]

    if (!match) {
      return NextResponse.json(
        { error: `Blob not found: ${decoded}` },
        { status: 404 }
      )
    }

    return NextResponse.redirect(match.url, 307)
  } catch (error) {
    console.error('GET /api/blob/[name] error:', error)
    return NextResponse.json(
      { error: (error as Error).message ?? 'Failed to resolve blob' },
      { status: 500 }
    )
  }
}
