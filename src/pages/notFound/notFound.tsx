import { Link } from 'react-router-dom'
import './styles/notfound.scss'

const NotFound = () => {
    return (
        <>
            <div className="page-container">
                <div className='message-box px-5 d-flex flex-column justify-content-center align-items-center'>
                    <strong className='text-white'>Lost your way?</strong>
                    <p className='text-white'>Sorry, that page couldn't be found. You'll find loads to explore on the site's homepage</p>
                    <Link to='/'><button className='btn btn-success'>Home</button></Link>
                </div>
            </div>
        </>
    )
}

export default NotFound