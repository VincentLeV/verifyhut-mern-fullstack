import React from "react"
import { ReactSketchCanvas } from 'react-sketch-canvas';

export default function Canvas({ canvas }) {
    return (
        <ReactSketchCanvas
            ref={canvas}
            strokeWidth={4}
            strokeColor="black"
        />
    )
}
