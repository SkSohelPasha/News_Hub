import React from 'react';
import { Clock, User } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { categories } from '../data/mockNews';

interface NewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  const categoryInfo = categories.find(cat => cat.id === article.category);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <article 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
      onClick={onClick}
    >
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      </div>
      
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryInfo?.bgColor} ${categoryInfo?.color}`}>
            {categoryInfo?.icon} {categoryInfo?.name}
          </span>
          <span className="text-xs text-gray-500">{formatDate(article.publishedAt)}</span>
        </div>
        
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
          {article.title}
        </h2>
        
        {/* Summary */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.summary}
        </p>
        
        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};