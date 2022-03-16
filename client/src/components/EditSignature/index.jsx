import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    Box
} from "@mui/material"
import Axios from "../../services/axios"
import { getDataLS } from "../../utils/helpers"
import { useToast } from "../../context/ToastContext"
import { useCategories } from "../../context/CategoryContext"
import { useSignatures } from "../../context/SignatureContext"

import CategorySelect from "../CategorySelect"

export default function EditSignature({ 
    signature,
    isEditSigOpen,
    setIsEditSigOpen,
    fromCategory
}) {
    const { categories, setCategories } = useCategories()
    const { uncategorized, setUncategorized } = useSignatures()
    const { setToast } = useToast()
    const [ toCategory, setToCategory ] = useState("")

    const handleClose = () => {
        setIsEditSigOpen(false)
    }

    const handleEditSignature = async (e) => {
        e.preventDefault()

        try { 
            const token = getDataLS("auth-token")

            let fromCateIndex = null
            let toCategoryFromDB = null

            if (!fromCategory && toCategory) { 
                fromCateIndex = categories.findIndex(x => x.name === toCategory)
                toCategoryFromDB = categories.find(x => x.name === toCategory)

                await Axios.updateSignature(
                    signature.id, 
                    { category: toCategoryFromDB.id }, 
                    token
                )
                
                setUncategorized([ ...uncategorized.filter(x => x.id !== signature.id)  ])
                const sigIndex = toCategoryFromDB.signatures.findIndex(x => x.id === signature.id)

                if (sigIndex === - 1) {
                    setCategories([ 
                        ...categories.slice(0, fromCateIndex), 
                        { ...toCategoryFromDB, signatures: [ ...toCategoryFromDB.signatures, signature ] }, 
                        ...categories.slice(fromCateIndex + 1) 
                    ])
                }
                setToast({ isOpen: true, msg: "Successfully edited category!" })
            } else if (fromCategory && !toCategory) {
                await Axios.updateSignature(
                    signature.id, 
                    { category: "", fromCategory: fromCategory.id }, 
                    token
                )

                fromCateIndex = categories.findIndex(x => x.id === fromCategory.id)
                setCategories([ 
                    ...categories.slice(0, fromCateIndex), 
                    { ...fromCategory, signatures: fromCategory.signatures.filter(x => x.id !== signature.id) }, 
                    ...categories.slice(fromCateIndex + 1) 
                ])
                setUncategorized([ ...uncategorized, signature ])
                setToast({ isOpen: true, msg: "Successfully edited category!" })
            } else if (fromCategory && toCategory) {
                toCategoryFromDB = categories.find(x => x.name === toCategory)

                await Axios.updateSignature(
                    signature.id, 
                    { fromCategory: fromCategory.id, category: toCategoryFromDB.id }, 
                    token
                )

                fromCateIndex = categories.findIndex(x => x.id === fromCategory.id)
                const newCategories = [
                    { ...fromCategory, signatures: fromCategory.signatures.filter(x => x.id !== signature.id) },
                    { ...toCategoryFromDB, signatures: [ ...toCategoryFromDB.signatures, signature ] }
                ]

                setCategories(categories.map(c => newCategories.find(nc => nc.id === c.id) || c))
                setToast({ isOpen: true, msg: "Successfully edited category!" })
            }

            setIsEditSigOpen(false)
        } catch (err) {
            setToast({ isOpen: true, msg: err?.response?.data?.message, severity: "error" })
        }
    }

    return (
        <Dialog 
            open={isEditSigOpen} 
            onClose={handleClose} 
            id="edit-signature-form"
        >
            <DialogTitle>Edit Signature</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleEditSignature} p={0}>
                    <CategorySelect 
                        categories={categories}
                        category={toCategory}
                        setCategory={setToCategory}
                        fromCategory={fromCategory}
                    />
                </Box>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button id="edit-signature-btn" type="submit" onClick={handleEditSignature}>Edit</Button>
            </DialogActions>
        </Dialog>
    )
}
