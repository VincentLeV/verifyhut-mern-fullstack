import React from "react"
import { Box, Stack, Typography } from "@mui/material"
import { useSignatures } from "../../../context/SignatureContext"

import SignatureBar from "../SignatureBar"

export default function Uncategorized({ setShowSignBoard }) {
    const { uncategorized } = useSignatures()

    return (
        <Box mt={2}>
            <Typography variant="body" color="primary" fontWeight="bold">Uncategorized</Typography>
            <Stack mt={2}>
                {
                    uncategorized?.map((sig, i) => (
                        <SignatureBar key={i} signature={sig} setShowSignBoard={setShowSignBoard} />
                    ))
                }
            </Stack>
        </Box>
        
    )
}
