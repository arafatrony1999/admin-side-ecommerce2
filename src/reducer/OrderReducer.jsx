const OrderReducer = (state, action) => {
    if(action.type === 'INITIAL_DISPATCH'){
        return{
            ...state,
            loading: true
        }
    }

    if(action.type === 'API_DATA'){
        return{
            ...state,
            loading: false,
            orders: action.payload,
            filteredOrders: action.payload
        }
    }

    return state
}

export default OrderReducer