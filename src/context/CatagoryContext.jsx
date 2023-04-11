import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/CatagoryReducer';
import axios from '../axios';

const CatagoryContext = createContext();

const initialState = {
    all_catagory: []
}

const CatagoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    
    const getCatagory = async () => {
        try{
            const res = await axios.get('/getCatagories')
            dispatch({type: 'API_DATA', payload: res.data})
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getCatagory()
    }, [])

    return(
        <CatagoryContext.Provider value={{...state, getCatagory}}>
            {children}
        </CatagoryContext.Provider>
    )
}

const useCatagoryContext = () => {
    return useContext(CatagoryContext)
}

export { useCatagoryContext, CatagoryContext, CatagoryProvider}