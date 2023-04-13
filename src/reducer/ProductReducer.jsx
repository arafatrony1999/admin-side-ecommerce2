const ProductReducer = (state, action) => {
    if(action.type === 'API_DATA'){
        return{
            ...state,
            all_products: action.payload
        }
    }
}

export default ProductReducer
