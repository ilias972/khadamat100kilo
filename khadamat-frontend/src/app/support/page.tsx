'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  SupportSearchBar,
  SupportCategoryCard,
  SupportArticleCard,
  SupportFAQAccordion,
  SupportContactCard
} from '@/components/dashboard/dashboard-components';
import {
  mockSupportCategories,
  mockSupportArticles,
  mockFAQItems,
  searchSupportArticles,
  getPopularSupportArticles,
  getPopularFAQItems,
  type SupportCategory,
  type SupportArticle,
  type FAQItem
} from '@/lib/mocks/services-mocks';

export default function SupportPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<SupportArticle[]>([]);
  const [popularArticles, setPopularArticles] = useState<SupportArticle[]>([]);
  const [popularFAQs, setPopularFAQs] = useState<FAQItem[]>([]);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadSupportData = async () => {
      setLoading(true);
      // In a real app, this would be API calls
      setPopularArticles(getPopularSupportArticles(6));
      setPopularFAQs(getPopularFAQItems(5));
      setLoading(false);
    };

    loadSupportData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchSupportArticles(searchQuery);
      setFilteredArticles(results);
    } else {
      setFilteredArticles([]);
    }
  }, [searchQuery]);

  const handleCategoryClick = (category: SupportCategory) => {
    router.push(`/support?category=${category.slug}`);
  };

  const handleArticleClick = (article: SupportArticle) => {
    router.push(`/support/${article.slug}`);
  };

  const handleFAQToggle = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse space-y-12">
              <div className="text-center space-y-4">
                <div className="h-12 bg-surface rounded w-1/2 mx-auto"></div>
                <div className="h-6 bg-surface rounded w-1/3 mx-auto"></div>
                <div className="h-16 bg-surface rounded w-2/3 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-surface rounded-[24px]"></div>
                ))}
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
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-h1 font-bold text-text-primary leading-tight tracking-tight font-heading mb-6">
                Comment pouvons-nous vous aider ?
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed font-body mb-8">
                Trouvez rapidement des réponses ou contactez notre support. Notre équipe est là pour vous accompagner.
              </p>

              <SupportSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                className="mb-8"
              />

              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="mt-8">
                  <h2 className="text-h3 font-bold text-text-primary mb-6 font-heading">
                    Résultats pour "{searchQuery}" ({filteredArticles.length})
                  </h2>
                  {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredArticles.slice(0, 6).map((article) => (
                        <SupportArticleCard
                          key={article.id}
                          article={article}
                          onClick={() => handleArticleClick(article)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-text-secondary mb-4">
                        Aucun résultat trouvé pour votre recherche.
                      </p>
                      <p className="text-sm text-text-muted">
                        Essayez avec d'autres mots-clés ou consultez nos catégories ci-dessous.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        {!searchQuery.trim() && (
          <section className="py-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-h2 font-bold text-text-primary mb-4 font-heading">
                  Catégories populaires
                </h2>
                <p className="text-lg text-text-secondary font-body">
                  Explorez nos guides par thématiques
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {mockSupportCategories.map((category) => (
                  <SupportCategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => handleCategoryClick(category)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Popular Articles */}
        {!searchQuery.trim() && (
          <section className="py-16 bg-surface">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-h2 font-bold text-text-primary mb-4 font-heading">
                  Articles populaires
                </h2>
                <p className="text-lg text-text-secondary font-body">
                  Les questions les plus fréquentes
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularArticles.map((article) => (
                  <SupportArticleCard
                    key={article.id}
                    article={article}
                    onClick={() => handleArticleClick(article)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {!searchQuery.trim() && (
          <section className="py-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FAQ */}
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h2 className="text-h2 font-bold text-text-primary mb-4 font-heading">
                      Questions fréquentes
                    </h2>
                    <p className="text-lg text-text-secondary font-body mb-6">
                      Trouvez rapidement des réponses à vos questions
                    </p>
                  </div>

                  <div className="space-y-4">
                    {popularFAQs.map((faq) => (
                      <SupportFAQAccordion
                        key={faq.id}
                        faq={faq}
                        isOpen={openFAQ === faq.id}
                        onToggle={() => handleFAQToggle(faq.id)}
                      />
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Link href="/faq">
                      <button className="text-[#F97B22] hover:text-[#e66a1f] font-semibold transition-colors">
                        Voir toutes les questions →
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Contact Support */}
                <div className="lg:col-span-1">
                  <SupportContactCard />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}