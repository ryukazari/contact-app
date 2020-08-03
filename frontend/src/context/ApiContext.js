import React, { useState, useEffect, createContext, useMemo, useContext } from 'react';
import Axios from 'axios';

const ApiContext = createContext();

export function ApiProvider(props) {
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        getTipos();
    }, []);

    async function getTipos(){
        const tipos = await Axios.get("http://127.0.0.1:3003/api/types");
        setTipos(tipos.data.data);
    }
    const value = useMemo(() => {
        return({
            tipos,
            getTipos,
        })
    }, [tipos]);

    return <ApiContext.Provider value={value} {...props} />
}

export function useApiContext(){
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error ('useApiContext debe estar dentro del proveedor ApiContext');
    }
    return context;
}