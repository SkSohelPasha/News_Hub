import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { NewsGrid } from './components/NewsGrid';
import { NewsDetail } from './components/NewsDetail';
import { NewsArticle, NewsCategory } from './types/news';
import { mockNews } from './data/mockNews';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Filter articles based on category and search term
  const filteredArticles = useMemo(() => {
    let filtered = mockNews;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.summary.toLowerCase().includes(searchLower) ||
        article.content.toLowerCase().includes(searchLower) ||
        article.author.toLowerCase().includes(searchLower)
      );
    }

    // Sort by publish date (newest first)
    return filtered.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category: NewsCategory | 'all') => {
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search when changing categories
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleBackToNews = () => {
    setSelectedArticle(null);
  };

  // Show article detail view
  if (selectedArticle) {
    return (
      <NewsDetail
        article={selectedArticle}
        onBack={handleBackToNews}
      />
    );
  }

  // Show main news feed
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'Latest News' : 
                 selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
            
            {/* Update indicator */}
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Updated daily</span>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <NewsGrid
          articles={filteredArticles}
          onArticleClick={handleArticleClick}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">NewsHub</h3>
            <p className="text-gray-600 text-sm">
              Stay informed with the latest news from around the world.
            </p>
            <p className="text-gray-500 text-xs mt-4">
              © 2025 NewsHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;