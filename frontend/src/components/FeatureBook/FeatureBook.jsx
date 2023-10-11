import './FeatureBook.css'
import ProductCard from '../productCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getFeatureBook } from '../../redux/Book/bookAction'
const FeatureBook = () => {
    const dispatch = useDispatch()
    const { featBook } = useSelector(state => state.featBook)
    useEffect(() => {
        dispatch(getFeatureBook())
    }, [dispatch])
    return (
        <div className='feature-book'>
            <div className="container">
                <h2 className="title">Feature Books</h2>
                <div className="row">
                    {featBook && featBook.map((book) => (
                        <div key={book._id}>
                            <ProductCard book={book} />
                        </div>
                    ))}



                </div>
            </div>
        </div>
    )
}

export default FeatureBook