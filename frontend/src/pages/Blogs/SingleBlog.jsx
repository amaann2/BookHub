import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getSingleBlog } from "../../redux/Blogs/blogAction"
import { useEffect } from "react"
const SingleBlog = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { blog } = useSelector(state => state.singleBlog)

    useEffect(() => {
        dispatch(getSingleBlog(id))
    }, [dispatch, id])
    return (
        <div className="container">
            <img src={`https://bookhub-wabd.onrender.com/${blog?.cover}`} alt="cover" className="singleblog-image" />
            <h1 className="singleblog-title">{blog?.title}</h1>
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
        </div>
    )
}

export default SingleBlog