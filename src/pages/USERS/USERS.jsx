import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from '../../axios'
import { Link } from 'react-router-dom'
import DELETE from './DELETE/DELETE'
import WARNING from './WARNING/WARNING'
import { BsBoxArrowUpRight, BsTrash } from "react-icons/bs";
import { useUserContext } from '../../context/UserContext'

const USERS = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState('')

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [warningModalShow, setWarningModalShow] = useState(false);

    const [sendDeleteId, setSendDeleteId] = useState('')
    const [sendWarningId, setSendWarningId] = useState('')

    const { all_users, getUsers } = useUserContext()

    useEffect(() => {
        setData(all_users)
        setFilteredData(all_users)
        setLoading(false)
    }, [all_users])

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
        getUsers()
        setDeleteModalShow(false)
    }

    const warningModal = (warningID) => {
        setSendWarningId(warningID)
        setWarningModalShow(true)
    }

    const onwarningsuccess = () => {
        getUsers()
        setWarningModalShow(false)
    }

    const handleRole = (id, role) => {
        const formData = new FormData()

        formData.append('id', id)
        formData.append('role', role)

        axios.post('/editUserRole', formData)
        .then((res) => {
            if(res.data === 1){
                getUsers()
                alert('Role updated successfully!')
            }else{
                alert('No data changed!')
            }
        })
        .catch((error) => {
            alert('Server not responding')
        })
    }


    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => <a href={`mailto:${row.user}`}>{row.user}</a>,
        },
        {
            name: 'Phone',
            selector: row => row.phone
        },
        {
            name: 'Role',
            selector: row => <>
                <select value={row.role} onChange={(e) => handleRole(row.id, e.target.value)}>
                    <option value="user">User</option>
                    <option value="reseller">Re-seller</option>
                    <option value="admin">Admin</option>
                    <option value="modaretor">Modaretor</option>
                </select>
            </>
        },
        {
            name: 'Status',
            selector: row => row.status === (1 || '1') ? <button onClick={() => warningModal(row.id)} className='btn btn-success'>Active</button> : <button onClick={() => warningModal(row.id)} className='btn btn-danger'>Not Active</button>
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

export default USERS