'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, User, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getBlogArticleBySlug, getPopularBlogArticles, getRelatedBlogArticles, type BlogArticle } from '@/lib/mocks/services-mocks';

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [popularArticles, setPopularArticles] = useState<BlogArticle[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    // Simulate API call
    const loadArticle = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      const found = getBlogArticleBySlug(slug);
      setArticle(found || null);

      if (found) {
        setPopularArticles(getPopularBlogArticles(5));
        setRelatedArticles(getRelatedBlogArticles(found, 3));
      }

      setLoading(false);
    };

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-surface rounded w-1/4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-64 bg-surface rounded"></div>
                  <div className="h-96 bg-surface rounded"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-48 bg-surface rounded"></div>
                  <div className="h-32 bg-surface rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-[#EDEEEF] rounded-[24px] flex items-center justify-center">
                <Share2 className="w-12 h-12 text-text-muted" />
              </div>
              <h1 className="text-h1 font-bold text-text-primary mb-4 font-heading">
                Article non trouvé
              </h1>
              <p className="text-body text-text-secondary mb-6 font-body">
                L'article que vous recherchez n'existe pas ou n'est plus disponible.
              </p>
              <Link href="/blog">
                <Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-6 py-3 font-semibold transition-all duration-200">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au blog
                </Button>
              </Link>
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
        {/* Breadcrumb */}
        <div className="bg-surface border-b border-border-light">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-text-muted">
              <Link href="/" className="hover:text-primary-600">Accueil</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary-600">Blog</Link>
              <span>/</span>
              <span className="text-text-primary">{article.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="px-4 py-2 bg-[#F97B22]/10 text-[#F97B22] rounded-full text-sm font-medium">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-h1 font-bold text-text-primary leading-tight tracking-tight font-heading mb-6">
                {article.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-text-muted">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{article.author.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min de lecture</span>
                </div>
              </div>

              {/* Featured Image */}
              {article.featuredImage && (
                <div className="mb-8">
                  <div className="aspect-video bg-[#EDEEEF] rounded-[24px] overflow-hidden">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Excerpt */}
              <p className="text-xl text-text-secondary leading-relaxed font-body mb-8">
                {article.excerpt}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleShare}
                  className="bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] px-6 py-3 font-semibold transition-all duration-200"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
                <Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-6 py-3 font-semibold transition-all duration-200">
                  <Heart className="w-4 h-4 mr-2" />
                  J'aime ({article.likes})
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 md:p-8 lg:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  <div
                    className="prose prose-lg max-w-none font-body text-text-primary"
                    dangerouslySetInnerHTML={{
                      __html: article.content
                        .replace(/^# (.+)$/gm, '<h1 class="text-h1 font-bold text-text-primary mb-6 font-heading">$1</h1>')
                        .replace(/^## (.+)$/gm, '<h2 class="text-h2 font-bold text-text-primary mt-8 mb-4 font-heading">$1</h2>')
                        .replace(/^### (.+)$/gm, '<h3 class="text-h3 font-bold text-text-primary mt-6 mb-3 font-heading">$1</h3>')
                        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                        .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
                        .replace(/^- (.+)$/gm, '<li class="mb-2">$1</li>')
                        .replace(/(<li>.*<\/li>)/g, '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>')
                        .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
                        .replace(/^(.+?)(?=\n\n|$)/mg, '<p class="mb-4 leading-relaxed">$1</p>')
                    }}
                  />
                </div>

                {/* Navigation */}
                <div className="mt-8 flex justify-between items-center">
                  <Link href="/blog">
                    <Button className="bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] px-6 py-3 font-semibold transition-all duration-200">
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Tous les articles
                    </Button>
                  </Link>

                  <div className="flex space-x-4">
                    <Button className="bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] p-3 transition-all duration-200">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button className="bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] p-3 transition-all duration-200">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Author Card */}
                <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  <h3 className="text-h4 font-bold text-text-primary mb-4 font-heading">À propos de l'auteur</h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-[#EDEEEF] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-text-muted" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">{article.author.name}</p>
                      <p className="text-sm text-text-secondary">{article.author.bio}</p>
                    </div>
                  </div>
                </div>

                {/* Popular Articles */}
                <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  <h3 className="text-h4 font-bold text-text-primary mb-4 font-heading">Articles populaires</h3>
                  <div className="space-y-4">
                    {popularArticles.slice(0, 3).map((popularArticle) => (
                      <Link
                        key={popularArticle.id}
                        href={`/blog/${popularArticle.slug}`}
                        className="block group"
                      >
                        <div className="flex space-x-3">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-text-primary group-hover:text-[#F97B22] transition-colors line-clamp-2 mb-1">
                              {popularArticle.title}
                            </h4>
                            <p className="text-xs text-text-muted">
                              {popularArticle.views} vues
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  <h3 className="text-h4 font-bold text-text-primary mb-4 font-heading">Catégories</h3>
                  <div className="space-y-2">
                    {['Conseils', 'Maintenance', 'Rénovation', 'Économie d\'énergie', 'Sécurité'].map((category) => (
                      <Link
                        key={category}
                        href={`/blog?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-3 py-2 text-sm text-text-secondary hover:text-[#F97B22] hover:bg-[#F97B22]/5 rounded-lg transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="bg-gradient-to-br from-[#F97B22]/10 to-[#F97B22]/5 backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(249,123,34,0.1)]">
                  <h3 className="text-h4 font-bold text-text-primary mb-2 font-heading">Restez informé</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Recevez nos derniers articles et conseils directement dans votre boîte mail.
                  </p>
                  <Button className="w-full bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] py-2 font-semibold transition-all duration-200">
                    S'abonner
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 bg-surface">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-h2 font-bold text-text-primary text-center mb-12 font-heading">
                Articles similaires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/blog/${relatedArticle.slug}`}
                    className="group"
                  >
                    <article className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.02]">
                      <div className="h-48 bg-[#EDEEEF] flex items-center justify-center">
                        <span className="text-text-muted">Image</span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="px-3 py-1 bg-[#F97B22]/10 text-[#F97B22] rounded-full text-xs font-medium">
                            {relatedArticle.category}
                          </span>
                        </div>
                        <h3 className="text-h4 font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-[#F97B22] transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                          {relatedArticle.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-text-muted">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{relatedArticle.readTime} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{relatedArticle.likes}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}