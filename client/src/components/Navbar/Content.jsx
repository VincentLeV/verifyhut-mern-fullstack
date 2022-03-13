import React from "react"
import { 
    Box, 
    Divider
} from "@mui/material"

import Categories from "./Categories"
import UserBar from "./UserBar"
import Uncategorized from "./Uncategorized"

export default function Content({ setShowSignBoard }) {

    return (
        <Box
            role="presentation"
            minWidth={280}
            pt={0.8}
        >
            <Box px={2} sx={{ overflow: 'auto', maxHeight: "80vh", minHeight: "80vh" }}>
                <Categories setShowSignBoard={setShowSignBoard} />
                <Uncategorized setShowSignBoard={setShowSignBoard} />
            </Box>
            <Divider />
            <UserBar />
        </Box>
    )
}
