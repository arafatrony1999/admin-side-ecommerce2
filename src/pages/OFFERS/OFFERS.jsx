import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from '../../axios'
import { Link } from 'react-router-dom'
import DELETE from './DELETE/DELETE'
import WARNING from './WARNING/WARNING'
import { BsBoxArrowUpRight, BsTrash } from "react-icons/bs";

const OFFERS = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState('')

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [warningModalShow, setWarningModalShow] = useState(false);

    const [sendDeleteId, setSendDeleteId] = useState('')
    const [sendWarningId, setSendWarningId] = useState('')

    const getData = async () => {
        try{
            const res = await axios.get('/getOffers')
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
            return single_data.name.toLowerCase().match(search.toLowerCase())
        })
        setFilteredData(result)
    }, [search, data])

    const deleteModal = (deleteID) => {
        setSendDeleteId(deleteID)
        setDeleteModalShow(true)
    }

    const ondeletesuccess = () => {
        getData()
        setDeleteModalShow(false)
    }

    const warningModal = (warningID) => {
        setSendWarningId(warningID)
        setWarningModalShow(true)
    }

    const onwarningsuccess = () => {
        getData()
        setWarningModalShow(false)
    }


    const columns = [
        {
            name: 'Offer Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Discount Percent',
            selector: row => <span>{row.discount_percent}%</span>
        },
        {
            name: 'Status',
            selector: row => row.status === (1 || '1') ? <button onClick={() => warningModal(row.id)} className='btn btn-success'>Active</button> : <button onClick={() => warningModal(row.id)} className='btn btn-danger'>Not Active</button>
        },
        {
            name: 'Description',
            selector: row => <div dangerouslySetInnerHTML={{__html: row.description}} />
        },
        {
            name: 'Action',
            cell: row => <>
                <Link to={`edit/${row.id}`} className='btn btn-primary'>
                    <BsBoxArrowUpRight />
                </Link>
                <button onClick={() => deleteModal(row.id)} className='btn btn-danger mx-2'>
                    <BsTrash />
                </button>
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
                actions={
                    <Link to='add' className='btn btn-primary'>ADD NEW OFFER</Link>
                }
            />

            <DELETE 
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                deleteid = {sendDeleteId}
                ondeletesuccess = {ondeletesuccess}
            />

            <WARNING
                show={warningModalShow}
                onHide={() => setWarningModalShow(false)}
                warningid = {sendWarningId}
                onwarningsuccess = {onwarningsuccess}
            />
        </div>
    )
}

export default OFFERS