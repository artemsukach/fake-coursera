import React from 'react';

import { usePagination, DOTS } from '../../../hooks/usePagination';

import styles from './Pagination.scss';

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={styles.pagination}>
      <li
        className={`${styles.pagination__item} ${
          currentPage === 1 ? 'disabled' : ''
        }`}
        onClick={onPrevious}
        role="presentation"
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li
              className={`${styles.pagination__item} ${styles.dots}`}
              key={pageNumber}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={`${styles.pagination__item} ${
              currentPage === pageNumber ? 'selected' : ''
            }`}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            role="presentation"
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${styles.pagination__item} ${
          currentPage === lastPage ? 'disabled' : ''
        }`}
        onClick={onNext}
        role="presentation"
      >
        <div className={`${styles.arrow} ${styles.right}`} />
      </li>
    </ul>
  );
};

export default Pagination;
