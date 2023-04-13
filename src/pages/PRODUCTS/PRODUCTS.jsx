import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from '../../axios'
import { Link } from 'react-router-dom'
import DELETE from './DELETE/DELETE'
import blank from '../../assets/images/blank.png'
import { BsBoxArrowUpRight, BsTrash } from "react-icons/bs";
import WARNING from './WARNING/WARNING'

const PRODUCTS = () => {
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
            const res = await axios.get('/getProduct')
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
            return single_data.cat_name.toLowerCase().match(search.toLowerCase())
        })
        setFilteredData(result)
        //eslint-disable-next-line
    }, [search])

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
            name: 'Image',
            selector: row => row.image !== (0 || '0') ? <img style={{height: '50px'}} src={row.image} alt="" /> : <img style={{width: '50px'}} src={blank} alt="" />
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true
        },
        {
            name: 'Featured',
            selector: row => row.featured === (1 || '1') ? <button onClick={() => warningModal(row.id)} className='btn btn-success'>Featured</button> : <button onClick={() => warningModal(row.id)} className='btn btn-danger'>Not Featured</button>
        },
        {
            name: 'Catagory',
            selector: row => row.catagory.cat_name
        },
        {
            name: 'Sub Catagory',
            selector: row => row.subcatagory.name
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
                pagination
                progressPending={loading && 'Loading...'}
                title='Products'
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
                    <Link to='add' className='btn btn-primary'>ADD NEW PRODUCT</Link>
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

export default PRODUCTS