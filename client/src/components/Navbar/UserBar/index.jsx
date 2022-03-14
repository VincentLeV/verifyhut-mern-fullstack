import React from "react"
import { useNavigate } from "react-router-dom"
import { Stack, Avatar, Tooltip, IconButton } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import { randomColorAvatar } from "../../../utils/helpers"
import { useUser } from "../../../context/UserContext"
import { useToast } from "../../../context/ToastContext"
import { useCategories } from "../../../context/CategoryContext"

export default function UserBar() {
    const navigate = useNavigate()
    const { user, setUser } = useUser()
    const { setCategories } = useCategories()
    const { setToast } = useToast()

    const handleLogout = () => {
        setUser({ isLoggedIn: false, token: null })
        setCategories([])
        navigate("/")
        setToast({ 
            isOpen: true, 
            msg: "Logout successfully. See you again!", 
            severity: "success" 
        })
    }

    return (
        <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center"
            px={5}
            sx={{ height: "8vh", maxHeight: "8vh" }}
        >
            <Avatar {...randomColorAvatar(user.name)} />
            <IconButton 
                size="small" 
                color="primary"
                onClick={handleLogout}
            >
                <Tooltip title="Logout">
                <LogoutIcon onClick={handleLogout} sx={{ margin: "0 0.3rem" }} />
                </Tooltip>
            </IconButton>
        </Stack>
    )
}
