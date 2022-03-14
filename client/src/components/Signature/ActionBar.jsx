import React from "react"
import { Button, Typography } from "@mui/material"
import SaveAlt from "@mui/icons-material/SaveAlt"
import { triggerBase64Download } from "react-base64-downloader"
import { saveAs } from "file-saver"
import mergeImages from "merge-base64"

export default function ActionBar({ image, svg, infoBase64 }) {
    const handleDownloadSvg = () => {
        const file = new Blob([svg], { type: "image/svg+xml" })
        saveAs(file, "signature")
    }

    const handleDownloadPng = async () => {
        const mergedImage = await mergeImages([image.split(",")[1], infoBase64.split(",")[1]])
        triggerBase64Download(mergedImage, "signature")
    }

    return (
        <>
            <Button size="small" onClick={handleDownloadPng}>
                <SaveAlt />
                <Typography ml={1} variant="subtitle1">PNG</Typography>
            </Button>
            <Button size="small" onClick={handleDownloadSvg}>
                <SaveAlt />
                <Typography ml={1} variant="subtitle1">SVG</Typography>
            </Button>
        </>
    )
}
