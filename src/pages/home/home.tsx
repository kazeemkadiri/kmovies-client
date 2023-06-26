import './styles/home.scss'
import Hero from '../../components/Hero/Hero'
import useMovies from '../../hooks/useMovies'
import { useParams, Link } from 'react-router-dom'
import type { TMDBMovie } from '../../types'
import { useEffect, useState, useMemo } from 'react'
import ReactPaginate from 'react-paginate'
import MovieCard from '../../components/MovieCard/MovieCard'

const HomePage = () => {
  const [allMovies, setAllMovies] = useState<TMDBMovie[]>([]);
  const { getAllMovies } = useMovies();
  const [pageMovies, setPageMovies] = useState<TMDBMovie[] | any[]>([])
  const params = useParams() 
  const perPage = 24  

  //Load the list of movies
  useEffect(() => {
    getAllMovies().then((movies: TMDBMovie[]) => {
      setAllMovies(movies.filter( (movie: TMDBMovie) => (Boolean(movie.posterPath)) ));
    })
  },[])

  const currentPage = useMemo(() => {
    if(!params.pagenum) { return 0 }

    return parseInt(params.pagenum!)
  }, [params.pagenum])

  // This hook is called when the current page changes from the URL
  useEffect(() => {
    let offset = Math.ceil(currentPage * perPage);

    const selectedMovieList = allMovies.slice(offset, offset + perPage)

    setPaginatedPageMovies( selectedMovieList )
  }, [currentPage])
  
  useEffect(() => {
    if(allMovies.length) {
      setPaginatedPageMovies(allMovies.slice(0, perPage))
    }
  },[allMovies])

  // If page movies array changes, scroll to the top
  useEffect(() => {
    scrollToTop();
  }, [pageMovies]);

  const setPaginatedPageMovies = (movies: TMDBMovie[]) => {
    setPageMovies( movies )
  }

  const scrollToTop = () => {
    document.querySelector('.gallery')!.scrollIntoView();
  }

  const handlePageClick = (data: any) => {
    if(data.selected === 0) return
    
    setPageMovies(() => ([]))

    let offset = Math.ceil((data.selected + 1) * perPage);

    setTimeout(() => {
      setPaginatedPageMovies(allMovies.slice(offset, offset + perPage))
    }, 2000)
  };

  return (
    <div className='py-3'>
      {/* Hero */}
      { allMovies.length > 0 && <Hero movies={allMovies} /> }

        {/* Gallery */}
        <section className="gallery row py-5">
          <div className="movies-list row">
              {
                (pageMovies.length > 0) && pageMovies.map((movie: TMDBMovie) => {
                  return <Link to={`/movie/${movie.id}`} className='col-md-3 movie-link'><MovieCard movie={movie} /></Link>
                })  
              }
          </div>
        </section>
        <section className='pagination-buttons'>
        {
          <div className={`col-12 ${pageMovies.length === 0 ? 'd-none': ''}`}>
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
            activeClassName="active bg-secondary"
            hrefAllControls={true}
            initialPage={0}
            // eslint-disable-next-line no-unused-vars
            hrefBuilder={(page, pageCount) =>
              (page >= 1 && page <= pageCount ? `movies/page/${page}` : '#')
            }
            onClick={() => { return }}
          />
          </div>
        }   
        </section>
    </div>
  )
}

export default HomePage
