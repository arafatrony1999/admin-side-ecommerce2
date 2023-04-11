const SubCatagoryReducer = (state, action) => {

    if(action.type==="API_DATA"){
        return{
            ...state,
            all_sub_catagory: action.payload
        }
    }

    return state;
}

export default SubCatagoryReducer