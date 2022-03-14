import React from "react"
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    AccordionActions,
    Typography,
    IconButton,
    Divider,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditIcon from "@mui/icons-material/Edit"
import { red, amber } from "@mui/material/colors"
import Axios from "../../../services/axios"
import { getDataLS } from "../../../utils/helpers"
import { useAlert } from "../../../context/AlertContext"
import { useToast } from "../../../context/ToastContext"

import SignatureBar from "../SignatureBar"

export default function Category({ 
    category, 
    categories,
    setCategories,
    expanded, 
    setExpanded, 
    setIsEditFormOpen,
    setSelected,
    setShowSignBoard,
    setIsOpen
}) {
    const { isConfirmed } = useAlert()
    const { setToast } = useToast()

    const handleChange = (panel) => (_, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
    }

    const handleEditCategory = () => {
        setSelected(category)
        setIsEditFormOpen(true)
    }

    const handleDeleteCategory = async (e) => {
        e.preventDefault()
        const confirmed = await isConfirmed( 
            "Delete Category", 
            `Do you really want to delete category ${category?.name}?`
        )
        if (confirmed) {
            try {
                const token = getDataLS("auth-token")
                await Axios.deleteCategory(category?.id, token)
                setCategories(categories.filter(x => x.id !== category?.id))
                setToast({ isOpen: true, msg: "Successfully deleted category!" })
            } catch (err) {
                setToast({ isOpen: true, msg: err?.response?.data?.message, severity: "error" })
            }
        } 
    }

    return (
        <Accordion 
            expanded={expanded === `panel-${category?.name}`} 
            onChange={handleChange(`panel-${category?.name}`)}
            sx={{ padding: "0 0.5rem" }}
        >
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                id={`panel-${category?.name}-header`}
            >
                <Typography>{category?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails >
                {category?.signatures?.map((sig, i) => (
                    <SignatureBar 
                        key={i} 
                        signature={sig} 
                        category={category} 
                        setShowSignBoard={setShowSignBoard} 
                        setIsOpen={setIsOpen}
                    />
                ))}
            </AccordionDetails>
            <Divider />
            <AccordionActions>
                <IconButton 
                    size="small" 
                    variant="contained" 
                    sx={{ color: amber[800] }}
                    onClick={handleEditCategory}
                >
                    <EditIcon fontSize="small" />
                    <Typography variant="subtitle2" ml={0.3}>Edit</Typography>
                </IconButton>

                <IconButton 
                    size="small" 
                    variant="contained" 
                    sx={{ color: red[600] }}
                    onClick={handleDeleteCategory}
                >
                    <DeleteOutlineIcon fontSize="small"/>
                    <Typography variant="subtitle2" ml={0.3}>Delete</Typography>
                </IconButton>
            </AccordionActions>
        </Accordion>
    )
}