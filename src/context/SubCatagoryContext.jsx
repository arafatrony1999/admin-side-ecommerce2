import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/SubCatagoryReducer';
import axios from '../axios';

const SubCatagoryContext = createContext();

const initialState = {
    all_sub_catagory: []
}

const SubCatagoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    
    const getSubCatagory = async () => {
        try{
            const res = await axios.get('/getSubCatagories')
            dispatch({type: 'API_DATA', payload: res.data})
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getSubCatagory()
    }, [])

    return(
        <SubCatagoryContext.Provider value={{...state, getSubCatagory}}>
            {children}
        </SubCatagoryContext.Provider>
    )
}

const useSubCatagoryContext = () => {
    return useContext(SubCatagoryContext)
}

export { useSubCatagoryContext, SubCatagoryContext, SubCatagoryProvider}