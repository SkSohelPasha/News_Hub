export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  category: NewsCategory;
  readTime: number;
}

export type NewsCategory = 'sports' | 'politics' | 'celebrities' | 'technology' | 'automobiles';

export interface CategoryInfo {
  id: NewsCategory;
  name: string;
  color: string;
  bgColor: string;
  icon: string;
}