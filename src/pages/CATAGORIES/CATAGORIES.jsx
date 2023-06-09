import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from '../../axios'
import { Link } from 'react-router-dom'
import DELETE from './DELETE/DELETE'
import WARNING from './WARNING/WARNING'
import blank from '../../assets/images/blank.png'
import { toast } from 'react-toastify'

const CATAGORIES = () => {
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
            const res = await axios.get('/getCatagories')
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

    const onwarningfailed = () => {
        setWarningModalShow(false)
        toast.warn('You can only add 3 featured catagory!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }

    const columns = [
        {
            name: 'Image',
            selector: row => row.cat_image !== (0 || '0') ? <img style={{width: '50px'}} src={row.cat_image} alt="" /> : <img style={{width: '50px'}} src={blank} alt="" />
        },
        {
            name: 'Catagory Name',
            selector: row => row.cat_name,
            sortable: true
        },
        {
            name: 'Featured',
            selector: row => row.featured === (1 || '1') ? <button onClick={() => warningModal(row.id)} className='btn btn-success'>Featured</button> : <button onClick={() => warningModal(row.id)} className='btn btn-danger'>Not Featured</button>
        },
        {
            name: 'Description',
            selector: row => <div dangerouslySetInnerHTML={{__html: row.cat_desc}} />
        },
        {
            name: 'Action',
            cell: row => <>
                <Link to={`edit/${row.id}`} className='btn btn-primary'>Edit</Link>
                <button onClick={() => deleteModal(row.id)} className='btn btn-danger mx-2'>Delete</button>
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
                title='Catagories'
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
                    <Link to='add' className='btn btn-primary'>ADD NEW CATAGORY</Link>
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
                onwarningfailed = {onwarningfailed}
            />
        </div>
    )
}

export default CATAGORIES