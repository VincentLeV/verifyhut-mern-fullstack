import React, { useEffect, useRef } from "react"
import { createInfoCanvas, getInfoBase64 } from "../../utils/helpers"

export default function InfoCanvas({ 
    sigHeight,
    signerName, 
    createdAt, 
    reason, 
    setInfoBase64 
}) {
    const canvas = useRef()

    useEffect(() => {
        const canvasEl = createInfoCanvas(
            canvas, 
            { width: 310, height: sigHeight }, 
            [
                { text: createdAt || "", x: 0, y: sigHeight / 2 },
                { text: signerName || "", x: 0, y: (sigHeight / 2) + 18 },
                { text: reason || "", x: 0, y: (sigHeight / 2) + 36 }
            ],
        )
        const infoBase64 =  getInfoBase64(canvasEl)
        setInfoBase64(infoBase64)
    }, [sigHeight, signerName, createdAt, reason, setInfoBase64])

    return (
        <canvas 
            ref={canvas} 
            style={{ display: "none", border: "1px solid black" }}
        ></canvas>
    )
}
