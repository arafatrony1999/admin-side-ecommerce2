import axios from '../../../axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

const DELETE = (props) => {
    const [btnText, setBtnText] = useState('Delete')
    const [loading, setLoading] = useState(false)

    const onClick = (id) => {
        setBtnText('Loading...')
        setLoading(true)
        const formData = new FormData();
        formData.append('id', id)

        axios.post('/deleteCatagory', formData)
        .then((res) => {
            if(res.data === 1){
                props.ondeletesuccess()
            }
            setBtnText('Delete')
            setLoading(false)
        })
        .catch((error) => {
            toast.error('No data have been changed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setBtnText('Delete')
            setLoading(false)
        })
    }
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Catagory
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this catagory?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button className='btn-danger' disabled={loading ? true : false} onClick={() => onClick(props.deleteid)}>
                        {btnText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DELETE