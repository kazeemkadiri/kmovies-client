import { toast } from 'react-toastify'
import useAxios from './useAxios';

const useMovies = () => {
    const { axiosPublic } = useAxios();
    
    const displayErrMsg = (message: string) => {
        toast(message, { autoClose: 5000 })
    }

    const getAllMovies = async () => {
        toast('Fetching movies...', {
            autoClose: false,
            isLoading: true,
        })

        try{
            const allMovies = await axiosPublic.get(`/movie/all`)

            toast.dismiss()

            if(true === allMovies.data.error){
                throw new Error()
            }
          
            return allMovies.data.result
        }catch(err){
            console.log(err)
            toast.dismiss()
            displayErrMsg("Some errors were encountered. Please try again later.")
            return []
        }
    }

    const searchMovies = async (query: string) => {
        try{
            toast('Searching...', {
                autoClose: false,
                isLoading: true,
            })

            const moviesFound = await axiosPublic.post(`/movie/search`,{
                query
            })

            toast.dismiss()

            if(true === moviesFound.data.error){
                throw new Error()
            }

            return moviesFound.data.result
        }catch(err){
            console.log(err)
            toast.dismiss()
            displayErrMsg("Some errors were encountered during search operation. Please try again later.")
            return []
        }
    }

    const getMovieVideos = async (movieId: string) => {
        try{
            toast('Fetching movie trailers...', {
                autoClose: false,
                isLoading: true,
            })

            const response = await axiosPublic.get(`/movie/get/${movieId}`)

            toast.dismiss()

            if(true === response.data.error){
                throw new Error()
            }

            return response.data.result
        }catch(err){
            console.log(err)
            toast.dismiss()
            displayErrMsg("Some errors were encountered while trying to load the page. Please try again later.")
            return {}
        }
    }

    const getMoviesByGenres = async (genres: string[]) => {
        try{
            toast(`Fetching movies by genres...${ genres.join(', ') }`,{ autoClose: false })
            
            const response = await axiosPublic.post(`/movie/genres/get`, {genres})

            toast.dismiss()

            if(true === response.data.error){
                throw new Error()
            }

            return response.data.result
        }catch(err){
            console.log(err)
            toast.dismiss()
            displayErrMsg("Some errors were encountered while trying to load the page. Please try again later.")
            return []
        }
    }

    const getMoviesByReleaseYear = async (releaseYear: number) => {
        try{
            toast(`Fetching movies by release year...`,{ autoClose: false })
            
            const moviesRelYear = await axiosPublic.post(`/movie/release-year/get`, {releaseYear})
    
            toast.dismiss()
            
            return moviesRelYear.data.result       
        }catch(err){
            console.log(err)
            toast.dismiss()
            displayErrMsg("Some errors were encountered while trying to load the page. Please try again later.")
            return []
        }
    }

    return {
        getAllMovies,
        searchMovies,
        getMovieVideos,
        getMoviesByGenres,
        getMoviesByReleaseYear
    }
}

export default useMovies