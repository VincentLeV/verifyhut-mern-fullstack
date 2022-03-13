import React, { useState } from "react"
import { Box } from "@mui/material"

import NavBar from "../components/Navbar"
import SignBoard from "../components/SignBoard"
import Signature from "../components/Signature"

export default function Home() {
    const [ showSignBoard, setShowSignBoard ] = useState(true)
    console.log(showSignBoard)
    return (
        <Box>
            <NavBar setShowSignBoard={setShowSignBoard} />
            
            {/* {
                !showSignBoard &&
                <Button 
                    sx={{ position: "absolute", top: "45%", left: "50%" }}
                    onClick={() => setShowSignBoard(true)}
                >
                    Start Signing
                </Button>
            } */}

            { 
                showSignBoard 
                ? <SignBoard /> 
                : <Signature setShowSignBoard={setShowSignBoard} />
            }
        </Box>
    )
}
