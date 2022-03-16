import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    TextField,
    Button,
    Box
} from "@mui/material"
import Axios from "../../services/axios"
import { getDataLS } from "../../utils/helpers"
import { useToast } from "../../context/ToastContext"

export default function EditCategory({ 
    isEditFormOpen, 
    setIsEditFormOpen, 
    categories, 
    setCategories,
    selected
}) {
    const [ values, setValues ] = useState({ name: "" })
    const { setToast } = useToast()

    const inputChanged = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClose = () => {
        setIsEditFormOpen(false)
    }

    const handleEditCategory = async (e) => {
        e.preventDefault()
        try {
            const token = getDataLS("auth-token")
            const data = await Axios.updateCategory(selected.id, values, token)
            const index = categories.findIndex(x => x.id === data.id)
            setCategories([ ...categories.slice(0, index), data, ...categories.slice(index + 1) ])
            setIsEditFormOpen(false)
            setToast({ isOpen: true, msg: "Successfully edited category!" })
        } catch (err) {
            setToast({ isOpen: true, msg: err?.response?.data?.message, severity: "error" })
        }
    }

    return (
        <Dialog open={isEditFormOpen} onClose={handleClose} id="edit-category-form">
            <DialogTitle>Edit Category</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleEditCategory} p={0}>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={values.name}
                        name="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                        onChange={inputChanged}
                    />
                </Box>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button id="edit-category-btn" type="submit" onClick={handleEditCategory}>Edit</Button>
            </DialogActions>
        </Dialog>
    )
}
