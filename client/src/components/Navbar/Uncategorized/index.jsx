import React from "react"
import { Box } from "@mui/material"
import { useSignatures } from "../../../context/SignatureContext"

import SignatureBar from "../SignatureBar"

export default function Uncategorized({ setShowSignBoard, setIsOpen }) {
    const { uncategorized } = useSignatures()

    return (
        <Box mt={2} sx={{ overflowY: "auto", maxHeight: "25vh", minHeight: "25vh"}}>
            {
                uncategorized?.map((sig, i) => (
                    <SignatureBar 
                        key={i} 
                        signature={sig} 
                        setShowSignBoard={setShowSignBoard} 
                        setIsOpen={setIsOpen} 
                    />
                ))
            }
        </Box>
        
    )
}
