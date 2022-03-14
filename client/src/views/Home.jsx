import React, { useState } from "react"
import { Box } from "@mui/material"

import NavBar from "../components/Navbar"
import SignBoard from "../components/SignBoard"
import Signature from "../components/Signature"

export default function Home() {
    const [ showSignBoard, setShowSignBoard ] = useState(true)

    return (
        <Box>
            <NavBar setShowSignBoard={setShowSignBoard} />

            { 
                showSignBoard 
                    ? <SignBoard /> 
                    : <Signature setShowSignBoard={setShowSignBoard} />
            }
        </Box>
    )
}
