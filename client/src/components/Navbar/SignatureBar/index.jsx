import React from "react"
import {
    Stack,
    Button,
    Box,
    Typography
} from "@mui/material"
import Clear from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
import { red, yellow } from "@mui/material/colors"
import moment from "moment-mini"
import { useCategories } from "../../../context/CategoryContext"
import { useToast } from "../../../context/ToastContext"
import { useAlert } from "../../../context/AlertContext"
import { useSignatures } from "../../../context/SignatureContext"
import Axios from "../../../services/axios"
import { getDataLS } from "../../../utils/helpers"
import useMediaQuery from "@mui/material/useMediaQuery"

export default function SignatureBar({ 
    signature, 
    category, 
    setShowSignBoard, 
    setIsOpen,
    setIsEditSigOpen,
    setSelectedSig,
    setSelected
}) {
    const matches = useMediaQuery("(min-width: 1024px)")
    const { categories, setCategories, setCategory } = useCategories()
    const { setToast } = useToast()
    const { isConfirmed } = useAlert()
    const { uncategorized, setUncategorized, setSignature } = useSignatures()

    const handleDeleteSignature = async (e) => {
        e.preventDefault()
        const confirmed = await isConfirmed( 
            "Delete Signature", 
            `Do you really want to delete signature signed by ${signature?.signer_name}?`
        )
        if (confirmed) {
            try {
                const token = getDataLS("auth-token")
                await Axios.deleteSignature(signature?.id, token)
                if (category) {
                    const categorySignatures = category?.signatures.filter(x => x.id !== signature.id)
                    const newCategory = { ...category, signatures: categorySignatures }
                    const temp = [ ...categories.filter(x => x.id !== category.id), newCategory ]
                    setCategories(temp)
                } else {
                    setUncategorized(uncategorized.filter(x => x.id !== signature.id))
                }
                setSignature(null)
                setToast({ isOpen: true, msg: "Successfully deleted signature!" })
            } catch (err) {
                setToast({ isOpen: true, msg: err?.response?.data?.message, severity: "error" })
            }
        } 
    }

    const openEditSignatureForm = async () => {
        setIsEditSigOpen(true)
        setSelectedSig(signature)
        setSelected(category)
    }

    const handleClick = () => {
        !matches && setIsOpen(false)
        setShowSignBoard(false)
        setSignature(signature)
        setCategory(category)
    }

    return (
        <Stack direction="row" alignItems="center" mb={1} className="signature-bar">
            <Button 
                size="small"
                variant="outlined"
                sx={{ display: "block" }}
                onClick={handleClick}
            >   
                <Typography variant="subtitle2">
                    {moment(signature.createdAt).format("DD-MM-YYYY hh:mm A")}
                </Typography>
            </Button> 

            <Box 
                className="edit-signature-btn"
                pt={0.4}
                px={0.4}
                ml={1}
                border="1px solid"
                borderRadius="4px"
                borderColor={yellow[900]}
                onClick={openEditSignatureForm}
                sx={{ cursor: "pointer" }}
            >
                <EditIcon fontSize="small" color="warning" />
            </Box>

            <Box 
                className="delete-signature-btn"
                pt={0.4}
                px={0.4}
                ml={1}
                border="1px solid"
                borderRadius="4px"
                borderColor={red[800]}
                onClick={handleDeleteSignature}
                sx={{ cursor: "pointer" }}
            >
                <Clear fontSize="small" color="error" />
            </Box>
        </Stack> 
    )
}
