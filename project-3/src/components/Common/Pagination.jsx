import React, { useLayoutEffect } from 'react'
import './Pagination.css'
import LinkWithIcon from '../navbar/LinkWithIcon'

const Pagination = ({totalPosts, postPerPage, onClick, currentPage}) => {
    let pages = []

    for(let i=1; i<= Math.ceil(totalPosts/postPerPage); i++){
        pages.push(i)
    }
  return (
        <>
        {pages.length > 1 &&     <ul className='pagination'>
            {pages.map(page => <li key={page}>
            <button className={parseInt(currentPage) === page? "pagination_button active" : 'pagination_button'} onClick={() => onClick(page)}>{page}</button>
        </li>)}
        </ul>}
        </>)
}

export default Pagination