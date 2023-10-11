import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { getAllCategory } from '../../redux/category/categoryAction';
import { RiDeleteBin6Line } from 'react-icons/ri'
import moment from 'moment';
import axios from "axios";
import toast from 'react-hot-toast'
import { FallingLines } from 'react-loader-spinner';

const Category = () => {
    const dispatch = useDispatch()
    const { category, error, loading } = useSelector(state => state.category)
    useEffect(() => {
        if (error) console.log(error);
        dispatch(getAllCategory());
    }, [dispatch, error]);

    const handleDeleteClick = async (id) => {
        try {
            const res = await axios.delete(`/api/v1/category/${id}`, { withCredentials: true })
            if (res.status === 204) {
                toast.success('category Deleted Successfully')
                dispatch(getAllCategory());
            }
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        { field: 'name', headerName: 'Name', width: 160 },
        { field: 'description', headerName: 'Description', width: 380 },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 150,
            renderCell: (params) =>
                moment(params.row.createdAt).format('YYYY-MM-DD ')
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <>
                    <Link to={`/edit/category/${params.row._id}`}>edit</Link>
                    <RiDeleteBin6Line
                        className="delete-icon"
                        onClick={() => {
                            handleDeleteClick(params.row._id);
                        }}
                    />
                </>
            ),
        }
    ]

    return (
        <div className="box">
            <div className="info flex">
                <h2>Manage Category</h2>
                <button className='admin-btn'><Link to='/add/category' >Add Category</Link> </button>
            </div>
            {loading ? <FallingLines
                color="white"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            /> :
                <DataGrid
                    rows={category}
                    columns={columns}
                    getRowId={row => row._id}
                    className="custom-data-grid"
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5
                            }
                        }
                    }}
                    pageSizeOptions={5}
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

export default Category