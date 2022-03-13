import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material"
import { red, grey } from "@mui/material/colors"
import { useAlert } from "../../context/AlertContext"

export default function Alert() {
    const { alert } = useAlert()

    return (
        <Dialog
            open={alert.isOpen}
            onClose={alert.cancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {alert.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {alert.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={alert.cancel} sx={{ color: grey[500] }}>Cancel</Button>
                <Button onClick={alert.proceed} autoFocus sx={{ color: alert.color ? alert.color : red[600] }}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}
