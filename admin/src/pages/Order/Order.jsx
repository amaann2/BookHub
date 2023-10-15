import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../redux/Order/orderAction";
import OrdersAction from "./OrdersAction";
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast'

const Order = () => {
  const dispatch = useDispatch()
  const { orders, error, loading } = useSelector(state => state.orders)

  useEffect(() => {
    if (error) toast.error(error);
    dispatch(getAllOrder());
  }, [dispatch, error]);
  const [rowId, setRowId] = useState(null)
  const columns = [
    {
      field: "_id",
      headerName: "Order Id",
      width: 220,
    },
    {
      field: "payment_status",
      headerName: "Payment",
      width: 70,
    },
    {
      field: "shipping_address",
      headerName: "Address",
      width: 300,
    },
    {
      field: "delivery_status",
      headerName: "delivery status",
      width: 160,
      type: 'singleSelect',
      valueOptions: ['Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Failed', 'Canceled'],
      editable: true
    },
    {
      field: "total_price",
      headerName: "Total Price",
      width: 100,
      valueFormatter: (params) =>
        `${(params.value / 100).toFixed(2)}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      with: 100,
      renderCell: params => <OrdersAction  {...{ params, rowId, setRowId }} />
    },
    [rowId]
  ]
  return (
    <div className="box" >
      <div className="info">
        <h2>Manage Order</h2>
      </div>

      {loading ?
        <FallingLines
          color="white"
          width="100"
          visible={true}
          ariaLabel='falling-lines-loading'
        />
        : <DataGrid
          rows={orders}
          getRowId={row => row._id}
          columns={columns}
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
        />}
    </div>
  )
}

export default Order