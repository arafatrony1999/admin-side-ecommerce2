import { Tr, Td } from 'react-super-responsive-table';
import PriceFormat from '../../helper/PriceFormat';
import { useProductContext } from '../../context/ProductContext';

const ORDER_ITEMS_ROW = (props) => {
    const { all_products } = useProductContext()
    return (
        <>
        {
            all_products.filter((currElem) => {
                return(
                    currElem.id === props.item.product_id
                )
            }).map((a,index) => {
                return(
                    <Tr style={{height: '50px'}} key={a.id}>
                        <Td className='px-3'>{index}</Td>
                        <Td>
                            <img style={{height: '50px'}} src={a.image} alt={a.name} />
                        </Td>
                        <Td>{a.name}</Td>
                        <Td>{props.item.quantity}</Td>
                        <Td>
                            <PriceFormat price={props.item.price} />
                        </Td>
                        <Td>
                            <PriceFormat price={props.item.quantity * props.item.price} />
                        </Td>
                    </Tr>
                )
            })
        }
        </>
    )
}

export default ORDER_ITEMS_ROW