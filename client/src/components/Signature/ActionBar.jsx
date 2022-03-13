import React from "react"
import { Button, Typography } from "@mui/material"
import SaveAlt from "@mui/icons-material/SaveAlt"
import { triggerBase64Download } from 'react-base64-downloader'
import { saveAs } from "file-saver"

export default function ActionBar({ image, svg }) {
  const handleDownloadSvg = () => {
    const file = new Blob([svg], {type: "image/svg+xml"})
    saveAs(file, "signature")
  }

  return (
    <>
      <Button size="small" onClick={() => triggerBase64Download(image, 'signature')}>
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
