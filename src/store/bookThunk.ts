import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import bookApi, { GetAllBooksOptions } from '../api/bookApi';

export const getAllBooksThunk = createAsyncThunk(
  'books/getAllBooksThunk',
  async (data: GetAllBooksOptions) => {
    try {
      const response = await bookApi.getAllBooks(data);
      console.log('resp', response);
      
      return response.data;
    } catch (err) {
      toast.error('Sorry, we were unable to download the books, something went wrong...',
        { autoClose: 5000 });
      throw (err);
    }
  },
);

export const getRecommendations = createAsyncThunk(
  'books/getRecommendations',
  async (id: number) => {
    try {
      const response = await bookApi.getRecommendations(id);
      return response.data;
    } catch (err) {
      toast.error('Sorry, we were unable to download the recommended books...',
        { autoClose: 5000 });
      throw (err);
    }
  },
);
