import axios from 'axios'

const useAxios = () => {
    // const baseURL = 'http://localhost:5000/api'
    const baseURL = import.meta.env.VITE_API_BASE_URL

    const axiosPublic = axios.create({ baseURL })

    return {
        axiosPublic
    }
}

export default useAxios;