import { useEffect } from 'react'
import ProductCard from './../../components/productCard/ProductCard'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getBookByCategory } from '../../redux/Book/bookAction'
import { useParams } from 'react-router-dom'
import { Bars } from 'react-loader-spinner';

const CategoryBook = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { categoryBook } = useSelector(state => state.featBook)

    useEffect(() => {
        dispatch(getBookByCategory(id))
    }, [dispatch, id])
    return (
        <div className="container">
            <div className="product-page">
                <div className="row head">
                    <div className="col-2">
                        <h2 className='productpage-heading'></h2>
                    </div>

                </div>

                <div className="row">
                    {categoryBook?.length === 0 ? <Bars
                        height="80"
                        width="80"
                        color="#8a2aaa"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    /> : categoryBook && categoryBook.map((book, i) => (
                        <>
                            <div className="col-4" key={i}>
                                <ProductCard book={book} />
                            </div>
                        </>

                    ))}



                </div>
            </div>
        </div>
    )
}

export default CategoryBook