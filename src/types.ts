import constants from './constants';

export type AuthResponse = {
  token: string;
  user: User
  message?: string;
};

export type AuthData = {
  password: string;
  email: string;
};

export type Token = string | undefined;

export type User = {
  id: number;
  email: string;
  name?: string;
  avatar?: string | null;
  ratings?: RatingObj[];
  books?: BooksArray;
}

export type RatingObj = {
  book: BookType;
  rating: number;
}

export type BookType = {
  author: string;
  bookId: number;
  cover: string;
  dateOfIssue?: Date;
  price: number;
  quantity?: number;
  title: string;
  description: string;
  averageRate: number;
  comments: Comment[];
  isInFavorite: boolean;
}
export type BooksArray = BookType[];

export type QuerySearchOptions = {
  page?: string;
  limit?: string;
  genre?: string;
  price_min?: string;
  price_max?: string;
  ordering?: BookSortOptions;
  orderDir?: 'ASC' | 'DESC';
  value?: string;
}

export type BookSortOptions = keyof typeof constants.BOOK_SORTING_OPTIONS

export type Genre = {
  genreId: number;
  name: string;
}

export type Comment = {
  commentId: number;
  date: string;
  text: string;
  user: User;
}
