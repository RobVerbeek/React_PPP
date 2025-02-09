import React from 'react'

const FilterGroup = ({minRating, onRatingClick, ratings}) => {
  return (
    <ul className="movie_filter align_center">
        {
            ratings.map(rate => 
                <li className={minRating === rate ? 'movie_filter_item active' : 'movie_filter_item'} key={rate} onClick={() => onRatingClick(rate)}>{rate}+ *</li>
            )
        }
</ul>
  )
}

export default FilterGroup