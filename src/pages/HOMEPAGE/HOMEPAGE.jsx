import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'

const HOMEPAGE = () => {
    const { loading, authenticated, role } = useUserContext()

    const navigate = useNavigate()

    useEffect(() => {
        if(!loading){
            if(authenticated && role !== 'admin'){
                navigate('/')
            }else{
                navigate('/login')
            }
        }
    }, [authenticated, loading, navigate, role])
    
    if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <div className='single-page'>
            Homepage
        </div>
    )
}

export default HOMEPAGE