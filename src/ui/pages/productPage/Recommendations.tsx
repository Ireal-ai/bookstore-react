import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import RecommendationsWrapper from './Recommendations.styles';
import BooksRender from '../../components/BooksRender';
import bookApi from '../../../api/bookApi';
import { setRecommended } from '../../../store/bookReducer';

const Recommendations = () => {
  const recommendedBooks = useAppSelector((state) => state.bookReducer.recommended);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await bookApi.getRecommendations();
        dispatch(setRecommended(response.data));
      } catch (err) {
        console.log('ERROR >>', err);
      }
    })();
  }, [dispatch]);

  return (
    <RecommendationsWrapper>
      <h1 className="block_title">Recommendations</h1>
        <BooksRender
          wrap={false}
          booksArray={recommendedBooks}
        />
    </RecommendationsWrapper>
  );
};

export default Recommendations;
