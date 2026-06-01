import React from 'react'
import { useState, useEffect } from 'react'

const Context = React.createContext({
    item : [],
    addItem : () => {},
    removeItem : () => {}
})


const ContextProvider = ({children}) => {
    const [item, setItem] = useState(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('bookmarks', JSON.stringify(item));
    }, [item]);

    const addItem = (data) => {
        setItem([...item, data])
    }
    const removeItem = (id) => {
        setItem(item.filter((i) => i.id !== id))
    }

    return (
        <Context.Provider value={{ item, addItem, removeItem }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }