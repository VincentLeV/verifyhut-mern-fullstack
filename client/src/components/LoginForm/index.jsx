import React, { useState } from "react"
import {
    Box,
    TextField,
    Button,
    FormControl,
    Typography
} from "@mui/material"
import { red } from '@mui/material/colors'
import { useNavigate } from "react-router-dom"

import Axios from "../../services/axios"
import { useUser } from "../../context/UserContext"
import { storeDataLS } from "../../utils/helpers"

export default function LoginForm() {
    const navigate = useNavigate()
    const { setUser } = useUser()
    const [ values, setValues ] = useState({ username: "", password: "" })
    const [ errMsg, setErrMsg ] = useState("")

    const inputChanged = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { passwordHash, ...data } = await Axios.login(values)
            storeDataLS("auth-token", data.token)
            setUser({
                ...data,
                isLoggedIn: true
            })
            setValues({ username: "", password: "" })
            navigate("/home")
        } catch(err) {
            setValues({ username: values.username, password: "" })
            setErrMsg(err?.response?.data?.message)
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
