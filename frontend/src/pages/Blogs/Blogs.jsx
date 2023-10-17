import { useDispatch, useSelector } from 'react-redux'
import './blog.css'
import { useEffect } from 'react'
import { getAllBlog } from '../../redux/Blogs/blogAction'
import { Link } from 'react-router-dom'
import { Bars } from 'react-loader-spinner'

const Blogs = () => {
    const dispatch = useDispatch()
    const { blogs, loading } = useSelector(state => state.blogs)

    useEffect(() => {
        dispatch(getAllBlog())
    }, [dispatch])
    return (
        <div className='container'>
            <h2 className="title">Blogs</h2>
            {loading ? <Bars
                height="80"
                width="80"
                color="#8a2aaa"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> :
                blogs?.map((blog) => (
                    <div className="blog-card" key={blog?._id}>
                        <img src={`https://bookhub-wabd.onrender.com/${blog.cover}`} alt="" className='blog-cover' />
                        <div className="blog-info">
                            <h2 className="blog-title">{blog?.title}</h2>
                            <p className="blog-intro">{blog?.summary}</p>
                            <Link to={`/blog/${blog?._id}`}>  <button className='btn'>Read more</button></Link>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default Blogs