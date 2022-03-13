import React from "react"
import { Stack, Button } from "@mui/material"
// import { useSignatures } from "../../context/SignatureContext"

export default function Signature({ setShowSignBoard }) {
    // const { signature } = useSignatures()

    return (
        <Stack alignItems="center" sx={{ height: "100vh" }} mt={10} ml={10}>
            <p>Signature</p>
            <Button 
                onClick={() => setShowSignBoard(true)}
            >
                Start Signing
            </Button>
        </Stack>
    )
}
