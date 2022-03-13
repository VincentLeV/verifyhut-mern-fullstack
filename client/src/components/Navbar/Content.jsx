import React from "react"
import { 
    Box, 
    Divider
} from "@mui/material"

import Categories from "./Categories"
import UserBar from "./UserBar"
import Uncategorized from "./Uncategorized"

export default function Content({ setShowSignBoard,setIsOpen }) {

    return (
        <Box
            role="presentation"
            minWidth={280}
            pt={0.8}
        >
            <Box px={2} sx={{ overflow: 'auto', minHeight: "60vh", maxHeight: "70vh" }}>
                <Categories setShowSignBoard={setShowSignBoard} setIsOpen={setIsOpen} />
                <Uncategorized setShowSignBoard={setShowSignBoard} setIsOpen={setIsOpen} />
            </Box>
            <Divider />
            <UserBar />
        </Box>
    )
}
