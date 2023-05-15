import { createContext, useContext, useReducer } from "react";
import reducer from '../reducer/OrderReducer'
import axios from '../../axios'
import { useEffect } from "react";

const OrderContext = createContext()

const initialState = {
    loading: false,
    orders: [],
    filteredOrders: []
}

const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    
    const getData = async () => {
        try{
            dispatch({type: 'INITIAL_DISPATCH'})
            const res = await axios.get('/getOrders')
            dispatch({type: 'API_DATA', payload: res.data})
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return(
        <OrderContext.Provider value={{...state, getData}}>
            {children}
        </OrderContext.Provider>
    )
}

const useOrderContext = () => {
    return useContext(OrderContext)
}

export { useOrderContext, OrderContext, OrderProvider}