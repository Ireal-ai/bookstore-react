import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import bookApi from '../../../api/bookApi';
import { Book, RatingObj } from '../../../types';
import CommonButton from '../../components/CommonButton';
import Rating from '../../components/Rating';
import CommonWrapper from '../../styles/CommonWrapper';
import ProductPageWrapper from './ProductPage.styles';
import filledStarIcon from '../../images/StarFilled.png';
import backArrow from '../../images/backArrow.png';
import { useAppSelector } from '../../../store';

const ProductPage = () => {
  const [book, setBook] = useState<Book>();
  const [isChangeRating, setIsChangeRating] = useState(false);
  const user = useAppSelector((state) => state.userReducer.user);
  const params = useParams();

  useEffect(() => {
    try {
      (async () => {
        if (!params.id) return;
        const response = await bookApi.getOneBook(params.id);
        setBook(response.data.book);
      })();
    } catch (err) {
      console.log('ERROR', err);
    }
  }, [params.id]);
  if (!book) return null;

  const handleChangeRating = () => {
    setIsChangeRating(!isChangeRating);
  };

  const currentUserRating = user?.ratings?.find((item: RatingObj) => {
    return item.book.bookId === book.bookId;
  });
  return (
    <CommonWrapper>
      <ProductPageWrapper>
        <img
          className="cover"
          src={book.cover}
          alt={`${book.title} cover`} />
        <div className="book-info">
          <p className="title">
            {book.title}
          </p>
          <p className="subtitle">
            {book.author}
          </p>
          <div className="rating">
            <div className="rating__averageRate">
              <img
                src={filledStarIcon}
                className="icon"
              />
              <div className="updateRate">{book.averageRate}</div>
            </div>
            <Rating
              book_id={book.bookId}
              rate={currentUserRating?.rating || 0}
              isChangeRating={isChangeRating}
              handleChangeRating={handleChangeRating}
            />
            <div
              className="updateRate"
              onClick={handleChangeRating}
            >
              <img className="arrow" src={backArrow} />
              {isChangeRating
                ? <p>Rate this book</p>
                : <p>Update rating</p>}
            </div>
          </div>

          <p className="subtitle">
            Description
          </p>
          <p className="description__text">
            {book.description}
          </p>
          <div className="button-block">
            <div className="button-block__button">
              <p className="button-block__description">
                Paperback
              </p>
              <CommonButton
                text={`$ ${book.price} USD`} />
            </div>
            <div className="button-block__button">
              <p className="button-block__description">
                Hardcover
              </p>
              <CommonButton
                text={`$ ${book.price} USD`}
              />
            </div>
          </div>
        </div>
      </ProductPageWrapper>
    </CommonWrapper>
  );
};

export default ProductPage;