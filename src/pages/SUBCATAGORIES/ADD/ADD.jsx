import React, { useEffect, useMemo, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import JoditEditor from 'jodit-react';
import axios from '../../../axios'
import { toast } from 'react-toastify';
import blank from '../../../assets/images/blank.png'
import Select from 'react-select';
import { useSubCatagoryContext } from '../../../context/SubCatagoryContext';

const ADD = () => {
    const [btnText, setBtnText] = useState('Add')
    const [loading, setLoading] = useState(false)

    const { getSubCatagory } = useSubCatagoryContext()

    const [data, setData] = useState([])

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [catagory, setCatagory] = useState('')
    const [desc, setDesc] = useState('')
    const [src, setSrc] = useState('')

    const editor = useRef(null);
    const config = useMemo(() => ({
            readonly: false, 
        }), []
    );

    const setSelectedCatagory = (cat) => {
        setCatagory(cat)
    }
    
    const getData = async () => {
        try{
            const res = await axios.get('/getCatagories')
            setData(res.data)
        }
        catch(error){
            console.log(error)
        }
    }

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
        formData.append('catID', catagory.id)

        axios.post('/addSubCatagory', formData)
        .then((res) => {
            if(res.data === 1){
                toast.success('Sub Catagory add successful', {
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

                getSubCatagory()
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
            toast.error('Something went wrong!', {
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


    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='page-container'>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Sub Catagory Name</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Sub Catagory Name" required />
                </Form.Group>
                
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Select Catagory</Form.Label>
                    <Select
                        value={catagory}
                        onChange={setSelectedCatagory}
                        options={data}
                        getOptionLabel={(options) => options.cat_name}
                        getOptionValue={(options) => options.id}
                        isSearchable
                        isClearable
                        noOptionsMessage={() => 'No catagory found'}
                        placeholder='Select Catagory...'
                        required
                    />
                </Form.Group>
                
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Sub Catagory Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => fileChange(e)} required />
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