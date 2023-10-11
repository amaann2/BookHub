import './Category.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllCategory } from './../../redux/category/categoryAction'
import { Link } from 'react-router-dom'
const Category = () => {
    const dispatch = useDispatch()
    const { category } = useSelector(state => state.category)
    useEffect(() => {
        dispatch(getAllCategory())
    }, [dispatch])
    return (
        <div className='category'>
            <div className="container">
                <h2 className="title">Categories</h2>
                <div className="row">
                    {category && category?.data?.map((cat) => (
                        <div className="category-card" key={cat._id}>
                            <h1 className="category-title"><Link to={`/bookss/${cat._id}`}>{cat.name}</Link></h1>
                        </div>
                    ))}

                </div>
            </div>
        </div >
    )
}

export default Category