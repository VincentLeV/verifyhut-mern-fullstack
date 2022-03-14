import React, { useState } from "react"
import {
    Box,
    TextField,
    Button,
    FormControl
} from "@mui/material"
import Axios from "../../services/axios"
import { useToast } from "../../context/ToastContext"

import Spinner from "../Spinner"

export default function SignUpForm({ setShowSignUpForm }) {
    const { setToast } = useToast()
    const [ values, setValues ] = useState({ username: "", name: "", password: "" })
    const [ validation, setValidation ] = useState({ input: "", msg: "" })
    const [ loading, setLoading ] = useState(false)

    const inputChanged = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSignUp = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            await Axios.createUser(values)
            setValues({ username: "", name: "", password: "" })
            setTimeout(() => {
                setLoading(false)
                setShowSignUpForm(false)
                setToast({ isOpen: true, msg: "Successfully created a new user!" })
            }, 1000)
        } catch (err) {
            if (values.password === "") {
                setValidation({ input: "password", msg: "Password is required" })
            } else if (err?.response?.data?.message?.includes("Password")) {
                setValidation({ input: "password", msg: err?.response?.data?.message })
            } else if (err?.response?.data?.message?.includes("username")) {
                setValidation({ input: "username", msg: "Username is required" })
            }
        }
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { width: "100%" },  
                width: { sm: "100%", md: "40%" },
                margin: "1rem auto 0.5rem auto"
            }}
            p={3}
            autoComplete="off"
            onSubmit={handleSignUp}
        >
            {loading && <Spinner />}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    autoComplete="off"
                    name="name"
                    label="Full Name"
                    value={values.name}
                    size="small"
                    onChange={inputChanged}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    required
                    autoComplete="off"
                    error={validation.input === "username" ? true : false}
                    name="username"
                    label="Username"
                    value={values.username}
                    size="small"
                    helperText={validation.input === "username" ? validation.msg : ""}
                    onChange={inputChanged}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    required
                    error={validation.input === "password" ? true : false}
                    type="password"
                    name="password"
                    label="Password"
                    value={values.password}
                    size="small"
                    helperText={validation.input === "password" ? validation.msg : ""}
                    onChange={inputChanged}
                />
            </FormControl>
            
            <Button 
                variant="contained"
                fullWidth
                type="submit"
                onClick={handleSignUp}
            >
                Sign Up
            </Button>
        </Box>
    )
}
