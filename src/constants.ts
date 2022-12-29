export const routePath = {
  home: '/',
  signIn: '/signin',
  signUp: '/signup',
  profile: '/me',
  cart: '/cart',
  createProductURL: ((id: string) => {
    return `/product/${id}`;
  }),
  search: '/search',
  favorites: '/favorites',
} as const;

export const booksQuantityPerPage = 12;

const BOOK_SORTING_OPTIONS = {
  price: 'price',
  averageRate: 'rating',
  dateOfIssue: 'date',
  author: 'author',
  title: 'title',
  '-price': '-price',
  '-dateOfIssue': '-dateOfIssue',
  '-averageRate': '-averageRate',
  '-author': '-author',
  '-title': 'title'
};

const token = {
  access: 'accessToken',
  refresh: 'refreshToken',
};

export default {
  booksQuantityPerPage,
  routePath,
  BOOK_SORTING_OPTIONS,
  token,
};
