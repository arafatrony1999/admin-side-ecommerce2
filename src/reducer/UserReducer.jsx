const UserReducer = (state, action) => {
    if(action.type === 'API_DATA'){
        return{
            ...state,
            all_users: action.payload
        }
    }

    if(action.type === "USER_DATA"){
        return{
            ...state,
            loading: false,
            user: action.payload[0],
            authenticated: action.payload.length === 0 ? false : true
        }
    }

    if(action.type === "NO_USER_FOUND"){
        return{
            ...state,
            loading: false,
            user: {},
            authenticated: false
        }
    }
}

export default UserReducer