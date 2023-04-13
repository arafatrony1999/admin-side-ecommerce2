import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/ProductReducer';
import axios from "../axios";

const ProductContext = createContext();

const initialState = {
    all_products: []
}

const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const getData = async () => {
        try{
            const res = await axios.get('/getProduct')
            dispatch({type: 'API_DATA', payload: res.data})
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return(
        <ProductContext.Provider value={{...state}}>
            {children}
        </ProductContext.Provider>
    )
}

const useProductContext = () => {
    return useContext(ProductContext)
}

export {useProductContext, ProductContext, ProductProvider}