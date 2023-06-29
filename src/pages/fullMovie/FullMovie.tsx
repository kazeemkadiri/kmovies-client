import { useState, useEffect, useMemo } from 'react';
import useMovies from '../../hooks/useMovies';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MovieFullDetails, TMDBMovie } from '../../types';
import VideoPlayer from '../../components/VideoPlayer';
import NoImage from './../../assets/no-image.png';
import NoBanner from './../../assets/no-banner.jpg';
import './styles/fullmovie.scss';

const FullMovie = () => {
    const location = useLocation()
    const params = useParams()
    const [movieFullDetails, setMovieFullDetails] = useState<MovieFullDetails | null>(null)
    const { getMovieVideos } = useMovies()
    const navigate = useNavigate();

    useEffect(() => {
        if(!params.movieid) navigate('/');
        (async () => {
            const result = await getMovieVideos(params.movieid!)
            
            setMovieFullDetails(result)
        })()
    }, [location.pathname])

    const moviesImagesRepo = useMemo(() => ('https://image.tmdb.org/t/p/original'),[])
    const getMovieBannerPath = () => (movieFullDetails?.movieBackdropImages[0]?.filePath)
    const getMoviePosterPath = () => (movieFullDetails?.moviePosterImages[0]?.filePath)
    const getMovieTitle = () => (movieFullDetails?.mainMovie.originalTitle)
    const getMovieYear = () => (movieFullDetails?.movieReleaseDates[0]?.releaseDates[0]?.releaseDate.substring(0, 4))
    
    const hasContent = (movieInfo: string) => {
        switch(movieInfo){
            case 'movieVideos':
                return (movieFullDetails?.movieVideosFound && movieFullDetails?.movieVideosFound.length > 0)
            case 'movieBanner':
                return (movieFullDetails?.movieBackdropImages && movieFullDetails?.movieBackdropImages.length > 0)
            case 'moviePoster':
                return (movieFullDetails?.moviePosterImages && movieFullDetails?.moviePosterImages.length > 0)
            default:
                return false
        }       
    }

    if(!(movieFullDetails && movieFullDetails.mainMovie && movieFullDetails.mainMovie.id)){
        return <></>
    }
    
    return (
        (movieFullDetails && movieFullDetails.mainMovie && movieFullDetails.mainMovie.id) ? 
        (<section className='full-movie row justify-content-center p-0 m-0'>
            {/* Movie banner */}
            <article className='col-12 p-0 d-flex flex-column justify-contents-center align-items-center position-relative' style={{ height: "360px", background: `url(${ moviesImagesRepo }${ getMovieBannerPath()})` }}>
                <img className='w-100 h-100 position-absolute' style={{ zIndex: 49 }} src={ hasContent('movieBanner') ? `${ moviesImagesRepo }${ getMovieBannerPath()}`: NoBanner } alt={ movieFullDetails.mainMovie.originalTitle }  />
                
                {/* The video player is placed above the backdrop image */}
                <div 
                    className='position-relative w-100 h-100 text-center d-flex align-items-center justify-content-center' 
                    style={{ top: '0px', backgroundColor: !hasContent('movieVideos') ? "rgba(0,0,0,0.7)" : "none", zIndex: 50 }}>
                    { hasContent('movieVideos') 
                        ? <VideoPlayer 
                                movie={movieFullDetails.movieVideosFound[0]}
                                options={{ width: String(innerWidth - Math.floor(0.2 * innerWidth)), height: "340" }} 
                            /> 
                        : <h4 className='text-white'>No trailers were found for this movie</h4>
                    }
                </div>
            </article>

            {/* The movie description and features section */}
            <div className='row align-items-sm-start justify-content-between mt-5 px-0 movie-description'>
                {/* An avatar picture section */}
                <div className="col-sm-12 col-md-4 d-flex flex-column align-items-center justify-contents-center ps-0">
                    <img className='w-100 position-relative ' src={ hasContent('moviePoster') ? `${ moviesImagesRepo }${ getMoviePosterPath()}` : NoImage } alt={ movieFullDetails.mainMovie.originalTitle }  />
                    {/* <section className='w-100 d-flex justify-content-between text-white p-3  movie_actions'>
                        <span className='d-flex flex-column align-items-center'><FontAwesomeIcon icon={ faBookmark } className='mb-2' /> WatchList</span>
                        <span className='d-flex flex-column align-items-center'><FontAwesomeIcon icon={ faCheck } className='mb-2' /> Seen</span>
                        <span className='d-flex flex-column align-items-center'><FontAwesomeIcon icon={ faThumbsUp } className='mb-2' /> Like</span>
                    </section> */}
                </div>

                {/* Descriptions */}
                <div className="col-sm-12 col-md-8 pe-0">
                    <div className='row'>
                        {/* Movie title header */}
                        <div className="d-flex align-items-end col-12">
                            <h3 className="text-white">{ getMovieTitle() } </h3>
                            { getMovieYear() && (<h4>&nbsp;&nbsp;({ getMovieYear() })</h4>) }
                        </div>

                        {/* Movie trailers, featurettes */}
                        <div className="col-12 movie-trailers">
                            <h3>Videos: Trailers, Teasers, Featurettes</h3>
                            <div className="row video-trailers">
                                { hasContent('movieVideos') ? movieFullDetails.movieVideosFound.map((video: TMDBMovie, index: number) => {
                                    if(index === 0){ return null }
                                    return (<div className="col-6" key={video.key}><VideoPlayer movie={video} options={{ height: '200', width: '100%' }} /></div>)
                                  })
                                  : <strong><h5>No trailers were found for this movie.</h5></strong>
                                }
                            </div>
                        </div>

                        {/* SYNOPSIS */}
                        <div className="col-12 mt-3 synopsis">
                            <h4>SYNOPSIS</h4>
                            <p >{ movieFullDetails.mainMovie.overview }</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
        : <>Loading...</>
    )
}

export default FullMovie