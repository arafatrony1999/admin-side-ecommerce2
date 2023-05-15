import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from '../../axios'
import { Link } from 'react-router-dom'
import { BsBoxArrowUpRight } from "react-icons/bs";
import PriceFormat from '../../helper/PriceFormat'
import { toast } from 'react-toastify'

const ORDERS = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState('')

    const getData = async () => {
        try{
            const res = await axios.get('/getOrders')
            setData(res.data)
            setFilteredData(res.data)
            setLoading(false)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const result = data.filter(single_data => {
            return single_data.order_id.toLowerCase().match(search.toLowerCase())
            ||
            single_data.txn_id.toLowerCase().match(search.toLowerCase())
            ||
            single_data.sender_number.toLowerCase().match(search.toLowerCase())
        })
        setFilteredData(result)
    }, [search, data])


    
    const onChange = (id, status) => {
        const formData = new FormData();
        formData.append('id', id)
        formData.append('status', status)
        axios.post('/updateOrderStatus', formData)
        .then((res) => {
            if(res.data === 1){
                toast.success('No data have been changed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                getData()
            }else{
                toast.warn('Status Updated Successful!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                getData()
            }
        })
        .catch((error) => {
            toast.error('Server not responding!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            getData()
        })
    }


    const columns = [
        {
            name: 'Order ID',
            selector: row => <Link to={`/order?order_id=${row.order_id}`}>{ row.order_id }</Link>,
            sortable: true
        },
        {
            name: 'Total Amount',
            selector: row => <PriceFormat price={row.total} />,
        },
        {
            name: 'Txn ID',
            selector: row => row.txn_id
        },
        {
            name: 'Sender Number',
            selector: row => row.sender_number
        },
        {
            name: 'Status',
            selector: row => <select onChange={(e) => onChange(row.id, e.target.value)} defaultValue={row.stage} name="stage" id="stage">
                <option value="Verifying">Verifying</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipping">Shipping</option>
                <option value="Delivered">Delivered</option>
            </select>,
            sortable: true
        },
        {
            name: 'Action',
            cell: row => <>
                <Link to={`edit/${row.id}`} className='btn btn-primary'>
                    <BsBoxArrowUpRight />
                </Link>
            </>
        }
    ]


    return (
        <div className='page-container'>
            <DataTable
                columns={columns}
                data={filteredData}
                progressPending={loading && 'Loading...'}
                pagination
                title='Offers'
                fixedHeader
                fixedHeaderScrollHeight='50%'
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <input type='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='w-25 form-group' />
                }
            />
        </div>
    )
}

export default ORDERS