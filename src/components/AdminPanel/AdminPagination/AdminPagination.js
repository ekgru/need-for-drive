import React from 'react';
import './AdminPagination.scss';
export default function AdminPagination({
  paginationHandler,
  page,
  countPages,
}) {
  return (
    <div className='admin-pagination'>
      {countPages != 1 && (
        <button
          className='admin-pagination__button arrow'
          onClick={paginationHandler}
          disabled={+page - 1 ? false : true}
          name='back'
        >
          {'<<'}
        </button>
      )}
      <button
        className='admin-pagination__button'
        onClick={paginationHandler}
        value={1}
        disabled={+page === 1}
      >
        1
      </button>
      {page < 3 && countPages > 5 ? (
        <>
          <button
            className='admin-pagination__button'
            onClick={paginationHandler}
            value={2}
            disabled={+page === 2}
          >
            2
          </button>
          <button
            className='admin-pagination__button'
            onClick={paginationHandler}
            value={3}
            disabled={+page === 3}
          >
            3
          </button>
          <p className='admin-pagination__dots'>...</p>
        </>
      ) : page > countPages - 3 && countPages > 5 ? (
        <>
          <p className='admin-pagination__dots'>...</p>
          <button
            className='admin-pagination__button'
            onClick={paginationHandler}
            disabled={+page === countPages - 2}
            value={+countPages - 2}
          >
            {+countPages - 2}
          </button>
          <button
            className='admin-pagination__button'
            onClick={paginationHandler}
            disabled={+page === countPages - 1}
            value={+countPages - 1}
          >
            {+countPages - 1}
          </button>
        </>
      ) : countPages < 6 ? (
        <>
          {countPages > 2 && (
            <button
              className='admin-pagination__button'
              onClick={paginationHandler}
              value={2}
            >
              2
            </button>
          )}
          {countPages > 3 && (
            <button
              className='admin-pagination__button'
              onClick={paginationHandler}
              value={3}
            >
              3
            </button>
          )}
          {countPages > 4 && (
            <button
              className='admin-pagination__button'
              onClick={paginationHandler}
              value={4}
            >
              4
            </button>
          )}
        </>
      ) : (
        <>
          <p className='admin-pagination__dots'>...</p>
          <button
            className='admin-pagination__button'
            onClick={paginationHandler}
            value={+page - 1}
          >
            {+page - 1}
          </button>
          <button
            className='admin-pagination__button'
            onClick={paginationHandler}
            value={+page}
            disabled
          >
            {+page}
          </button>
          <button
            className='admin-pagination__button'
            disabled={+page === +page + 1}
            onClick={paginationHandler}
            value={+page + 1}
          >
            {+page + 1}
          </button>

          <p className='admin-pagination__dots'>...</p>
        </>
      )}
      {countPages != 1 && (
        <>
          <button
            className='admin-pagination__button'
            onClick={paginationHandler}
            disabled={+page === +countPages}
            value={countPages}
          >
            {countPages}
          </button>
          <button
            className='admin-pagination__button arrow'
            onClick={paginationHandler}
            name='forward'
            disabled={+page + 1 > countPages ? true : false}
          >
            {'>>'}
          </button>
        </>
      )}
    </div>
  );
}
