import React from "react"
import { Box } from "@mui/material"
import { useSignatures } from "../../../context/SignatureContext"

import SignatureBar from "../SignatureBar"

export default function Uncategorized({ setShowSignBoard, setIsOpen }) {
    const { uncategorized } = useSignatures()

    return (
        <Box my={2} sx={{ overflow: "auto", maxHeight: "20vh" }}>
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
