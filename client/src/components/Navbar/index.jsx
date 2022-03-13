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

    return (
        <Box sx={{ display: "flex" }}>
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

            <SwipeableDrawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                onClose={() => setIsOpen(true)}
                onOpen={() => setIsOpen(true)}
                
            >
                { matches && <AppLogo width={"2.5rem"} margin={"auto"} padding={"1rem 0"} /> }

                <Stack direction="row" 
                    alignItems="center" 
                    justifyContent="space-between" 
                    pl={2} 
                    pr={1} 
                    sx={{ display: matches && "none" }}
                >
                    <AppLogo width={"2.5rem"} margin={"auto"} padding={"0"} />
                    <Box sx={{ textAlign: "right" }} py={1}>
                        <IconButton onClick={() => setIsOpen(false)}>
                            <ChevronLeftIcon fontSize="large" color="primary" sx={{ display: matches && "none" }} />
                        </IconButton>
                    </Box>
                    <Divider />
                </Stack>

                <Content setShowSignBoard={setShowSignBoard} />
            </SwipeableDrawer>
        </Box>
    )
}
