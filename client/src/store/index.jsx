
/* 
    STORE PROVIDER

    - Authenticates user
    - provides state and setState to children
*/


import { useContext, createContext, useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { AUTHENTICATE } from "../graphql/queries/userQueries";

const Context = createContext();

export function StoreProvider({ children }) {
    
    const { data: userData } = useQuery(AUTHENTICATE);
    
    const initialState = {
        user: null,
        loading: true
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (userData) {
            setState(prevState => ({
                ...prevState,
                user: userData.authenticate
            }));
        }
    }, [userData]);

    return (
        <Context.Provider value={{ state, setState }}>
            {children}
        </Context.Provider>
    );
}

export const useStore = () => useContext(Context);