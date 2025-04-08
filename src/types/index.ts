export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: {
    asset: {
      _ref: string;
    };
  };
  publishedAt: string;
  excerpt?: string;
  body?: any;
  author: {
    name: string;
    image?: {
      asset: {
        _ref: string;
      };
    };
  };
  categories: Category[];
}

export interface Author {
  _id: string;
  name: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  bio?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
} 