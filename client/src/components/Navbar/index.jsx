import React, { useState } from "react"
import { 
    SwipeableDrawer,
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Stack,
    Divider
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import useMediaQuery from '@mui/material/useMediaQuery'

import Content from "./Content"
import AppLogo from "../AppLogo"

export default function Navbar({ setShowSignBoard }) {
    const matches = useMediaQuery('(min-width: 1024px)')
    const [ isOpen, setIsOpen ] = useState(matches ? false : true)

    const toggleNavbar = (e) => {
        if (
            e &&
            e.type === 'keydown' &&
            (e.key === 'Tab' || e.key === 'Shift')
        ) {
            return
        }

        setIsOpen(false)
    }

    return (
        <Box sx={{ display: "flex", position: "absolute", minHeight: "100vh", maxHeight: "100vh" }}>
            <AppBar 
                position="fixed" 
                open={isOpen} 
                sx={{ background: "transparent", boxShadow: "none" }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open navbar"
                        onClick={() => setIsOpen(true)}
                        edge="start"
                        sx={{ mr: 2, ml: 0.2, ...(isOpen && { display: 'none' }), display: matches && "none" }}
                    >
                        <MenuIcon color="primary" fontSize="large" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box>
                <SwipeableDrawer
                    variant="persistent"
                    anchor="left"
                    open={isOpen}
                    onClose={() => setIsOpen(true)}
                    onOpen={() => setIsOpen(true)}
                    
                >
                    { 
                        matches &&  
                        <Stack sx={{ height: "8vh", maxHeight: "8vh" }} >
                            <AppLogo width={"2.5rem"} margin={"auto"} padding={"1rem 0"} />
                        </Stack>
                    }

                    <Stack direction="row" 
                        alignItems="center" 
                        justifyContent="space-between" 
                        pl={2} 
                        pr={1} 
                        sx={{ display: matches && "none", height: "7vh", maxHeight: "7vh" }}
                    >
                        <AppLogo width={"2.5rem"} margin={"0"} padding={"0"} />
                        <Box sx={{ textAlign: "right" }} py={1}>
                            <IconButton onClick={toggleNavbar}>
                                <ChevronLeftIcon fontSize="large" color="primary" sx={{ display: matches && "none" }} />
                            </IconButton>
                        </Box>
                    </Stack>
                    { !matches && <Divider /> }

                    <Content setShowSignBoard={setShowSignBoard} setIsOpen={setIsOpen} />
                </SwipeableDrawer>
            </Box>
        </Box>
    )
}
