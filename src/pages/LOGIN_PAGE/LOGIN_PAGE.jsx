import React, { useEffect, useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

const LOGINPAGE = () => {
    const [failed, setFailed] = useState(false);

    const [name, setName] = useState("arafat.rony1999@gmail.com");
    const [password, setPassword] = useState("123456789");
    
    const [notVerified, setNotVerified] = useState(false)

    const { loading, authenticated, role, getUser } = useUserContext()

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

    
    async function onSubmit(e){
        e.preventDefault();
        const formData = new FormData();

        formData.append('name',name)
        formData.append('password',password)
        
        await fetch('http://127.0.0.1:8000/api/login',{
            method: "POST",
            body: formData
        })
        .then((res)=>{
            if(!res.ok){
                throw Error("Something went wrong");
            }
            else{
                return res.json();
            }
        })
        .then((data) => {
            if(data === 0){
                setFailed(true)
            }else{
                if(data.verified === 0){
                    setNotVerified(true)
                }else{
                    localStorage.setItem('auth',JSON.stringify(data));
                    // window.location.replace('/');
                    getUser()
                }
            }
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }

    
    if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <div className='login-page'>
            <h4>Login to your account</h4>
            <form onSubmit={onSubmit}>
                <div className="input-field-login">
                    <input style={{paddingLeft: "10px"}} value={name} className='login-input' onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Email' />
                </div>

                <div className="input-field-login">
                    <input style={{paddingLeft: "10px"}} value={password} onChange={(e)=>{setPassword(e.target.value)}} className='login-input' type="password" placeholder='Password' />
                    <div className="login-other">
                        <div className="forget-pass">
                            <input type="checkbox" label="Check me out" />
                            <span>Check me out</span>
                        </div>
                        <div className="forget-pass a-cen">
                            <a href="/">Forget Password</a>
                        </div>
                    </div>
                </div>

                <button className='login-btn' type='submit'>LOGIN</button>
                {
                    notVerified && <Alert variant="danger">
                        Your account is not verified!
                    </Alert>
                }
                {
                    failed && <Alert variant="danger">Email / Password is incorrect</Alert>
                }
            </form>
        </div>
    );
}

export default LOGINPAGE;
