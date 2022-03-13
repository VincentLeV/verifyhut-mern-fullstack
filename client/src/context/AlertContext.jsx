import React, { useState, useEffect, createContext, useContext } from "react"

const AlertContext = createContext()

export const useAlert = () => {
    const [ alert, setAlert ] = useContext(AlertContext)
    const [ needsCleanup, setNeedsCleanup ] = useState(false)

    const isConfirmed = (title, content, color) => {
        setNeedsCleanup(true)
        
        const promise = new Promise((resolve, reject) => {
            setAlert({
                title,
                content,
                color,
                isOpen: true,
                proceed: resolve,
                cancel: reject
            })
        })

        return promise.then(
            () => { 
                setAlert({ ...alert, isOpen: false });
                return true;
            },
            () => {
                setAlert({ ...alert, isOpen: false });
                return false;
            }
        )
    }

    useEffect(() => {
        return () => {
            if (alert.cancel && needsCleanup) {
                alert.cancel()
            }
        }
    }, [alert, needsCleanup])

    return {
        alert,
        isConfirmed
    }
}

export default function AlertProvider({ children }) {
    const [ alert, setAlert ] = useState({ 
        isOpen: false,
        proceed: null,
        cancel: null,
        title: "",
        content: "", 
        color: "red"
    })

    return (
        <AlertContext.Provider value={[ alert, setAlert ]}>
            {children}
        </AlertContext.Provider>
    )
}