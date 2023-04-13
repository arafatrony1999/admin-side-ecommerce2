import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/ProductReducer';
import axios from "../axios";

const ProductContext = createContext();

const initialState = {
    all_products: []
}

const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const getProducts = async () => {
        try{
            const res = await axios.get('/getProduct')
            dispatch({type: 'API_DATA', payload: res.data})
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])


    return(
        <ProductContext.Provider value={{...state, getProducts}}>
            {children}
        </ProductContext.Provider>
    )
}

const useProductContext = () => {
    return useContext(ProductContext)
}

export {useProductContext, ProductContext, ProductProvider}