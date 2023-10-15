import { useEffect, useState } from 'react'
import ProductCard from './../../components/productCard/ProductCard'
import './book.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllBook } from '../../redux/Book/bookAction'
import { getAllCategory } from '../../redux/category/categoryAction'
import { Bars } from 'react-loader-spinner'
import NotFound from './NotFound'

const Books = () => {
    const dispatch = useDispatch()
    const { books, loading, totalBook, result } = useSelector(state => state.books)
    const { category } = useSelector(state => state.category)
    const [currentPage, setCurrentPage] = useState(1)
    const [sort, setSorting] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        dispatch(getAllCategory())
        
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllBook(currentPage, sort, selectedCategory))
    }, [dispatch, currentPage, sort, selectedCategory])

    //*: --------pagination----------
    const totalPage = Math.ceil(totalBook / 12)
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1)

    //*: --------sorting -----------
    const handleSortingChange = (event) => {
        const selectedSorting = event.target.value;
        if (selectedSorting === 'price-low-to-high') {
            setSorting('price');
        } else if (selectedSorting === 'price-high-to-low') {
            setSorting('-price');
        } else {
            setSorting('')
        }
    };

    //*: --------categorize books from category  -----------

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === 'All') {
            setSelectedCategory('');
        }
        else {
            setSelectedCategory(selectedCategory);
        }
    };

    return (
        <div className="container">
            {result === 0 ? <NotFound /> :
                <div className="product-page">
                    <div className="row head">
                        <div className="col-2">
                            <h2 className='productpage-heading'></h2>
                        </div>
                        <div className="filter">
                            <select onChange={handleCategoryChange}>
                                <option >All</option>
                                {category && category?.data?.map((cat) => (
                                    <option key={cat?.id} value={cat?._id} >{cat?.name}</option>
                                ))}
                            </select>
                            <select onChange={handleSortingChange}>
                                <option>Default Sorting</option>
                                <option value="price-low-to-high">Price (low to high)</option>
                                <option value="price-high-to-low"> Price (High to Low)</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        {loading ? <Bars
                            height="80"
                            width="80"
                            color="#8a2aaa"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        /> :
                            books && books.map((book, i) => (
                                <div className="col-4" key={i}>
                                    <ProductCard book={book} />
                                </div>
                            ))}
                    </div>

                    {pageNumbers.map((num) => (
                        <button className={`pagination-btn  mr-2 ${num === currentPage ? 'page-active' : ''}`} key={num} onClick={() => handlePageChange(num)}>{num}</button>
                    ))}
                </div>
            }
        </div>
    )
}

export default Books