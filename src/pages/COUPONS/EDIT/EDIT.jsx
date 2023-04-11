import React, { useEffect, useMemo, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import JoditEditor from 'jodit-react';
import axios from '../../../axios'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const EDIT = () => {
    const { editID } = useParams();

    const [btnText, setBtnText] = useState('Update')
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [status, setStatus] = useState(1)
    const [discount, setDiscount] = useState(0)
    const [maxDiscount, setMaxDiscount] = useState('')
    const [minOrder, setMinOrder] = useState(0)
    const [desc, setDesc] = useState('')

    useEffect(() => {
        const formData = new FormData()
        formData.append('id', editID)

        axios.post('/getEditCoupon', formData)
        .then((res) => {
            setName(res.data[0].name)
            setCode(res.data[0].code)
            setDiscount(res.data[0].discount)
            setDesc(res.data[0].desc)
            setStatus(res.data[0].status)
            setMaxDiscount(res.data[0].max_discount)
            setMinOrder(res.data[0].min_order)
        })
    }, [editID])

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

        formData.append('id', editID)
        formData.append('name', name)
        formData.append('code', code.toUpperCase())
        formData.append('status', status)
        formData.append('discount', discount)
        formData.append('max_discount', maxDiscount)
        formData.append('min_order', minOrder)
        formData.append('desc', desc)

        axios.post('/editCoupon', formData)
        .then((res) => {
            if(res.data === 1){
                toast.success('Coupon updated successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }else{
                toast.warn('No data have been changed!', {
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
            setBtnText('Update')
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })
        
    }

    return (
        <div className='page-container'>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Coupon Name</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Coupon Name" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Coupon Code</Form.Label>
                    <Form.Control value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="Enter Coupon Code" required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Coupon Status</Form.Label>
                    <Form.Select defaultValue={status} onChange={(e) => setStatus(e.target.value)} >
                        <option disabled>Select Coupon Status...</option>
                        <option value="1">Active</option>
                        <option value="0">Not Active</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Discount (%)</Form.Label>
                    <Form.Control value={discount} onChange={(e) => setDiscount(e.target.value)} type="text" placeholder="Discount Percent" required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Maximum Discount (Taka)</Form.Label>
                    <Form.Control value={maxDiscount} onChange={(e) => setMaxDiscount(e.target.value)} type="text" placeholder="Maximum Discount" required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Minimum Order (Taka)</Form.Label>
                    <Form.Control value={minOrder} onChange={(e) => setMinOrder(e.target.value)} type="text" placeholder="Maximum Discount" required />
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

export default EDIT