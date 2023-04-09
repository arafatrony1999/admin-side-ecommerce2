import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from '../../axios'
import { Link } from 'react-router-dom'
import DELETE from './DELETE/DELETE'
import blank from '../../assets/images/blank.png'

const CATAGORIES = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState('')

    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const [sendDeleteId, setSendDeleteId] = useState('')

    const getData = async () => {
        try{
            const res = await axios.get('/getCatagories')
            setData(res.data)
            setFilteredData(res.data)
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
            selector: row => row.featured === (1 || '1') ? <button className='btn btn-success'>Featured</button> : <button className='btn btn-danger'>Not Featured</button>
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
                ondeletesuccess={ondeletesuccess}
            />
        </div>
    )
}

export default CATAGORIES