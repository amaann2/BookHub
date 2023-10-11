import { useEffect, useState } from 'react';
import './user.scss'
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from '../../redux/User/userAction';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import moment from 'moment'
import UsersActions from './UsersActions';
import toast from 'react-hot-toast'
import { FallingLines } from 'react-loader-spinner'
const User = () => {
    const dispatch = useDispatch()
    const { users, error, loading } = useSelector(state => state.allUser)

    useEffect(() => {
        if (error) toast.error(error);
        dispatch(getAllUser());
    }, [dispatch, error]);

    const [rowId, setRowId] = useState(null)

    const columns = [
        {
            field: "firstName",
            headerName: "First Name",
            width: 100,
        },
        { field: "lastName", headerName: "last Name", width: 100 },
        { field: "email", headerName: "Email", width: 180 },
        {
            field: "role",
            headerName: "role",
            width: 100,
            type: 'singleSelect',
            valueOptions: ['admin', 'user'],
            editable: true
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 150,
            renderCell: (params) =>
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
        },
        { field: "_id", headerName: "id", width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            with: 100,
            renderCell: params => <UsersActions {...{ params, rowId, setRowId }} />
        },
        [rowId],
    ];
    return (
        <div className='box' >
            <div className="info">
                <h2>Manage Users</h2>
            </div>
            {loading ?<FallingLines
                color="white"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            />  :
                <DataGrid
                    rows={users}
                    columns={columns}
                    getRowId={row => row._id}
                    getRowSpacing={(params) => ({
                        top: params.isFirstVisible ? 0 : 5,
                        bottom: params.isLastVisible ? 0 : 5,
                    })}
                    onCellEditStop={params => setRowId(params.id)}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8
                            }
                        }
                    }}
                    pageSizeOptions={8}
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

export default User