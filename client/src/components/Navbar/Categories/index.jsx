import React, { useState } from "react"
import { 
    Typography, 
    Box,
    Stack,
    IconButton
} from "@mui/material"
import { useCategories } from "../../../context/CategoryContext"
import AddCircleIcon from '@mui/icons-material/AddCircle'

import Category from "./Category"
import EditCategory from "../../EditCategory"
import AddCategory from "../../AddCategory"

export default function Categories({ setShowSignBoard, setIsOpen }) {
    const { categories, setCategories } = useCategories()
    const [ selected, setSelected ] = useState(null)
    const [ expanded, setExpanded ] = useState("")
    const [ isEditFormOpen, setIsEditFormOpen ] = useState(false)
    const [ isAddFormOpen, setIsAddFormOpen ] = useState(false)

    const openAddForm = () => {
        setIsAddFormOpen(true)
    }

    return (
        <Box pb={1}>   
            <Stack direction="row" alignItems="center" justifyContent="space-between" pr={1} mb={2}>
                <Typography variant="body" color="primary" fontWeight="bold">Categories</Typography>
                <IconButton edge="end" aria-label="add" color="primary" onClick={openAddForm}>
                    <AddCircleIcon />
                </IconButton>
            </Stack>

            {categories?.length === 0 && <Typography variant="body">No Category</Typography>}

            {categories?.map((category, i) => (
                <Category 
                    key={i}
                    category={category} 
                    categories={categories}
                    setCategories={setCategories}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    setIsEditFormOpen={setIsEditFormOpen}
                    setSelected={setSelected}
                    setShowSignBoard={setShowSignBoard}
                    setIsOpen={setIsOpen}
                />
            ))}

            {
                isEditFormOpen
                && <EditCategory 
                    isEditFormOpen={isEditFormOpen} 
                    setIsEditFormOpen={setIsEditFormOpen} 
                    categories={categories}
                    setCategories={setCategories}
                    selected={selected}
                />
            }

            {
                isAddFormOpen
                && <AddCategory 
                    isAddFormOpen={isAddFormOpen} 
                    setIsAddFormOpen={setIsAddFormOpen} 
                    categories={categories}
                    setCategories={setCategories}
                />
            }
        </Box>
    )
}
