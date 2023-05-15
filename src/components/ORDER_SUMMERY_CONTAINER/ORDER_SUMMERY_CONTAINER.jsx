import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import ORDER_TITLE from '../ORDER_TITLE/ORDER_TITLE'
import PriceFormat from '../../helper/PriceFormat'
import { useEffect, useState } from 'react';
import axios from '../../axios'
import ORDER_ITEMS_ROW from '../ORDER_ITEMS_ROW/ORDER_ITEMS_ROW';

const ORDER_SUMMERY_CONTAINER = (props) => {
    const [orders, setOrders] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(props.orderID){
            axios.get(`/getOrderDetails?order_id=${props.orderID}`)
            .then((res) => {
                setOrders(res.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log('Server not responding!')
            })
        }
    }, [props])

    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <ORDER_TITLE orderTitle='Order Summery' />
            <div className='order-lists w-100 p-3 d-flex bg-white' style={{fontSize: '14px'}}>
                <div className="w-50">
                    <>
                        <div className="d-flex py-2 text-truncate">
                            <div className="w-25">Order Code</div>
                            <div>:</div>
                            <div style={{paddingLeft: '15px'}}>{orders.order_id}</div>
                        </div>
                        <div className="d-flex py-2">
                            <div className="w-25">Customer</div>
                            <div>:</div>
                            <div style={{paddingLeft: '15px'}}>{orders.user.name}</div>
                        </div>
                        <div className="d-flex py-2">
                            <div className="w-25">Email</div>
                            <div>:</div>
                            <div style={{paddingLeft: '15px'}}>{orders.user.user}</div>
                        </div>
                        <div className="d-flex py-2">
                            <div className="w-25">Shipping Address</div>
                            <div>:</div>
                            <div style={{paddingLeft: '15px'}} className='text-truncate'>
                                {orders.order_address.address}, {orders.order_address.thana}, {orders.order_address.district}, {orders.order_address.division}
                            </div>
                        </div>
                    </>
                </div>
                <div className="order-summery-right w-50">
                    <div className="d-flex py-2">
                        <div className="w-25">Order Date</div>
                        <div>:</div>
                        <div style={{paddingLeft: '15px'}}>{orders.created_at.slice(0,10)}</div>
                    </div>
                    <div className="d-flex py-2">
                        <div className="w-25">Order Status</div>
                        <div>:</div>
                        <div style={{paddingLeft: '15px'}}>{orders.stage}</div>
                    </div>
                    <div className="d-flex py-2">
                        <div className="w-25">Total Amount</div>
                        <div>:</div>
                        <div style={{paddingLeft: '15px'}}>
                            <PriceFormat price={orders.total} />
                        </div>
                    </div>
                    <div className="d-flex py-2">
                        <div className="w-25">Shipping Method</div>
                        <div>:</div>
                        <div style={{paddingLeft: '15px'}}>Flat shipping rate</div>
                    </div>
                    <div className="d-flex py-2">
                        <div className="w-25">Payment method</div>
                        <div>:</div>
                        <div style={{paddingLeft: '15px'}}>
                            {
                                orders.payment_method === 'cod' && 'Cash On Delivery'
                            }
                            {
                                orders.payment_method === 'bkash' && 'bKash'
                            }
                            {
                                orders.payment_method === 'nagad' && 'Nagad'
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex w-100 justify-content-between">

                <div className='order-lists w-75 d-flex flex-wrap bg-white my-3' style={{fontSize: '14px'}}>
                    <ORDER_TITLE orderTitle='Order Details' />

                    
                    <div className="order-lists w-100 p-3">
                        <Table className="cart-tablex">
                            <Thead style={{background: '#eceff7'}} className='px-2'>
                                <Tr>
                                    <Th className='px-3'>#</Th>
                                    <Th>Image</Th>
                                    <Th className='cart-product-details-left'>Product</Th>
                                    <Th style={{paddingRight: "10px"}}>Quantity</Th>
                                    <Th>Price</Th>
                                    <Th>Sub Total</Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                {
                                    orders.order_items.map((order) => {
                                        return(
                                            <ORDER_ITEMS_ROW key={order.id} item={order} />
                                        )
                                    })
                                }
                            </Tbody>
                        </Table>
                    </div>
                </div>

                <div className="order-amount my-3">
                    <ORDER_TITLE orderTitle='Order Amount' />
                    <div className="bg-white">
                        <div style={{fontSize: '12px'}} className="d-flex w-100 px-3 py-2">
                            <div className="w-50">Subtotal</div>
                            <div className="w-50">
                                {
                                    orders.coupon_discount ?
                                    <PriceFormat price={orders.order_address.district === 'Dhaka' ? (orders.total - 50 + orders.coupon_discount) : (orders.total - 100 + orders.coupon_discount)} /> :
                                    <PriceFormat price={orders.order_address.district === 'Dhaka' ? (orders.total - 50) : (orders.total - 100)} />
                                }
                                
                            </div>
                        </div>
                        <div style={{fontSize: '12px'}} className="d-flex w-100 px-3 py-2">
                            <div className="w-50">Shipping</div>
                            <div className="w-50">
                                <PriceFormat price={orders.order_address.district === 'Dhaka' ? 50 : 100} />
                            </div>
                        </div>
                        <div style={{fontSize: '12px'}} className="d-flex w-100 px-3 py-2">
                            <div className="w-50">Tax</div>
                            <div className="w-50">
                                <PriceFormat price={0} />
                            </div>
                        </div>
                        <div style={{fontSize: '12px'}} className="d-flex w-100 px-3 py-2">
                            <div className="w-50">Coupon</div>
                            <div className="w-50">
                                <PriceFormat price={orders.coupon_discount ? orders.coupon_discount : 0} />
                            </div>
                        </div>
                        <div style={{fontSize: '12px'}} className="d-flex w-100 px-3 py-2">
                            <div className="w-50">Total</div>
                            <div className="w-50">
                                <PriceFormat price={orders.total} />
                            </div>
                        </div>
                    </div>

                    <button className='w-100 btn btn-primary mt-2'>Confirm Order</button>
                </div>
            </div>
            
        </>
    )
}

export default ORDER_SUMMERY_CONTAINER