import React, { useState, createContext, useContext } from "react"

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export default function UserProvider({ children }) {
    const [ user, setUser ] = useState({})

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}