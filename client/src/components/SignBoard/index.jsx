import React, { useState, createRef } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

import Canvas from "./Canvas"
import ToolBar from "./ToolBar"
import AddSignature from "../AddSignature"

export default function SignBoard() {
    const canvas = createRef()

    const [ isAddFormOpen, setIsAddFormOpen ] = useState(false)
    const [ initialVal, setInitialVal ] = useState({ image: "", svg: "", createdAt: "" })

    return (
        <Stack alignItems="center" pt={7} m={0} height="90vh">
            <Typography 
                variant="h5" 
                fontWeight="bold"
                color="primary"
                sx={{ marginLeft: 0, marginBottom: "2rem" }}
            >
                Sign Here
            </Typography>
            <Box
                sx={{ 
                    border: '0.25rem solid', 
                    borderColor: grey[400],
                    borderRadius: '0.25rem', 
                    height: "60vh", 
                    width: {sm: "100%", lg: "50vw"}, 
                    margin: {sm: "auto", lg: "0"},
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
