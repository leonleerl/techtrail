"use client"

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Button,
  MarkdownRenderer
} from '@/components/ui';
import { Calendar, Eye, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: string
  title: string
  slug: string
  content: string
  published: boolean
  views: number
  createdAt: string
  updatedAt: string
  categoryId: string
  category: {
    id: string
    name: string
  }
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      
      <Card className="relative overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 card-hover">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/30 to-purple-50/30 opacity-60"></div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fillOpacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <CardHeader className="relative pb-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <span className="relative px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-semibold tracking-wide uppercase shadow-lg">
                {post.category?.name || 'Uncategorized'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100/70 backdrop-blur-sm rounded-full text-gray-600 text-sm font-medium">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
          </div>
          
          <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
            <Link href={`/blogs/${post.slug}`} className="block">
              {post.title}
            </Link>
          </CardTitle>
          
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
            <div className="p-1 bg-blue-100 rounded-full">
              <Calendar className="w-3 h-3 text-blue-600" />
            </div>
            <span className="font-medium">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="prose prose-sm max-w-none text-gray-600 line-clamp-3 mb-6 leading-relaxed">
            <MarkdownRenderer 
              content={post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
              className="text-sm"
            />
          </div>
          
          <Link href={`/blogs/${post.slug}`} className="block">
            <div className="relative group/btn">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-0 group-hover/btn:opacity-30 transition-opacity duration-300"></div>
              <Button 
                variant="outline" 
                className="relative w-full group/btn bg-white/70 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-semibold py-3 rounded-xl transition-all duration-300 btn-animate"
              >
                <span className="flex items-center justify-center gap-2">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </Link>
        </CardContent>

        {/* Floating decoration */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
        </div>

        {/* Bottom border gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Card>
    </div>
  );
} 