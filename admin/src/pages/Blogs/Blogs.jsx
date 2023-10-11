import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FallingLines } from 'react-loader-spinner';
import { getAllBlog } from '../../redux/Blogs/blogAction'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri'
import axios from "axios";
import toast from 'react-hot-toast'

const Blogs = () => {
    const dispatch = useDispatch()
    const { blogs, loading } = useSelector(state => state.blogs)
    useEffect(() => {
        dispatch(getAllBlog())
    }, [dispatch])
    const handleDeleteClick = async (id) => {
        alert('Are you sure you want to delete ?')
        try {
            const res = await axios.delete(`/api/v1/blogs/${id}`, { withCredentials: true })
            if (res.status === 204) {
                toast.success('Blog Deleted Successfully')
                dispatch(getAllBlog());
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const [rowId] = useState(null)
    const columns = [
        {
            field: "_id",
            headerName: "Id",
            width: 220,
        },
        {
            field: "title",
            headerName: "title",
            width: 500,
        },
        {
            field: "cover",
            headerName: "Cover Image",
            width: 160,
            renderCell: (params) => (
                <img
                    src={`http://localhost:8080/${params.row.cover}`}
                    alt="Book Cover"
                    style={{ width: '60%', height: '100%' }}
                />

            ),
        },
        {
            field: 'action',
            headerName: 'Actions',
            width: 80,
            renderCell: (params) => (
                <>
                    <Link to={`/edit/blog/${params.row._id}`}>edit</Link>
                    <RiDeleteBin6Line
                        className="delete-icon"
                        onClick={() => {
                            handleDeleteClick(params.row._id);
                        }}
                    />
                </>
            ),
        },

        [rowId]
    ]
    return (
        <div className='box'>
            <div className="info flex">
                <h2>Manage Blogs</h2>
                <button className='admin-btn'><Link to='/add/blog' >Add Blogs</Link> </button>

            </div>

            {loading ? <FallingLines
                color="white"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            /> :
                <DataGrid
                    rows={blogs}
                    getRowId={row => row._id}
                    columns={columns} />
            }
        </div>
    )
}

export default Blogs