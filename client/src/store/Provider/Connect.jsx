import React, { createContext, useContext, useReducer } from 'react'
import initialState from '../state/initialState'
import rootreducer from '../reducers/root.reducer'

const Store = createContext()

export const useStore = () => useContext(Store)

function Connect({ children }) {

    const [state, dispatch] = useReducer(rootreducer, initialState)

    const getState = () => state

    const dispatcher = {

        setBoards: payload => dispatch(payload),
        setCurrent: payload => dispatch(payload)
    }

    return (
        <Store.Provider value={{ dispatcher, getState }}>
            {children}
        </Store.Provider>
    )
}

export default Connect