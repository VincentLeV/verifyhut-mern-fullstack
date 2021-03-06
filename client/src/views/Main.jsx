import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getDataLS, parseToken } from "../utils/helpers"
import { useUser } from "../context/UserContext"
import Axios from "../services/axios"
import { useToast } from "../context/ToastContext"
import { useCategories } from "../context/CategoryContext"
import { useSignatures } from "../context/SignatureContext"

import Home from "./Home"
import Spinner from "../components/Spinner"

export default function Main() {
    const navigate = useNavigate()
    const { setUser } = useUser()
    const { setToast } = useToast()
    const { setCategories } = useCategories()
    const { setUncategorized, setSignatures } = useSignatures()
    const [ loading, setLoading ] = useState(false)

    const checkLogin = async () => {
        const storedUser = getDataLS("auth-token")
        if (storedUser) {
            const decodedToken = parseToken(storedUser)
            if (decodedToken?.exp * 1000 < Date.now()) {
                setUser({ isLoggedIn: false, token: null })
                navigate("/")
                setToast({ 
                    isOpen: true, 
                    msg: "You session has expired. Please login again!", 
                    severity: "warning" 
                })
                localStorage.clear()
            } else if (decodedToken?.exp * 1000 >= Date.now()) {
                navigate("/home")
                setLoading(true)
                try {
                    const data = await Axios.getUser(decodedToken?.id)
                    delete data.passwordHash
                    setUser({ ...data, isLoggedIn: true })
                    const userCategories = await Axios.getUserCategories(data?.id)
                    const uncategorized = await Axios.getUncategorized(data?.id)
                    setCategories(userCategories)
                    setUncategorized(uncategorized)
                    setSignatures(data.signatures)
                    setLoading(false)
                } catch (err) {
                    setLoading(false)
                    navigate("/")
                    localStorage.clear()
                }
            } else {
                navigate("/")
            }
        }
    }

    useEffect(() => {
        checkLogin()
        return () => {
            setLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main>
            <Home />

            {loading && <Spinner />}
        </main>
    )
}
