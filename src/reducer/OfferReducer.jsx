const OfferReducer = (state, action) => {

    if(action.type==="API_DATA"){
        return{
            ...state,
            all_offers: action.payload
        }
    }

    return state;
}

export default OfferReducer