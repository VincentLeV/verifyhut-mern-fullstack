import React, { useState } from "react"
import { 
    Drawer,
    Box,
    AppBar,
    Toolbar,
    IconButton,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import useMediaQuery from "@mui/material/useMediaQuery"

import Content from "./Content"

export default function Navbar({ setShowSignBoard }) {
    const matches = useMediaQuery("(max-width: 1700px)")
    const bigScr = useMediaQuery("(min-width: 1701px)")
    const [ isOpen, setIsOpen ] = useState(matches ? false : true)

    const handleClickBackDrop = () => {
        setIsOpen(false)
    }

    return (
        <Box sx={{ display: "flex" }}>
            {
                isOpen &&
                <Box 
                    position="absolute" 
                    sx={{ inset: 10, display: bigScr && "none" }} 
                    onClick={handleClickBackDrop}
                    id="navbar-backdrop"
                />
            }

            <AppBar 
                position="fixed"
                open={isOpen} 
                sx={{ background: "transparent", boxShadow: "none" }}
            >
                <Toolbar>
                    <IconButton
                        id="hamburger"
                        color="inherit"
                        aria-label="open navbar"
                        onClick={() => setIsOpen(true)}
                        edge="start"
                        sx={{ ...(isOpen && { display: "none" }), display: bigScr && "none" }}
                    >
                        <MenuIcon color="primary" fontSize="large" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0
                }}
                variant="persistent"
                open={isOpen}
            >
                <Content setShowSignBoard={setShowSignBoard} setIsOpen={setIsOpen} />
            </Drawer>
        </Box>
    )
}
