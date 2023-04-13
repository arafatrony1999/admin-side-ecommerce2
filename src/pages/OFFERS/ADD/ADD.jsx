import React, { useMemo, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import JoditEditor from 'jodit-react';
import axios from '../../../axios'
import { toast } from 'react-toastify';
import { useOfferContext } from '../../../context/OfferContext';

const ADD = () => {
    const [btnText, setBtnText] = useState('Add')
    const [loading, setLoading] = useState(false)

    const { getOffers } = useOfferContext()

    const [name, setName] = useState('')
    const [percent, setPercent] = useState(0)
    const [status, setStatus] = useState(0)
    const [desc, setDesc] = useState('')

    const editor = useRef(null);
    const config = useMemo(() => ({
            readonly: false, 
        }), []
    );


    const onSubmit = (e) => {
        e.preventDefault()
        setBtnText('Loading...')
        setLoading(true)

        const formData = new FormData();

        formData.append('name', name)
        formData.append('percent', percent)
        formData.append('status', status)
        formData.append('description', desc)

        axios.post('/addOffer', formData)
        .then((res) => {
            if(res.data === 1){
                toast.success('Offer add successful', {
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
                setPercent('')
                setStatus('')
                setDesc('')

                getOffers()
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
                    <Form.Label>Offer Name</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Offer Name" required />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Discount (%)</Form.Label>
                    <Form.Control value={percent} onChange={(e) => setPercent(e.target.value)} type="text" placeholder="Discount Percent" required />
                </Form.Group>

                
                <Form.Group className="mb-3">
                    <Form.Label>Offer Status</Form.Label>
                    <Form.Select defaultValue={status} onChange={(e) => setStatus(e.target.value)} aria-label="Default select example">
                        <option disabled>Select Offer Status...</option>
                        <option value="1">Active</option>
                        <option value="0">Not Active</option>
                    </Form.Select>
                </Form.Group>
                

                
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