import React from "react"
import { Stack } from "@mui/material"
import { useSignatures } from "../../../context/SignatureContext"

import SignatureBar from "../SignatureBar"

export default function Uncategorized({ setShowSignBoard, setIsOpen }) {
    const { uncategorized } = useSignatures()

    return (
        <Stack my={2} alignItems="center" sx={{ overflow: "auto", maxHeight: "20vh" }}>
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
        </Stack>
        
    )
}
