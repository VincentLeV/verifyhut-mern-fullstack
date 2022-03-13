import React, { useState, createContext, useContext } from "react"

const SignatureContext = createContext()

export const useSignatures = () => useContext(SignatureContext)

export default function CategoryProvider({ children }) {
    const [ signatures, setSignatures ] = useState([])
    const [ uncategorized, setUncategorized ] = useState([])
    const [ signature, setSignature ] = useState({})

    return (
        <SignatureContext.Provider 
            value={{ signatures, setSignatures, signature, setSignature, uncategorized, setUncategorized }}
        >
            {children}
        </SignatureContext.Provider>
    )
}