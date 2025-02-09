import React, { useEffect, useState } from 'react'
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'
import FilterGroup from './FilterGroup'
import _ from 'lodash'

const MovieList = ({type, title, emoji}) => {

    const [movies, setmovies] = useState([]);
    const [filterMovies, setfilterMovies] = useState([])
    const [minRating, setMinRating] = useState(0)
    const [sort, setsort] = useState({
        by: "default",
        order: "asc",
    })

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {if(sort.by !== "default"){
        const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]) 
        setfilterMovies(sortedMovies)}}, [sort])

    const fetchMovies = async() => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=2d7c599222ce07de85a4df624833c9bf`)
        const data = await response.json()
        setmovies(data.results)
        setfilterMovies(data.results)
    };

    const handleFilter = rate => {
        if(rate === minRating){
            setMinRating(0)
            setfilterMovies(movies)
        } else{
            setMinRating(rate)
            const filtered = movies.filter(movie => movie.vote_average >= rate)
            setfilterMovies(filtered);
        }
    }

    const handleSort = e => {
        const {name, value} = e.target;
        setsort(prev => ({...prev, [name] : value}))
    }

  return (
    <section className='movie_list' id={type}>
        <header className='movie_list_header align_center'>
            <h2 className='movie_list_heading align_center'>{title} <img src={emoji} className='navbar_emoji' />
            </h2>


            <div className='movie_list_fs align_center'>
                <FilterGroup minRating={minRating} onRatingClick={handleFilter} ratings={[8,7,6]}/>
                <select name="by" id="" className='movie_sorting' onChange={handleSort} value={sort.by}>
                    <option value="default">SortBy</option>
                    <option value="release_date">Date</option>
                    <option value="vote_average">Rating</option>
                </select>
                <select name="order" id="" className='movie_sorting' onChange={handleSort} value={sort.order}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        </header>

        <div className='movie_cards'>
            {
                filterMovies.map(movie => <MovieCard key={movie.id} movie={movie}/>)
            }
        </div>
    </section>
  )
}

export default MovieList