import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../../../store';
import { QuerySearchOptions } from '../../../../types';
import useQuery from '../../../../utils/useQuery';

import GenreCheckboxWrapper from '../styles/GenresCheckbox.styles';

import arrowUpIcon from '../../../images/arrow-up.png';
import checkedIcon from '../../../images/checkbox-checked.png';
import unchekedIcon from '../../../images/checkbox-unchecked.png';

const GenresCheckbox = () => {
  const [checkedGenres, setCheckedGenres] = useState<string[]>([]);
  const [parsedParams, setParams] = useQuery<QuerySearchOptions>();
  const genres = useAppSelector((state) => state.genreReducer.genres);

  useEffect(() => {
    if (parsedParams.genre) {
      const genresFromQuery = parsedParams.genre.split(',');

      if (genresFromQuery.length !== 0) {
        setCheckedGenres(genresFromQuery);
      }
    }
  }, [parsedParams.genre]);

  const updateFilterQuery = (genres: string[]) => {
    parsedParams.genre = genres.toString();
    setParams(parsedParams);
  };

  const getValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedGenreId = e.target.value;
    let filteredGenres: string[] = [];

    if (checkedGenres.includes(checkedGenreId)) {
      filteredGenres = checkedGenres.filter((genre) => {
        return genre !== checkedGenreId;
      });
    } else {
      filteredGenres = [...checkedGenres, checkedGenreId];
    }

    updateFilterQuery(filteredGenres);
    setCheckedGenres(filteredGenres);
  };

  return (
    <GenreCheckboxWrapper >
      <img
        src={arrowUpIcon}
        className="genres-checkbox__arrow-up"
      />
      <div
        className="genres-checkbox__wrapper"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {genres.map((genre) => {
          return (
            <label htmlFor={genre.genreId.toString()} key={genre.genreId}>
              <div
                key={genre.genreId}
                className="genres-checkbox__option"
              >
                <input
                  id={genre.genreId.toString()}
                  type="checkbox"
                  name={genre.name}
                  value={genre.genreId}
                  checked={checkedGenres.includes(`${genre.genreId}`)}
                  onChange={getValues}
                  hidden
                />
                {checkedGenres.includes(`${genre.genreId}`)
                  ? (<img
                    className="genres-checkbox__icon"
                    src={checkedIcon}
                  />)
                  : (<img
                    className="genres-checkbox__icon"
                    src={unchekedIcon}
                  />)
                }
                {genre.name}
              </div>
            </label>
          );
        })}
      </div>
    </GenreCheckboxWrapper>
  );
};

export default GenresCheckbox;
