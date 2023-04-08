import React, { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import JoditEditor from 'jodit-react';

const ADD = () => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [desc, setDesc] = useState('')
    const [src, setSrc] = useState('')

    const editor = useRef(null);

    const fileChange = (e) => {
        setImage(e.target.files[0])
        setSrc(URL.createObjectURL(e.target.files[0]))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.append('name', name)
        formData.append('image', image)
        formData.append('desc', desc)
    }

    return (
        <div className='page-container'>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Catagory Name</Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Catagory Name" />
                </Form.Group>
                
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Catagory Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => fileChange(e)} />
                </Form.Group>

                <img src={src} alt="" />

                <Form.Group className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <JoditEditor
                        ref={editor}
                        value={desc}
                        tabIndex={1}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </div>
    )
}

export default ADD