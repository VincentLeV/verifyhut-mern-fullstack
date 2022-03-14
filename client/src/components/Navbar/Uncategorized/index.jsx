import React from "react"
import { Stack, Typography } from "@mui/material"
import { useSignatures } from "../../../context/SignatureContext"

import SignatureBar from "../SignatureBar"

export default function Uncategorized({ setShowSignBoard, setIsOpen }) {
    const { uncategorized } = useSignatures()

    return (
        <Stack my={2} alignItems="center" sx={{ overflow: "auto", maxHeight: "20vh" }}>
            {uncategorized?.length === 0 && <Typography variant="body">No Uncategorized Signature</Typography>}
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
