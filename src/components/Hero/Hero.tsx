import { useEffect, useLayoutEffect, useState } from 'react';
import './styles/hero.scss';
import { TMDBMovie } from '../../types';
import HeroCard from '../HeroCard/HeroCard';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Hero = ({movies}: {movies: TMDBMovie[]}) => {
  const [moviesList, setMoviesList] = useState<TMDBMovie[]>([]);
  const [renderedMoviesIndex, setRenderedMoviesIndex] = useState<number[]>([]);
  
  useLayoutEffect(() => {
    setMoviesList(movies);
  }, [])

  useEffect(() => {
    if(moviesList.length === 0) return

    loadRandomMovies(1);
  }, [moviesList])

  const genRandomNumber = () => (Math.floor(Math.random() * moviesList.length))

  const loadRandomMovies: any = (count: number) => {

    const randomNumber = genRandomNumber();

    if(!renderedMoviesIndex.find((movieIndex: number) => (movieIndex === randomNumber))){
      
      setRenderedMoviesIndex((prev: number[]) => ([...prev, randomNumber]));

      if(count === 5){
        return;
      }
  
      count += 1;
    }

    loadRandomMovies(count);
  }

  const getAnotherMovie = () => {
    return moviesList[ genRandomNumber() ];
  }

  const getMovieId = (movieIndex: number) => {
    return getMovie(movieIndex).id;
  }

  const getMovie = (index: number) => {
    return moviesList[ renderedMoviesIndex[index] ]
  }

  if(moviesList.length === 0  || renderedMoviesIndex.length < 5) return <Loader />

  return (
    <div className='hero w-100 row'>
        <div className="hero-main col-6 px-0"><Link to={`/movie/${getMovieId(0)}`}><HeroCard movie={ getMovie(0) } getAnotherMovie={getAnotherMovie} /></Link></div>
        <div className="hero-cards col-6 px-0 h-100">
          <div className="row px-0 h-50">
            <div className='col-6 px-0'><Link to={`/movie/${getMovieId(1)}`}><HeroCard movie={ getMovie(1) } getAnotherMovie={getAnotherMovie} /></Link></div>
            <div className='col-6 px-0'><Link to={`/movie/${getMovieId(2)}`}><HeroCard movie={ getMovie(2) } getAnotherMovie={getAnotherMovie} /></Link></div>
          </div>
          <div className="row px-0 h-50">
            <div className='col-6 px-0'><Link to={`/movie/${getMovieId(3)}`}><HeroCard movie={ getMovie(3) } getAnotherMovie={getAnotherMovie} /></Link></div>
            <div className='col-6 px-0'><Link to={`/movie/${getMovieId(4)}`}><HeroCard movie={ getMovie(4) } getAnotherMovie={getAnotherMovie} /></Link></div>
          </div>
        </div>
    </div>
  )
}

export default Hero