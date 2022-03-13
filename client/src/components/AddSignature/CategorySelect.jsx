import React, { useEffect } from "react"
import { 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem 
} from "@mui/material"

export default function CategorySelect({ categories, category, setCategory }) {
    const handleChange = (e) => {
        setCategory(e.target.value)
    }

    return (
        <FormControl fullWidth sx={{ margin: "1rem 0 0.5rem 0" }} size="small">
            <InputLabel id="category-option-label">Category</InputLabel>
            <Select
                id="category-select"
                value={category}
                label="Category"
                onChange={handleChange}
            >
                {
                    categories?.map((c, i) => (
                        <MenuItem key={i} value={c?.name}>{c?.name}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}
