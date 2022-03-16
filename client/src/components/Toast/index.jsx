import React, { useEffect } from "react"
import { Snackbar, Alert } from "@mui/material"
import { useToast } from "../../context/ToastContext"
import { useNavigate } from "react-router-dom"

export default function Toast() {
    const { toast, setToast } = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        if (toast?.msg?.includes("expired")) {
            navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toast?.msg])

    const handleClose = (_, reason) => {
        if (reason === "clickaway") {
            return
        }
    
        setToast({ ...toast, isOpen: false })
    }

    return (
        <Snackbar
            autoHideDuration={2000}
            sx={{ margin: "1rem auto" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={toast.isOpen}
            onClose={handleClose}
            key="bottomcenter"
        >
            <Alert onClose={handleClose} severity={toast.severity} sx={{ width: { sm: "90%", md: "80%", lg: "100%" } }}>
                {toast.msg}
            </Alert>
        </Snackbar>
    )
}
