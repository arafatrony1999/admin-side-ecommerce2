import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/UserReducer'
import axios from "../axios";

const UserContext = createContext();

const initialState = {
    all_users: []
}

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const getUsers = async () => {
        try{
            const res = await axios.get('/getUsers')
            dispatch({type: 'API_DATA', payload: res.data})
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return(
        <UserContext.Provider value={{...state, getUsers}}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(UserContext)
}

export {useUserContext, UserContext, UserProvider}