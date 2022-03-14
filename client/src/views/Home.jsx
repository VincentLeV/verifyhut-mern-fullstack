import React, { useState } from "react"
import { Container } from "@mui/material"

import NavBar from "../components/Navbar"
import SignBoard from "../components/SignBoard"
import Signature from "../components/Signature"

export default function Home() {
    const [ showSignBoard, setShowSignBoard ] = useState(true)

    return (
        <Container>
            <NavBar setShowSignBoard={setShowSignBoard} />

            { 
                showSignBoard 
                ? <SignBoard /> 
                : <Signature setShowSignBoard={setShowSignBoard} />
            }
        </Container>
    )
}
