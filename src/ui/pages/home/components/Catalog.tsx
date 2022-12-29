import React, { useMemo } from 'react';

import useQuery from '../../../../utils/useQuery';
import { QuerySearchOptions } from '../../../../types';
import constants from '../../../../constants';

import BooksList from './BooksList';
import DropdownMenu from './DropdownMenu';
import GenresCheckbox from './GenresCheckbox';
import PriceFilter from './PriceRangeFilter';
import SortingList from './SortingList';
import PaginationBlock from './PaginationBlock';
import CatalogWrapper from '../styles/Catalog.styles';
import CommonWrapper from '../../../components/CommonWrapper.styles';

const Catalog = () => {
  const [parsedParams] = useQuery<QuerySearchOptions>();

  const order = useMemo(() => {
    return constants.BOOK_SORTING_OPTIONS[(parsedParams.ordering || 'price')];
  }, [parsedParams.ordering]);

  return (
    <CommonWrapper>
      <CatalogWrapper>
        <h1 className="filter__title">
          Catalog
        </h1>

        <div className="filter__form">
          <DropdownMenu
            title="Genre"
          >
            <GenresCheckbox />
          </DropdownMenu>

          <DropdownMenu
            title="Price"
          >
            <PriceFilter
              min={1}
              max={100}
            />
          </DropdownMenu>

          <DropdownMenu
            title={`Sort by ${order}`}
          >
            <SortingList />
          </DropdownMenu>
        </div>

      </CatalogWrapper>

      <BooksList />

      <PaginationBlock />

    </CommonWrapper>
  );
};

export default Catalog;
