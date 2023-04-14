const UserReducer = (state, action) => {
    if(action.type === 'API_DATA'){
        return{
            ...state,
            all_users: action.payload
        }
    }
}

export default UserReducer