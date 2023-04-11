const CatagoryReducer = (state, action) => {

    if(action.type==="API_DATA"){
        return{
            ...state,
            all_catagory: action.payload
        }
    }

    return state;
}

export default CatagoryReducer