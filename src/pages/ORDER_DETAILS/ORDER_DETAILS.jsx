import { useSearchParams } from 'react-router-dom'
import ORDER_SUMMERY_CONTAINER from '../../components/ORDER_SUMMERY_CONTAINER/ORDER_SUMMERY_CONTAINER'

const ORDER_DETAILS = () => {
    const [searchParams] = useSearchParams()
    
    return (
        <ORDER_SUMMERY_CONTAINER orderID={searchParams.get('order_id')} />
    )
}

export default ORDER_DETAILS