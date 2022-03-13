import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getDataLS, parseToken } from "../utils/helpers"
import { useUser } from "../context/UserContext"
import Axios from "../services/axios"
import { useToast } from "../context/ToastContext"
import { useCategories } from "../context/CategoryContext"
import { useSignatures } from "../context/SignatureContext"

import Home from "./Home"

export default function Main() {
    const navigate = useNavigate()
    const { setUser } = useUser()
    const { setToast } = useToast()
    const { setCategories } = useCategories()
    const { setUncategorized, setSignatures } = useSignatures()

    const checkLogin = async () => {
        const storedUser = getDataLS("auth-token")
        if (storedUser) {
            const decodedToken = parseToken(storedUser)
            if (decodedToken.exp * 1000 < Date.now()) {
                setUser({ isLoggedIn: false, token: null })
                navigate("/")
                setToast({ 
                    isOpen: true, 
                    msg: "You session has expired. Please login again!", 
                    severity: "warning" 
                })
            } else {
                const { passwordHash, ...data } = await Axios.getUser(decodedToken.id)
                setUser({ ...data, isLoggedIn: true })
                const userCategories = await Axios.getUserCategories(data.id)
                const uncategorized = await Axios.getUncategorized()
                setCategories(userCategories)
                setUncategorized(uncategorized)
                setSignatures(data.signatures)

                // const temp = userCategories.findIndex(x => x.name === "Uncategorized")
                // if (temp === -1) {
                //     const c = await Axios.addCategory({ name: "Uncategorized" }, storedUser)
                //     setCategories([ ...userCategories, c ])
                // } else {
                //     setCategories(userCategories)
                // }
            }
        }
    }

    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <main>
            <Home />
        </main>
    )
}
