'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight, Search, Filter } from 'lucide-react';
import { mockBlogArticles, mockBlogCategories, type BlogArticle, type BlogCategory } from '@/lib/mocks/services-mocks';

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>([]);
  const [categories] = useState<BlogCategory[]>(mockBlogCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadArticles = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      setArticles(mockBlogArticles.filter(article => article.isPublished));
      setLoading(false);
    };

    loadArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'all') {
      const category = categories.find(cat => cat.slug === selectedCategory);
      if (category) {
        filtered = filtered.filter(article => article.category === category.name);
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, searchQuery, categories]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-surface rounded w-1/4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="h-96 bg-surface rounded"></div>
                <div className="h-96 bg-surface rounded"></div>
                <div className="h-96 bg-surface rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-[640px] mx-auto lg:mx-0 bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 md:p-8 lg:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <h1 className="text-h1 font-bold text-text-primary leading-tight tracking-tight font-heading text-left mb-4">
                Blog Khadamat
              </h1>
              <p className="text-body text-text-secondary leading-relaxed font-body text-left mb-6">
                Conseils d'experts, guides pratiques et actualités du monde de l'artisanat au Maroc.
              </p>

              {/* Search and Filters */}
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Rechercher un article..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-border-light rounded-[24px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-[#F97B22]/20 focus:border-[#F97B22] transition-all duration-200"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === 'all'
                        ? 'bg-[#F97B22] text-white shadow-lg'
                        : 'bg-white/50 backdrop-blur-sm text-text-secondary hover:bg-[#F97B22]/10 hover:text-[#F97B22]'
                    }`}
                  >
                    Tous les articles
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.slug
                          ? 'bg-[#F97B22] text-white shadow-lg'
                          : 'bg-white/50 backdrop-blur-sm text-text-secondary hover:bg-[#F97B22]/10 hover:text-[#F97B22]'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Summary */}
            <div className="mb-8">
              <p className="text-text-secondary">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} trouvé{filteredArticles.length !== 1 ? 's' : ''}
                {selectedCategory !== 'all' && (
                  <span> dans la catégorie <strong>{categories.find(cat => cat.slug === selectedCategory)?.name}</strong></span>
                )}
                {searchQuery && (
                  <span> pour "<strong>{searchQuery}</strong>"</span>
                )}
              </p>
            </div>

            {filteredArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/blog/${article.slug}`}
                      className="group"
                    >
                      <article className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.02]">
                        <div className="h-48 bg-[#EDEEEF] flex items-center justify-center">
                          <span className="text-text-muted">Image</span>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center space-x-2 mb-3">
                            <span
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: `${categories.find(cat => cat.name === article.category)?.color}20`,
                                color: categories.find(cat => cat.name === article.category)?.color
                              }}
                            >
                              {article.category}
                            </span>
                          </div>
                          <h3 className="text-h4 font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-[#F97B22] transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>{article.author.name}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{article.readTime} min</span>
                            </div>
                          </div>
                          <Button className="w-full bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] py-2 font-semibold transition-all duration-200 group-hover:bg-[#F97B22]/10">
                            Lire l'article
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Load More - Hidden for now since we have limited mock data */}
                {filteredArticles.length >= 9 && (
                  <div className="text-center mt-12">
                    <Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-8 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
                      Charger plus d'articles
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-[#EDEEEF] rounded-[24px] flex items-center justify-center">
                  <Search className="w-12 h-12 text-text-muted" />
                </div>
                <h3 className="text-h3 font-bold text-text-primary mb-2 font-heading">
                  Aucun article trouvé
                </h3>
                <p className="text-body text-text-secondary mb-6 font-body">
                  Essayez de modifier vos critères de recherche ou consultez toutes nos catégories.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-6 py-3 font-semibold transition-all duration-200"
                  >
                    Voir tous les articles
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}