import React from 'react'

import './navbar.css'
import Fire from '../../assets/fire.png'
import Star from '../../assets/glowing-star.png'
import Party from '../../assets/partying-face.png'

const navbar = () => {
  return (
    <nav className='navbar'>
        <h1>MovieManiac</h1>

        <div className='navbar_links'>
            <a href="#popular">Popular <img className='navbar_emoji' src={Fire} alt="" /></a>
            <a href="#top_rated">Top Rated <img className='navbar_emoji' src={Star} alt="" /></a>
            <a href="#upcoming">Upcoming <img className='navbar_emoji' src={Party} alt="" /></a>
        </div>
    </nav>
  )
}

export default navbar