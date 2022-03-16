import React from "react"
import { Stack, Typography } from "@mui/material"
import { useSignatures } from "../../../context/SignatureContext"

import SignatureBar from "../SignatureBar"
import EditSignature from "../../EditSignature"

export default function Uncategorized({ 
    setShowSignBoard, 
    setIsOpen, 
    isEditSigOpen,
    setIsEditSigOpen,
    selectedSig,
    setSelectedSig,
    selectedCate,
    setSelectedCate
}) {
    const { uncategorized } = useSignatures()

    return (
        <Stack 
            id="uncategorized-signatures"
            my={2} 
            alignItems="center" 
            sx={{ overflow: "auto", maxHeight: "20vh" }}
        >
            {uncategorized?.length === 0 && <Typography variant="body">No Uncategorized Signature</Typography>}
            {
                uncategorized?.map((sig, i) => (
                    <SignatureBar 
                        key={i} 
                        signature={sig} 
                        setSelectedSig={setSelectedSig}
                        setShowSignBoard={setShowSignBoard} 
                        setIsOpen={setIsOpen} 
                        setIsEditSigOpen={setIsEditSigOpen}
                        setSelected={setSelectedCate}
                    />
                ))
            }

            { 
                isEditSigOpen && 
                <EditSignature 
                    signature={selectedSig}
                    isEditSigOpen={isEditSigOpen} 
                    setIsEditSigOpen={setIsEditSigOpen}
                    fromCategory={selectedCate}
                /> 
            }
        </Stack>
        
    )
}
