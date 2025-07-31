import React from 'react';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { categories } from '../data/mockNews';

interface NewsDetailProps {
  article: NewsArticle;
  onBack: () => void;
}

export const NewsDetail: React.FC<NewsDetailProps> = ({ article, onBack }) => {
  const categoryInfo = categories.find(cat => cat.id === article.category);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to News</span>
          </button>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-xl shadow-sm p-8">
          {/* Category Badge */}
          <div className="flex items-center mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${categoryInfo?.bgColor} ${categoryInfo?.color}`}>
              {categoryInfo?.icon} {categoryInfo?.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} minute read</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-sm"
            />
          </div>

          {/* Summary */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-300">
            <p className="text-lg text-gray-700 font-medium leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Share this article:</span>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                    Twitter
                  </button>
                  <button className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors duration-200 text-sm">
                    Facebook
                  </button>
                  <button className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 text-sm">
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};