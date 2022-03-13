import React, { useState, createRef } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

import Canvas from "./Canvas"
import ToolBar from "./ToolBar"
import AddSignature from "../AddSignature"

export default function SignBoard() {
    const canvas = createRef()

    const [ isAddFormOpen, setIsAddFormOpen ] = useState(false)
    const [ initialVal, setInitialVal ] = useState({ image: "", createdAt: "" })

    return (
        <Stack alignItems="center" mt={12} ml={0} px={2}>
            <Typography 
                variant="h5" 
                fontWeight="bold"
                color="primary"
                sx={{ marginLeft: {sm: "0", lg: "12vw"}, marginBottom: "2rem" }}
            >
                Sign Here
            </Typography>
            <Box
                sx={{ 
                    border: '0.25rem solid', 
                    borderColor: grey[400],
                    borderRadius: '0.25rem', 
                    height: "55vh", 
                    width: {sm: "95%", lg: "50vw"}, 
                    margin: {sm: "auto", lg: "auto 0 auto 12vw"},
                }}
            >
                <Canvas canvas={canvas} />

                <ToolBar 
                    canvas={canvas} 
                    setIsAddFormOpen={setIsAddFormOpen}
                    setInitialVal={setInitialVal}
                />

                <AddSignature 
                    isAddFormOpen={isAddFormOpen}
                    setIsAddFormOpen={setIsAddFormOpen}
                    initialVal={initialVal}
                    setInitialVal={setInitialVal}
                />
            </Box>
        </Stack>
    )
}
