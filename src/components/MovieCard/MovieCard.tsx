import './styles/moviecard.scss'
import type { TMDBMovie } from '../../types'

const MovieCard = (props: {movie: TMDBMovie}) => {
    return(
      <div className="movie-card border-0 mb-3">
        <div className="card">
          <div className='wrapper px-3'>
            <img 
              className='img-fluid' 
              src={!props.movie.posterPath ? 'https://kmovies.fly.dev/assets/no-image.png' : `https://image.tmdb.org/t/p/original/${props.movie.posterPath}`} 
              alt={props.movie.originalTitle} />
              <div className="movie-title">
                <strong>{ props.movie.originalTitle }</strong>
              </div>
          </div>
          <div className="movie-overview-bg">
            <div className="movie-overview">{ props.movie.overview }</div>
          </div>
        </div>
      </div>
    )  
}

export default MovieCard