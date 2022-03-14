import React, { useState } from "react"
import { 
    Drawer,
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Stack,
    Divider
} from "@mui/material"
import { grey } from "@mui/material/colors"
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
        <Box sx={{ display: 'flex' }}>
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
                        sx={{ ...(isOpen && { display: 'none' }), display: matches && "none" }}
                    >
                        <MenuIcon color="primary" fontSize="large" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                }}
                variant="persistent"
                open={isOpen}
            >
                { 
                    matches &&  
                    <Stack sx={{ height: "8vh", maxHeight: "8vh" }}>
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
            </Drawer>

            {/* {
                isOpen &&
                <Box
                    position="fixed"
                    top={0}
                    bottom={0}
                    left={0}
                    // variant="persistent"
                    // anchor="left"
                    // open={isOpen}
                    // onClose={() => setIsOpen(true)}
                    // onOpen={() => setIsOpen(true)}
                    sx={{ background: "white", border: "1px solid", borderColor: grey[200]  }}
                >
                    { 
                        matches &&  
                        <Stack sx={{ height: "8vh", maxHeight: "8vh" }}>
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
                </Box>
            } */}
        </Box>
    )
}
