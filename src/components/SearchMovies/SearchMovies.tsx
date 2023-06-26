import { ChangeEvent, useState } from 'react'
import './styles/searchmovies.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const SearchMovies = () => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    function handleSearchInput(ev: ChangeEvent<HTMLInputElement>): void {
        setSearchText(() => (ev.target as HTMLInputElement).value)
    }

    const SearchMovies = () => {
        navigate(`/search/${searchText}`);
    }

  return (
    <div className='search-input-container w-100'>
        <input
            type='text'
            placeholder='Enter Keyword'
            className='form-control position-relative'
            value={searchText}
            onChange={(ev) => handleSearchInput(ev)}
            />
        <button type="button" onClick={SearchMovies}><FontAwesomeIcon icon={faSearch} /></button>
    </div>
  )
}

export default SearchMovies