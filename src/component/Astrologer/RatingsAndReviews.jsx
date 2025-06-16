import React, { Suspense, useCallback, useMemo, useState } from 'react'
const SearchSortBar = React.lazy(() => import('../Blog/SearchSortBar'));

// Optimized RatingsAndReviews Component
const RatingsAndReviews = React.memo(() => {
  const [search, setSearch] = useState('')

  // Memoizing the filterOptions to avoid re-calculation on each render
  const filterOptions = useMemo(
    () => [
      { label: 'Popularity', value: 'popularity' },
      { label: 'Experience: High to Low', value: 'exp-high-low' },
      { label: 'Experience: Low to High', value: 'exp-low-high' },
      { label: 'Total Orders: High to Low', value: 'orders-high-low' },
      { label: 'Total Orders: Low to High', value: 'orders-low-high' }
    ],
    []
  )

  // Memoizing the setSearch callback to prevent unnecessary re-renders
  const onSearchChange = useCallback(newSearchValue => {
    setSearch(newSearchValue)
  }, [])

  return (
    <div className='flex justify-between items-center rounded-lg'>
      <Suspense fallback={<></>}>
      <SearchSortBar
        showSearchInput={false}
        searchValue={search}
        onSearchChange={onSearchChange}
        sortOptions={filterOptions}
      />
      </Suspense>
    </div>
  )
})

export default RatingsAndReviews
