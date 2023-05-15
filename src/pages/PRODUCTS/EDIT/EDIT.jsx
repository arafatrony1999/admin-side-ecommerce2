import React, { useEffect, useMemo, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import JoditEditor from 'jodit-react';
import axios from '../../../axios'
import { toast } from 'react-toastify';
import blank from '../../../assets/images/blank.png'
import { useParams } from 'react-router-dom';
import Select from 'react-select'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useCatagoryContext } from '../../../context/CatagoryContext';
import { useSubCatagoryContext } from '../../../context/SubCatagoryContext';
import { useOfferContext } from '../../../context/OfferContext';

const EDIT = () => {
    const { editID } = useParams();

    const [btnText, setBtnText] = useState('Update')
    const [loading, setLoading] = useState(false)

    const { all_catagory } = useCatagoryContext();
    const { all_sub_catagory } = useSubCatagoryContext();
    const { all_offers } = useOfferContext();

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [item, setItem] = useState(0)
    const [catagory, setCatagory] = useState('')
    const [subcatagory, setSubcatagory] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState('')
    const [offer, setOffer] = useState('0')
    const [discount, setDiscount] = useState(null)

    const [src, setSrc] = useState('')

    const [filterSub, setFilterSub] = useState([])

    const editor = useRef(null);
    const config = useMemo(() => ({
            readonly: false, 
        }), []
    );
    

    useEffect(() => {
        const formData = new FormData()
        formData.append('id', editID)

        axios.post('/getEditProduct', formData)
        .then((res) => {
            setName(res.data.name)
            setPrice(res.data.price)
            setItem(res.data.item)
            setImage(res.data.image)
            setDesc(res.data.description)
            setSrc(res.data.image)
            setCatagory(res.data.catagory)
            setFilterSub(all_sub_catagory.filter((a) => {
                return a.catagory_id === res.data.catagory_id
            }))
            setSubcatagory(res.data.subcatagory)
            setOffer(res.data.offers)
            setDiscount(res.data.discount)
        })
    }, [editID, all_sub_catagory])

    const setSelectedCatagory = (cat) => {
        setCatagory(cat)
        setFilterSub(all_sub_catagory.filter((a) => {
            return a.catagory_id === cat.id
        }))
    }

    const setSelectedSubCatagory = (sub_cat) => {
        setSubcatagory(sub_cat)
    }

    const setSelectedOffer = (off) => {
        setDiscount(off)
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

        formData.append('id', editID)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('item', item)
        formData.append('image', image)
        formData.append('description', desc)
        formData.append('catagory', catagory.id)
        formData.append('subcatagory', subcatagory.id)
        formData.append('offer', offer)
        if(discount){
            formData.append('discount', discount.id)
        }

        axios.post('/editProduct', formData)
        .then((res) => {
            if(res.data === 1){
                toast.success('Product edit successful!', {
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
                toast.error('No data have been changed!', {
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
            toast.error('Fill all the required fields!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setBtnText('Edit')
            setLoading(false)
        })
    }

    return (
        <div className='page-container'>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Product Name" required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Price" required />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Catagory</Form.Label>
                            <Select
                                value={catagory}
                                onChange={setSelectedCatagory}
                                options={all_catagory}
                                getOptionLabel={(options) => options.cat_name}
                                getOptionValue={(options) => options.id}
                                isSearchable
                                isClearable
                                noOptionsMessage={() => 'No catagory found'}
                                placeholder='Select Catagory...'
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Sub Catagory</Form.Label>
                            <Select
                                isDisabled={filterSub.length === 0 ? true : false}
                                value={subcatagory}
                                onChange={setSelectedSubCatagory}
                                options={filterSub}
                                getOptionLabel={(options) => options.name}
                                getOptionValue={(options) => options.id}
                                isSearchable
                                isClearable
                                noOptionsMessage={() => 'No Sub Catagory found'}
                                placeholder='Select Sub Catagory...'
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Any offer available?</Form.Label>
                            <Form.Select onChange={(e) => setOffer(e.target.value)} value={offer} required>
                                <option value={1}>Available</option>
                                <option value={0}>Not Available</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Offer</Form.Label>
                            <Select
                                isDisabled={offer === 0 ? true : false}
                                value={discount}
                                onChange={setSelectedOffer}
                                options={all_offers.filter((a) => {
                                    return a.status === 1
                                })}
                                getOptionLabel={(options) => options.name}
                                getOptionValue={(options) => options.id}
                                isSearchable
                                isClearable
                                noOptionsMessage={() => 'No Active Offer found'}
                                placeholder='Select Offer...'
                                required={offer === 0 ? false : true}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Form.Group className="mb-3">
                    <Form.Label>Total Item in Stock</Form.Label>
                    <Form.Control value={item} onChange={(e) => setItem(e.target.value)} type="text" placeholder="Total Item in Stock" required />
                </Form.Group>
                
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Product Image</Form.Label>
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

export default EDIT