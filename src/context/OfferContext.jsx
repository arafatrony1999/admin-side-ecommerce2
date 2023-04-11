import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/OfferReducer';
import axios from '../axios';

const OfferContext = createContext();

const initialState = {
    all_offers: []
}

const OfferProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const getOffers = async () => {
        try{
            const res = await axios.get('/getOffers')
            dispatch({type: 'API_DATA', payload: res.data})
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getOffers()
    }, [])

    return(
        <OfferContext.Provider value={{...state}}>
            {children}
        </OfferContext.Provider>
    )
}

const useOfferContext = () => {
    return useContext(OfferContext)
}

export { useOfferContext, OfferContext, OfferProvider }