import React, { useState } from "react"
import { 
    Typography, 
    Box
} from "@mui/material"
import { useCategories } from "../../../context/CategoryContext"

import Category from "./Category"
import EditCategory from "../../EditCategory"
import AddCategory from "../../AddCategory"

export default function Categories({ 
    setShowSignBoard, 
    setIsOpen, 
    isAddFormOpen, 
    setIsAddFormOpen,
    setIsEditSigOpen, 
    setSelectedSig,
    selectedCate,
    setSelectedCate
}) {
    const { categories, setCategories } = useCategories()
    const [ expanded, setExpanded ] = useState("")
    const [ isEditFormOpen, setIsEditFormOpen ] = useState(false)

    return (
        <Box id="categories" pb={1} px={2} mb={2} sx={{ overflowY: "auto", maxHeight: "30vh", minHeight: "30vh" }}>   
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
                    setSelected={setSelectedCate}
                    setShowSignBoard={setShowSignBoard}
                    setIsOpen={setIsOpen}
                    setIsEditSigOpen={setIsEditSigOpen}
                    setSelectedSig={setSelectedSig}
                />
            ))}

            {
                isEditFormOpen
                && <EditCategory 
                    isEditFormOpen={isEditFormOpen} 
                    setIsEditFormOpen={setIsEditFormOpen} 
                    categories={categories}
                    setCategories={setCategories}
                    selected={selectedCate}
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
