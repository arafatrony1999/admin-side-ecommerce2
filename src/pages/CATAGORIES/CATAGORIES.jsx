import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from '../../axios'
import { Link } from 'react-router-dom'

const CATAGORIES = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState('')

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

    const columns = [
        {
            name: 'Image',
            selector: row => <img src={row.cat_image} alt="" />
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
                <button className='btn btn-primary'>Edit</button>
                <button className='btn btn-danger'>Delete</button>
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
        </div>
    )
}

export default CATAGORIES