import './home.scss'
import Hero from '../../components/Hero'
import MovieTypes from '../../components/MovieTypes'
import MoviesFilter from '../../components/MoviesFilter'
import MovieCard from '../../components/MovieCard'
import useMovies from '../../hooks/useMovies'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import type { TMDBMovie } from '../../types'
import { useEffect, useState, useMemo, useRef, useLayoutEffect } from 'react'
import { VideoTypes } from '../../constants/VideoTypes'
import slug from 'slug'
import { shuffle } from 'fast-shuffle'
import ReactPaginate from 'react-paginate'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { RootState } from '../../redux/store'
import { CLEAR_MOVIES_LIST, SET_MOVIES_LIST } from '../../redux/actions'

const HomePage = () => {
  const location = useLocation()
  const { 
    getAllMovies, 
    getMovieVideos,
    getMoviesByReleaseYear 
  } = useMovies()
  
  const [allMovies, setAllMovies] = useState<TMDBMovie[] | any[]>([])
  const allMoviesRef = useRef<TMDBMovie[] | any[]>([])
  allMoviesRef.current = allMovies

  const [pageMovies, setPageMovies] = useState<TMDBMovie[] | any[]>([])
  const [videoType, setVideoType] = useState(VideoTypes.MOVIE)
  const [prevPageNum, setPrevPageNum] = useState<number>(1)
  const [currentPageNum, setCurrentPageNum] = useState<number>(1)
  const [showNewPage, setShowNewPage] = useState<boolean>(false)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const perPage = 24  

  const currentPage = useMemo(() => {
    return parseInt(params.pagenum || '1')
  }, [params.pagenum])

  // This hook is called when the current page changes from the URL
  useEffect(() => {
    let offset = Math.ceil(currentPage * perPage);

    const selectedMovieList = allMovies.slice(offset, offset + perPage)

    setPaginatedPageMovies( selectedMovieList )
  }, [currentPage])

  useEffect(() => {   
    if(location.pathname !== '/movies') return

      (async () => {
        await showHomePageMovies()
      })()
    
  }, [ location.pathname ])

  // useEffect(() => {
  //   const viewingPage: string = location.pathname.split('/')[1]

  //   switch(viewingPage){
  //     case 'movie':[
  //       setVideoType(VideoTypes.MOVIE)
  //       break;
  //     case 'tv_show':
  //       setVideoType(VideoTypes.TV_SHOW)
  //       break;
  //     case 'all':
  //       setVideoType(VideoTypes.ALL)
  //       break;
  //     default:
  //       setVideoType(VideoTypes.MOVIE)
  //   }
  // },[location.pathname])

  // This hook call will initialize the pagination of movies
  useEffect(() => {
    const first24Movies = allMovies.slice(0, perPage)

    setPageMovies( first24Movies )
  },[ allMovies ])

  const selectedMovieList = useMemo(() => {
      let offset = Math.ceil(currentPageNum * perPage);
      
      console.log('ref', allMoviesRef.current)

      return allMoviesRef.current.slice(offset, offset + perPage)
    
  },[currentPageNum])

  // useEffect(() => {
  //   setPageMovies(selectedMovieList)
  // },[selectedMovieList])

  useEffect(() => {
    if(showNewPage) {
      setPageMovies([])
      setShowNewPage(false)
      setPageMovies(selectedMovieList)
    }
  },[showNewPage, selectedMovieList])

  const setPaginatedPageMovies = (movies: TMDBMovie[]) => {
    setPageMovies( movies )
  }

  const showHomePageMovies = async () => {    
    const movies = await getAllMovies()

    const shuffledMovies = shuffle(movies)

    setAllMovies(shuffledMovies)
  }

  const renderNewMovieList = (moviesArray: []) => {
    const shuffledMoviesArray = shuffle(moviesArray)

    allMoviesRef.current = shuffledMoviesArray
    
  }

  const handleReset = async () => {
    dispatch({ type: CLEAR_MOVIES_LIST, payload: [] })
  }

  const renderByReleaseYear = async (year: number) => {
    const movies = await getMoviesByReleaseYear(year)

    const shuffledMovies = shuffle(movies)

    allMoviesRef.current = shuffledMovies
  } 

  const showSelectedMoviePage = (movie: TMDBMovie) => {
    navigate(`/movies/${movie.id}`)
  }

  const scrollToTop = () => {
    window.scrollTo(0,0)
  }

  const handlePageClick = (data: any) => {
    scrollToTop()

    console.log(data.selected === 0)
    if(data.selected === 0) return

    setShowNewPage(true)

    setCurrentPageNum(data.selected + 1)
  };

  if(!pageMovies) return <div>Loading movies</div>

  return (
    <div>
      <Hero />
      {/* Hero */}
      <section className="row">
        <div className='col-sm-12 col-md-2'>
          <MovieTypes />
        </div>
        <div className="col-sm-12 col-md-10">
          <MoviesFilter 
            renderNewMovielist={renderNewMovieList}
            renderByReleaseYear={renderByReleaseYear}
            handleReset={handleReset} />
        </div>
      </section>

      {/* Movies list */}
      <Row className="mt-5 mx-0">
        {
          pageMovies && pageMovies.length > 0 && pageMovies.map((movie: TMDBMovie, index: number) => {

            return (
              <Col className="h-sm-auto mb-2 mx-0 px-1" key={index} sm={12} md={3} lg={2} style={{ cursor: "pointer" }} onClick={() => { showSelectedMoviePage(movie)}}>
                  <MovieCard movie={movie} />
              </Col>
            )
          })
        }

        {
          pageMovies && pageMovies.length > 0 && <div className='col-12'>
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={ Boolean(allMovies) ? Math.ceil(allMovies.length / perPage) : 1}
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
            hrefBuilder={(page, pageCount, selected) =>
              (page >= 1 && page <= pageCount ? `/movies/page/${page}` : '#')
            }
            onClick={(clickEvent) => {
              return
            }}
          />
          </div>
        }       
      </Row>
      
    </div>
  )
}

export default HomePage
