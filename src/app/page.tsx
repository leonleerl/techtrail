"use client"

import { useEffect, useState, useMemo } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { useCategories } from '@/hooks/useCategories';
import { 
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  PostCard,
  Card,
  CardContent,
  CardHeader
} from '@/components/ui';
import { Search, Filter, BookOpen, ChevronLeft, ChevronRight, Sparkles, TrendingUp } from 'lucide-react';

export default function Home() {
  const { posts, isLoading, fetchPosts } = usePosts();
  const { categories, fetchCategories } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    setMounted(true);
    fetchPosts('', 1, 100);
    fetchCategories('', 1, 100);
  }, [fetchPosts, fetchCategories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const filteredAndPaginatedPosts = useMemo(() => {
    let filtered = posts.filter(post => post.published);

    if (searchTerm.trim()) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.categoryId === selectedCategory);
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPosts = filtered.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      totalItems,
      totalPages,
      currentPage
    };
  }, [posts, searchTerm, selectedCategory, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-700/20 opacity-50"></div>
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative container mx-auto px-4 py-10 lg:py-28">
          <div className="text-center max-w-5xl mx-auto">

            <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-fade-in-up delay-200">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                TechTrail
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-12 text-blue-100/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-300">
              Discover the latest insights, tutorials, and trends in technology. 
              Join our community of developers and tech enthusiasts on an incredible journey.
            </p>
            
            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto animate-fade-in-up delay-400">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative flex gap-3 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search for amazing articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 py-4 text-lg bg-transparent border-0 text-white placeholder:text-white/70 focus:ring-2 focus:ring-white/30 rounded-xl"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/30 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-pink-400/30 rounded-full animate-bounce delay-2000"></div>
      </section>

      {/* Filter Section */}
      <section className="relative border-b bg-white/70 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-800 text-lg">Filter by category:</span>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
                <SelectTrigger className="relative w-56 h-12 bg-white border-2 border-gray-200 hover:border-blue-300 rounded-lg shadow-sm transition-all duration-200">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
                  <SelectItem value="all" className="hover:bg-blue-50">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="hover:bg-blue-50">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="ml-auto flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-50 to-blue-50 rounded-full border border-gray-200">
              <div className="p-1 bg-blue-100 rounded-full">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-medium text-gray-700">
                <span className="text-blue-600 font-bold">{filteredAndPaginatedPosts.totalItems}</span> articles found
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="relative container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <Card key={i} className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-0 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                <CardHeader className="relative">
                  <Skeleton className="h-6 w-3/4 bg-gray-200/70" />
                  <Skeleton className="h-4 w-1/2 bg-gray-200/70" />
                </CardHeader>
                <CardContent className="relative">
                  <Skeleton className="h-32 w-full mb-4 bg-gray-200/70" />
                  <Skeleton className="h-4 w-full mb-2 bg-gray-200/70" />
                  <Skeleton className="h-4 w-2/3 bg-gray-200/70" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredAndPaginatedPosts.posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative p-6 bg-white/60 backdrop-blur-sm rounded-full">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">No articles found</h3>
            <p className="text-xl text-gray-500 mb-8">Try adjusting your search terms or filters to discover more content.</p>
            {(searchTerm || selectedCategory !== 'all') && (
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndPaginatedPosts.posts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {filteredAndPaginatedPosts.totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                  <div className="relative flex items-center gap-2 p-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
                    <Button
                      variant="ghost"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {(() => {
                        const totalPages = filteredAndPaginatedPosts.totalPages;
                        const current = currentPage;
                        let startPage = Math.max(1, current - 2);
                        let endPage = Math.min(totalPages, current + 2);
                        
                        if (endPage - startPage < 4) {
                          if (startPage === 1) {
                            endPage = Math.min(totalPages, startPage + 4);
                          } else if (endPage === totalPages) {
                            startPage = Math.max(1, endPage - 4);
                          }
                        }
                        
                        const pages = [];
                        
                        if (startPage > 1) {
                          pages.push(
                            <Button 
                              key={1} 
                              variant="ghost" 
                              onClick={() => handlePageChange(1)} 
                              className="w-10 h-10 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            >
                              1
                            </Button>
                          );
                          if (startPage > 2) {
                            pages.push(<span key="start-ellipsis" className="px-2 text-gray-400">...</span>);
                          }
                        }
                        
                        for (let i = startPage; i <= endPage; i++) {
                          pages.push(
                            <Button
                              key={i}
                              variant={i === current ? "default" : "ghost"}
                              onClick={() => handlePageChange(i)}
                              className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                                i === current 
                                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                                  : "hover:bg-blue-50"
                              }`}
                            >
                              {i}
                            </Button>
                          );
                        }
                        
                        if (endPage < totalPages) {
                          if (endPage < totalPages - 1) {
                            pages.push(<span key="end-ellipsis" className="px-2 text-gray-400">...</span>);
                          }
                          pages.push(
                            <Button 
                              key={totalPages} 
                              variant="ghost" 
                              onClick={() => handlePageChange(totalPages)} 
                              className="w-10 h-10 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            >
                              {totalPages}
                            </Button>
                          );
                        }
                        
                        return pages;
                      })()}
                    </div>
                    
                    <Button
                      variant="ghost"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === filteredAndPaginatedPosts.totalPages}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white py-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Our Impact
            </h2>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
              Join thousands of developers and tech enthusiasts in our growing community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {posts.filter(post => post.published).length}
                </div>
                <div className="text-blue-100/80 font-medium">Published Articles</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
                  <Filter className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {categories.length}
                </div>
                <div className="text-blue-100/80 font-medium">Categories</div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {posts.filter(post => post.published).reduce((total, post) => total + post.views, 0).toLocaleString()}
                </div>
                <div className="text-blue-100/80 font-medium">Total Views</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
