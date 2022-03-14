import React from "react"
import { Stack, Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import CircularProgress from "@mui/material/CircularProgress"

export default function Spinner() {
    return (
        <Stack 
            alignItems="center" 
            justifyContent="center" 
            sx={{ position: "absolute", zIndex: 1000, inset: 0 }}
        >
            <Box sx={{ position: "absolute", inset: 0, background: grey[200], opacity: 0.3 }} />
            <CircularProgress />
        </Stack>
    )
}
