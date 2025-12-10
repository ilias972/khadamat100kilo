'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import {
  SupportArticleCard,
  FeedbackWidget,
  SupportContactCard
} from '@/components/dashboard/dashboard-components';
import {
  getSupportArticleBySlug,
  getRelatedSupportArticles,
  type SupportArticle
} from '@/lib/mocks/services-mocks';

export default function SupportArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<SupportArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<SupportArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  useEffect(() => {
    // Simulate API call
    const loadArticle = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      const found = getSupportArticleBySlug(slug);
      setArticle(found || null);

      if (found) {
        setRelatedArticles(getRelatedSupportArticles(found, 3));
      }

      setLoading(false);
    };

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  const handleHelpful = () => {
    if (article && !feedbackGiven) {
      // In a real app, this would send feedback to the server
      setFeedbackGiven(true);
      alert('Merci pour votre retour ! 👍');
    }
  };

  const handleNotHelpful = () => {
    if (article && !feedbackGiven) {
      // In a real app, this would send feedback to the server
      setFeedbackGiven(true);
      alert('Merci pour votre retour. Nous allons améliorer cet article. 🙏');
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
              <div className="h-12 bg-surface rounded w-3/4"></div>
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
                <Eye className="w-12 h-12 text-text-muted" />
              </div>
              <h1 className="text-h1 font-bold text-text-primary mb-4 font-heading">
                Article non trouvé
              </h1>
              <p className="text-body text-text-secondary mb-6 font-body">
                L'article d'aide que vous recherchez n'existe pas ou n'est plus disponible.
              </p>
              <Link href="/support">
                <Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-6 py-3 font-semibold transition-all duration-200">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l'aide
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
              <Link href="/support" className="hover:text-primary-600">Support</Link>
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
                <span
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${article.categoryColor}20`,
                    color: article.categoryColor
                  }}
                >
                  {article.categoryName}
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
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Mise à jour le {new Date(article.updatedAt).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.views} vues</span>
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-xl text-text-secondary leading-relaxed font-body mb-8">
                {article.excerpt}
              </p>
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
                        .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>')
                        .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
                        .replace(/^(.+?)(?=\n\n|$)/mg, '<p class="mb-4 leading-relaxed">$1</p>')
                    }}
                  />
                </div>

                {/* Feedback Widget */}
                <FeedbackWidget
                  onHelpful={handleHelpful}
                  onNotHelpful={handleNotHelpful}
                  className="mt-8"
                />

                {/* Navigation */}
                <div className="mt-8 flex justify-between items-center">
                  <Link href="/support">
                    <Button className="bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] px-6 py-3 font-semibold transition-all duration-200">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Retour à l'aide
                    </Button>
                  </Link>

                  <div className="flex items-center space-x-4 text-sm text-text-muted">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span>{article.helpful}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsDown className="w-4 h-4 text-red-600" />
                      <span>{article.notHelpful}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6">
                    <h3 className="text-lg font-bold text-text-primary mb-4 font-heading">
                      Articles similaires
                    </h3>
                    <div className="space-y-4">
                      {relatedArticles.map((relatedArticle) => (
                        <Link
                          key={relatedArticle.id}
                          href={`/support/${relatedArticle.slug}`}
                          className="block group"
                        >
                          <div className="flex space-x-3">
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-text-primary group-hover:text-[#F97B22] transition-colors line-clamp-2 mb-1">
                                {relatedArticle.title}
                              </h4>
                              <p className="text-xs text-text-secondary">
                                {relatedArticle.categoryName}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6">
                  <h3 className="text-lg font-bold text-text-primary mb-4 font-heading">
                    Mots-clés
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#F97B22]/10 text-[#F97B22] rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Support */}
                <SupportContactCard />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}