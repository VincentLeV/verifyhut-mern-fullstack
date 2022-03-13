import React from "react"
import { Button, Toolbar, ButtonGroup } from "@mui/material"
import Undo from "@mui/icons-material/Undo"
import Redo from "@mui/icons-material/Redo"
// import ImportExport from "@mui/icons-material/ImportExport"
// import IosShare from "@mui/icons-material/IosShare"
// import Image from "@mui/icons-material/Image"
// import Backspace from "@mui/icons-material/Backspace"
import Clear from "@mui/icons-material/Clear"
import Save from "@mui/icons-material/Save"
import { triggerBase64Download } from 'react-base64-downloader'
import { saveAs } from "file-saver"

export default function ToolBar({ canvas, setIsAddFormOpen, setInitialVal }) {
    const handleExportPng = async () => {
        const data = await canvas.current.exportImage("png")
        triggerBase64Download(data, 'signature')
    }

    const handleExportSvg = async () => {
        const data = await canvas.current.exportSvg()
        const file = new Blob([data], {type: "image/svg+xml"})
        saveAs(file, "signature")
    }

    const openAddSignatureDialog = async () => {
        const signTimestamps = Date.now()
        const png = await canvas.current.exportImage("png")
        const svg = await canvas.current.exportSvg()
        setInitialVal({ image: png, svg: svg, createdAt: signTimestamps })
        setIsAddFormOpen(true)
    }

    return (
        <Toolbar>
            <ButtonGroup size="small" sx={{ margin: "auto" }}>
                <Button key={1} onClick={() => console.log(canvas.current)}>Show</Button>
                <Button key={2} onClick={() => canvas.current.undo()}>
                    <Undo />
                </Button>
                <Button key={3} onClick={() => canvas.current.redo()}>
                    <Redo />
                </Button>
                <Button key={6} onClick={openAddSignatureDialog}>
                    <Save />
                </Button>
                <Button key={4} onClick={handleExportPng}>
                    PNG
                </Button>
                <Button key={5} onClick={handleExportSvg}>SVG</Button>
                <Button key={7} onClick={() => canvas.current.clearCanvas()}>
                    <Clear />
                </Button>
            </ButtonGroup>
        </Toolbar>
    )
}
