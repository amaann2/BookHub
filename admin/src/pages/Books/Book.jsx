import './book.scss'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllBook } from '../../redux/Book/bookAction';
import toast from 'react-hot-toast'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import moment from 'moment';
import { Link } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import axios from "axios";
import { FallingLines } from 'react-loader-spinner';

const Book = () => {
    const dispatch = useDispatch()
    const { books, error, loading } = useSelector(state => state.books)
    useEffect(() => {
        if (error) toast.error(error);
        dispatch(getAllBook());
    }, [dispatch, error]);

    const [rowId] = useState(null)
    const handleDeleteClick = async (id) => {
        try {
            const res = await axios.delete(`/api/v1/books/${id}`, { withCredentials: true })
            if (res.status === 204) {
                toast.success('Book Deleted Successfully')
                dispatch(getAllBook());

            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const columns = [
        {
            field: "title",
            headerName: "Title",
            width: 150,
        },
        { field: "author", headerName: "Author Name", width: 150 },
        { field: "category", headerName: "category", width: 100, valueGetter: (params) => params.row.category[0].name, },
        {
            field: "ISBN",
            headerName: "ISBN",
            width: 100,
        },

        { field: "price", headerName: "Price", width: 60 },

        {
            field: 'stock',
            headerName: 'Stock',
            width: 60,
        },
        {
            field: 'publish_date',
            headerName: 'Published Date',
            width: 150,
            renderCell: (params) =>
                moment(params.row.publish_date).format('DD-MM-YYYY')
        },
        {
            field: 'image',
            headerName: 'Images',
            width: 80,
            renderCell: (params) => (
                <img
                    src={params.row.image}
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
                    <Link to={`/edit/book/${params.row._id}`}>edit</Link>
                    <RiDeleteBin6Line
                        className="delete-icon"
                        onClick={() => {
                            handleDeleteClick(params.row._id);
                        }}
                    />
                </>
            ),
        },

        [rowId],
    ];
    return (
        <div className='box'>
            <div className="info flex">
                <h2>Manage books</h2>
                <button className='admin-btn'><Link to='/add/book' >Add Book</Link> </button>
            </div>
            {loading ? <FallingLines
                color="white"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            /> :
                <DataGrid
                    rows={books}
                    columns={columns}
                    getRowId={row => row._id}
                    className="custom-data-grid"
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8
                            }
                        }
                    }}
                    pageSizeOptions={10}
                    slots={
                        { toolbar: GridToolbar }
                    }
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 }
                        }
                    }}
                    disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
                />


            }


        </div>
    )
}

export default Book