import React, { useState, createRef } from "react"
import { Box, Stack, Typography } from "@mui/material"

import Canvas from "./Canvas"
import ToolBar from "./ToolBar"
import AddSignature from "../AddSignature"

export default function SignBoard() {
    const canvas = createRef()

    const [ isAddFormOpen, setIsAddFormOpen ] = useState(false)
    const [ initialVal, setInitialVal ] = useState({ image: "", svg: "", createdAt: "" })

    return (
        <Stack id="signboard" alignItems="center" pt={7} m={0} sx={{ marginLeft: { lg: "0", xl: "14vw" } }}>
            <Typography 
                variant="h5" 
                fontWeight="bold"
                color="primary"
                sx={{ margin: "1rem 0 2rem 0" }}
            >
                Sign Here
            </Typography>
            <Box
                sx={{ 
                    // border: '0.25rem solid', 
                    // borderColor: blue[800],
                    borderRadius: "0.25rem", 
                    height: "58vh", 
                    width: { xs: "100%", sm: "90%", lg: "50vw" }, 
                    margin: { sm: "auto", lg: "0" },
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
