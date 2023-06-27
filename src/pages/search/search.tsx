import { TMDBMovie } from "../../types";
import MovieCard from '../../components/MovieCard/MovieCard'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useMemo, useState } from "react";
import useMovies from "../../hooks/useMovies";
import { useAppDispatch } from "../../hooks/useStore";
import ReactPaginate from "react-paginate";
import { showLoader } from "../../redux/features/Loader";
import './styles/search.scss';

const SearchResults = () => {
    const navigate = useNavigate()
    const { searchMovies, getMoviesByGenres } = useMovies()
    const [ moviesArr, setMoviesArr ] = useState<TMDBMovie[]>([]) 
    const params = useParams()
    const dispatch = useAppDispatch()
    const perPage = 24
    const [pageMovies, setPageMovies] = useState<TMDBMovie[]>([])
    const searchquery = useMemo(() => (params.searchquery), [params.searchquery])
    const genreQuery = useMemo(() => (params.genre), [params.genre])

    const displayLoader = () => {
      dispatch(showLoader(true));
    }

    const hideLoader = () => {
      dispatch(showLoader(false))
    }

    useEffect(() => {
      displayLoader();

      if(searchquery){
        (async () => {
          const moviesArray = await searchMovies( params.searchquery === undefined ? '' : params.searchquery )
        
          setMoviesArr(removeNonBgMovies(moviesArray));

          hideLoader();
        })()
      }else if(genreQuery){

        (async () => {
          const moviesList = await getMoviesByGenres([genreQuery]);

          setMoviesArr(removeNonBgMovies(moviesList))

          hideLoader();
        })()
      }else{
        navigate('/movies')
      }

      return () => { setMoviesArr([]) }
    }, [searchquery, genreQuery, navigate])


    useEffect(() => {
      if(typeof moviesArr === 'undefined') return
    
      const selectedMoviesList = moviesArr.slice(0, perPage)
      
      setPaginatedPageMovies( selectedMoviesList )
    },[moviesArr])

    const removeNonBgMovies = (movies: TMDBMovie[]) => {
      return movies.filter((movie: TMDBMovie) => (Boolean(movie.posterPath)))
    }

    const setPaginatedPageMovies = (movies: TMDBMovie[]) => {
        setPageMovies( movies )
    }

    const scrollToTop = () => {
      window.scrollTo(0,0)
    }

    useEffect(() => {
      if(pageMovies.length === 0) return

      setTimeout(() => {
       hideLoader()
      }, 1000)

    },[pageMovies])

    const handlePageClick = (data: any) => {
      scrollToTop()
      
      displayLoader();

      let selected = data.selected
    
      let offset = Math.ceil(selected * perPage)
      
      const selectedMovieList = moviesArr.slice(offset, offset + perPage)
      
      setPaginatedPageMovies( selectedMovieList )      
    };

    if(!pageMovies.length || !moviesArr.length){
      return <div>Loading...</div>
    }

    return (
        <section className="row search-page">
        {
          pageMovies.length > 0 
          && pageMovies.map((movie: TMDBMovie, index: number) => {
            return (
              <Link to={`/movie/${movie.id}`} key={index} className='col-sm-12 col-md-3 col-lg-2 movie-link' style={{ cursor: "pointer" }}>
                <MovieCard movie={movie} />
              </Link>
            )
          })
        }
        {
          pageMovies.length > 0 && 
          <div className='col-12 pagination-buttons'>
            <ReactPaginate
              previousLabel="previous"
              nextLabel="next"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={Math.ceil(moviesArr.length / perPage)}
              pageRangeDisplayed={4}
              marginPagesDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              hrefAllControls={true}
              initialPage={0}
              // eslint-disable-next-line no-unused-vars
              hrefBuilder={(page, pageCount) =>
                (page >= 1 && page <= pageCount ? `/movies/page/${page}` : '#')
              }
              onClick={() => { return }}
            />
          </div>
        }
        
      </section>
    )
} 

export default SearchResults