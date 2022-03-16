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

export default function AddCategory({ 
    isAddFormOpen, 
    setIsAddFormOpen, 
    categories,
    setCategories
}) {
    const [ values, setValues ] = useState({ name: "" })
    const { setToast } = useToast()

    const inputChanged = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClose = () => {
        setIsAddFormOpen(false)
    }

    const handleAddCategory = async (e) => {
        e.preventDefault()
        try {
            const token = getDataLS("auth-token")
            const data = await Axios.addCategory(values, token)
            setCategories([ ...categories, data ])
            setIsAddFormOpen(false)
            setToast({ isOpen: true, msg: "Successfully created category!" })
        } catch (err) {
            setToast({ isOpen: true, msg: err?.response?.data?.message, severity: "error" })
        }
    }

    return (
        <Dialog open={isAddFormOpen} onClose={handleClose} id="add-category-form">
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleAddCategory} p={0}>
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
                <Button type="submit" onClick={handleAddCategory} id="add-category-btn">Add</Button>
            </DialogActions>
        </Dialog>
    )
}
