import { useSelector } from 'react-redux'
import './searchBook.css'
import { Link } from 'react-router-dom'
import { Circles } from 'react-loader-spinner'

const SearchBookToggle = () => {
    const { books, result, loading } = useSelector(state => state.books)

    return (
        <div className='book-toggle'>
            {result === 0 ? <h1>No Books found</h1> :
                books.map((book) => (
                    <>
                        <div key={book._id} className='search-box'>
                            <img src={book?.image} alt="books" className='search-image' />
                            <div className="info">
                                <div className="search-title"><h1><Link to={`/book/${book?._id}`}>{book?.title}</Link></h1></div>
                                <div className="search-author">{book?.author}</div>
                            </div>
                        </div>
                    </>
                ))}

            {loading && <Circles
                height="40"
                width="40"
                color="#8a2aaa"
                ariaLabel="circles-loading"
                wrapperStyle={{
                    textAlign: 'center'
                }}
                visible={true}
            />}
        </div>
    )
}

export default SearchBookToggle