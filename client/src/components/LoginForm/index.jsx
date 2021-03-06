import React, { useState } from "react"
import {
    Box,
    TextField,
    Button,
    FormControl,
    Typography,
} from "@mui/material"
import { red } from "@mui/material/colors"
import { useNavigate } from "react-router-dom"

import Axios from "../../services/axios"
import { useUser } from "../../context/UserContext"
import { storeDataLS } from "../../utils/helpers"

export default function LoginForm({ setLoading }) {
    const navigate = useNavigate()
    const { setUser } = useUser()
    const [ values, setValues ] = useState({ username: "", password: "" })
    const [ errMsg, setErrMsg ] = useState("")

    const inputChanged = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const data = await Axios.login(values)
            delete data.passwordHash
            storeDataLS("auth-token", data.token)
            setTimeout(() => {
                setUser({
                    ...data,
                    isLoggedIn: true
                })
                setLoading(false)
                setValues({ username: "", password: "" })
                navigate("/home")
            }, 700)
        } catch(err) {
            setLoading(false)
            setValues({ username: values.username, password: "" })
            setErrMsg(err?.response?.data?.message)
        }
    }

    return (
        <Box
            component="form"
            id="login-form"
            sx={{
                "& .MuiTextField-root": { width: "100%" },  
                width: { sm: "100%", md: "40%" },
                margin: "1rem auto 0.5rem auto",
            }}
            p={3}
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
        >
            <Typography 
                variant="subtitle2"
                mb={2}
                color={red[700]}
            >
                {errMsg}
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    required
                    autoComplete="off"
                    name="username"
                    label="Username"
                    value={values.username}
                    size="small"
                    onChange={inputChanged}
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                    required
                    type="password"
                    name="password"
                    label="Password"
                    value={values.password}
                    size="small"
                    onChange={inputChanged}
                />
            </FormControl>
            
            <Button 
                id="login-btn"
                variant="contained"
                fullWidth
                type="submit"
                onClick={handleLogin}
            >
                Login
            </Button>
        </Box>
    )
}
