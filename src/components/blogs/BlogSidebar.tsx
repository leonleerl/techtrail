"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'

interface Post {
  id: string
  slug: string
  title: string
  views: number
  createdAt: string
}

interface BlogSidebarProps {
  popularPosts?: Post[]
}

function BlogSidebar({ popularPosts = [] }: BlogSidebarProps) {
  const router = useRouter()

  return (
    <div className="w-full lg:w-80 space-y-6">

      {/* Popular articles */}
      {popularPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularPosts.slice(0, 5).map((post, index) => (
                <div key={post.id}>
                  <button
                    onClick={() => router.push(`/blogs/${post.slug}`)}
                    className="w-full text-left group hover:cursor-pointer hover:-translate-y-0.5 transition-transform duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>
                  </button>
                  {index < Math.min(popularPosts.length, 5) - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular docs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Useful Links <span className="text-primary">🔗</span></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex flex-wrap items-start gap-2">
                <div className="flex-shrink-0 font-semibold">Etherscan:</div>
                <div className="flex-1 min-w-0">
                    <a 
                      href="https://etherscan.io/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 break-words"
                    >
                      https://etherscan.io/
                    </a>
                </div>
            </div>
            <div className="flex flex-wrap items-start gap-2">
                <div className="flex-shrink-0 font-semibold">OpenSea:</div>
                <div className="flex-1 min-w-0">
                    <a 
                      href="https://opensea.io/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 break-words"
                    >
                      https://opensea.io/
                    </a>
                </div>
            </div>
            
            <div className="flex flex-wrap items-start gap-2">
                <div className="flex-shrink-0 font-semibold">Foundry:</div>
                <div className="flex-1 min-w-0">
                    <a 
                      href="https://getfoundry.sh/introduction/getting-started" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 break-words"
                    >
                      https://getfoundry.sh/introduction/getting-started
                    </a>
                </div>
            </div>
            <div className="flex flex-wrap items-start gap-2">
                <div className="flex-shrink-0 font-semibold">Wagmi:</div>
                <div className="flex-1 min-w-0">
                    <a 
                      href="https://wagmi.sh/react/guides/connect-wallet" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 break-words"
                    >
                      https://wagmi.sh/react/guides/connect-wallet
                    </a>
                </div>
            </div>
            <div className="flex flex-wrap items-start gap-2">
                <div className="flex-shrink-0 font-semibold">PoW Faucet:</div>
                <div className="flex-1 min-w-0">
                    <a 
                      href="https://faucets.pk910.de/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 break-words"
                    >
                      https://faucets.pk910.de/
                    </a>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { BlogSidebar }

