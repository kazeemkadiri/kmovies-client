import { useEffect, useLayoutEffect, useState } from 'react';
import { TMDBMovie } from '../../types';
import './styles/herocard.scss';

interface IHeroMain{
    movie: TMDBMovie,
    getAnotherMovie: () => TMDBMovie 
}

const HeroCard = (props: IHeroMain) => {
  const [movie, setMovie] = useState<TMDBMovie | null>(props.movie);
  const [showOverview, setShowOverview] = useState<boolean>(false);
  
  const getAnotherMovie = () => {
    setMovie(props.getAnotherMovie());
  }

  const showMovieOverview = () => {
    setShowOverview(true);
  }

  const hideMovieOverview = () => {
    setShowOverview(false);
  }

  if(!movie?.backdropPath){
    getAnotherMovie();
    return <></>;
  }

  return (
    <div className='hero-card w-100 h-100' onMouseEnter={() => { showMovieOverview() }} onMouseLeave={() => { hideMovieOverview() }}>
      
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdropPath}`} className="hero-card-image position-relative" alt="Hero card image" /> 
        
        {
          !showOverview && <div className="hero-card-info">
            <h4>{ movie.originalTitle }</h4>
          </div>
        }
        <div className={`movie-overview-bg ${showOverview ? '' : 'd-none'}`}></div>
        <div className={`movie-overview position-absolute w-100 d-flex justify-content-center ${showOverview ? '' : 'd-none'}`}>{ movie.overview }</div>
      
    </div>
  )

}

export default HeroCard