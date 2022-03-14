import React, { useState } from "react"
import { 
    Box, 
    Stack,
    Divider,
    IconButton,
    Typography
} from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import useMediaQuery from '@mui/material/useMediaQuery'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import Categories from "./Categories"
import UserBar from "./UserBar"
import Uncategorized from "./Uncategorized"
import AppLogo from "../AppLogo"

export default function Content({ setShowSignBoard, setIsOpen }) {
    const matches = useMediaQuery('(min-width: 1024px)')
    const [ isAddFormOpen, setIsAddFormOpen ] = useState(false)

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
        <Box
            role="presentation"
            minWidth={280}
            pt={0.8}
            sx={{ 
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "space-between",
                // display: "grid", 
                // grid: {sm: "1fr 0.2fr 8fr 0.2fr 1fr / 1fr", lg: "1fr 0.1f 6fr 10fr 0.1fr / 1fr"}, 
                maxHeight: "98vh",
            }}
        >
            { 
                matches &&  
                <Stack>
                    <AppLogo width={"2.5rem"} margin={"auto"} padding={"1rem 0"} />
                </Stack>
            }

            <Stack direction="row" 
                alignItems="center" 
                justifyContent="space-between" 
                pl={2} 
                pr={1} 
                sx={{ display: matches && "none" }}
            >
                <AppLogo width={"2.5rem"} margin={"0"} padding={"0"} />
                <Box sx={{ textAlign: "right" }} py={1}>
                    <IconButton onClick={toggleNavbar}>
                        <ChevronLeftIcon fontSize="large" color="primary" sx={{ display: matches && "none" }} />
                    </IconButton>
                </Box>
            </Stack>

            { !matches && <Divider /> }
            

            <Box px={2} sx={{ maxHeight: "65vh", minHeight: "65vh" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" pr={1} mb={2}>
                    <Typography variant="body" color="primary" fontWeight="bold">Categories</Typography>
                    <IconButton edge="end" aria-label="add" color="primary" onClick={() => setIsAddFormOpen(true)}>
                        <AddCircleIcon />
                    </IconButton>
                </Stack>

                <Categories 
                    setShowSignBoard={setShowSignBoard} 
                    setIsOpen={setIsOpen} 
                    isAddFormOpen={isAddFormOpen}
                    setIsAddFormOpen={setIsAddFormOpen}
                />
                
                <Typography variant="body" color="primary" fontWeight="bold">Uncategorized</Typography>
                <Uncategorized setShowSignBoard={setShowSignBoard} setIsOpen={setIsOpen} />
            </Box>

            <Box mt={1}>
                <Divider />
                <UserBar />
            </Box>
        </Box>
    )
}
