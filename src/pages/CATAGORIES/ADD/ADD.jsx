import React, { useMemo, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import JoditEditor from 'jodit-react';
import axios from '../../../axios'
import { toast } from 'react-toastify';
import blank from '../../../assets/images/blank.png'
import { useCatagoryContext } from '../../../context/CatagoryContext';

const ADD = () => {
    const [btnText, setBtnText] = useState('Add')
    const [loading, setLoading] = useState(false)

    const { getCatagory } = useCatagoryContext();

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [desc, setDesc] = useState('')
    const [src, setSrc] = useState('')

    const editor = useRef(null);
    const config = useMemo(() => ({
            readonly: false, 
        }), []
    );

    const fileChange = (e) => {
        setImage(e.target.files[0])
        setSrc(e.target.files[0] && URL.createObjectURL(e.target.files[0]))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setBtnText('Loading...')
        setLoading(true)

        const formData = new FormData();

        formData.append('name', name)
        formData.append('image', image)
        formData.append('desc', desc)

        axios.post('/addCatagory', formData)
        .then((res) => {
            if(res.data === 1){
                toast.success('Catagory add successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setName('')
                setImage('')
                setDesc('')
                setSrc('')

                getCatagory()
            }else{
                toast.error('Fill all the required field', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            setBtnText('Add')
            setLoading(false)
        })
        .catch((error) => {
            toast.error('Fill all the required field', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setBtnText('Add')
            setLoading(false)
        })
    }

    return (
        <div className='page-container'>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Catagory Name</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Catagory Name" />
                </Form.Group>
                
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Catagory Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => fileChange(e)} />
                </Form.Group>

                
                <img style={{maxWidth: '100px', margin: '20px 0'}} src={src ? src : blank} alt="" />

                <Form.Group className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <JoditEditor
                        ref={editor}
                        value={desc}
                        config={config}
                        tabIndex={3}
                        onChange={(e) => setDesc(e)}
                    />
                </Form.Group>

                <button disabled={loading ? true : false} type='submit' className='btn btn-primary'>
                    {btnText}
                </button>
            </Form>
        </div>
    )
}

export default ADD