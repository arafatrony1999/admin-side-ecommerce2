import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/UserReducer'
import axios from "../axios";

const UserContext = createContext();

const initialState = {
    all_users: [],
    authenticated: false,
    loading: true,
    user: {},
    role: null,
    userID: null,
    incorrect: false,
    correct: false
}

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const getUser = async () => {
        const localAuth = localStorage.getItem("auth");
        const userAuth = JSON.parse(localAuth);
        if(userAuth !== null){
            const formData = new FormData();
            formData.append('auth', userAuth.auth)
            try{
                axios.post('/getUser', formData)
                .then((res) => {
                    dispatch({type: "USER_DATA", payload: res.data})
                })

            }
            catch(error){
                dispatch({type: "API_ERROR"});
            }

        }else{
            dispatch({type: "NO_USER_FOUND"})
        }
    }

    useEffect(() => {
        getUser()
    }, [state.incorrect, state.correct]);

    const getUsers = async () => {
        try{
            const res = await axios.get('/getUsers')
            dispatch({type: 'API_DATA', payload: res.data})
        }
        catch(error){
            console.log(error)
        }
    }

    const logout = () => {
        localStorage.removeItem("auth");
        getUser()
        window.location.reload()
    }

    useEffect(() => {
        getUsers()
    }, [])

    return(
        <UserContext.Provider value={{...state, getUsers, getUser, logout}}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    return useContext(UserContext)
}

export {useUserContext, UserContext, UserProvider}