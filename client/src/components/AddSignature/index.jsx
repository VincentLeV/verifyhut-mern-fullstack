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
import { useCategories } from "../../context/CategoryContext"
import { useSignatures } from "../../context/SignatureContext"
import moment from "moment-mini"

import CategorySelect from "./CategorySelect"

export default function AddSignature({ 
    isAddFormOpen, 
    setIsAddFormOpen, 
    initialVal, 
    setInitialVal 
}) {
    const [ values, setValues ] = useState({ signer_name: "", reason: "" })
    const { categories, setCategories } = useCategories()
    const { setToast } = useToast()
    const { uncategorized, setUncategorized } = useSignatures()
    const [ category, setCategory ] = useState("")

    const inputChanged = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClose = () => {
        setIsAddFormOpen(false)
    }

    const handleAddSignature = async (e) => {
        e.preventDefault()
        let categoryId
        if (category) {
            categoryId = await findCategoryId(category)
        }
        const newSignature = {
            image: initialVal?.image,
            svg: initialVal.svg,
            signer_name: values.signer_name,
            reason: values.reason,
            category: categoryId || category,
        }
        
        try {
            const token = getDataLS("auth-token")
            const data = await Axios.addSignature(newSignature, token)
            
            if (category) {
                const index = categories.findIndex(x => x.id === categoryId)
                const newSignatures = [ ...categories[index].signatures, data ]
                setCategories([ 
                    ...categories.filter(x => x.id !== categories[index].id), 
                    { ...categories[index], signatures: newSignatures } 
                ])
            } else {
                setUncategorized([ ...uncategorized, data ])
            }
            setValues({ signer_name: "", reason: "" })
            setInitialVal({ image: "", svg: "", createdAt: "" })
            setIsAddFormOpen(false)
            setToast({ isOpen: true, msg: "Successfully created signature!" })
        } catch (err) {
            setToast({ isOpen: true, msg: err?.response?.data?.message, severity: "error" })
        }
    }

    const findCategoryId = async (name) => {
        const categories = await Axios.getCategories()
        const found = categories.find(x => x.name === name)
        return found.id
    }

    return (
        <Dialog open={isAddFormOpen} onClose={handleClose}>
            <DialogTitle>Add Signature</DialogTitle>
            <DialogContent>
                <img 
                    src={initialVal.image} 
                    alt="Signature" 
                    width="60%"
                    style={{ display: "block", margin: "0 auto 1rem auto" }} 
                />

                <Box component="form" onSubmit={handleAddSignature} p={0}>
                    <TextField
                        autoFocus
                        fullWidth
                        required
                        margin="dense"
                        size="small"
                        value={values.signer_name}
                        name="signer_name"
                        label="Signer Name"
                        onChange={inputChanged}
                    />

                    <CategorySelect 
                        categories={categories}
                        category={category}
                        setCategory={setCategory}
                    />

                    <TextField
                        multiline
                        rows={2}
                        name="reason"
                        fullWidth
                        size="small"
                        margin="dense"
                        label="Reason"
                        value={values.reason}
                        sx={{ marginBottom: "0.5rem" }}
                        onChange={inputChanged}
                    />

                    <TextField
                        disabled
                        fullWidth
                        size="small"
                        margin="dense"
                        name="createdAt"
                        label="Signed At"
                        value={moment(initialVal.createdAt).format("DD-MM-YYYY")}
                    />
                </Box>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleAddSignature}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}
