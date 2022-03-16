import React from "react"
import { 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem 
} from "@mui/material"

export default function CategorySelect({ categories, category, setCategory, fromCategory }) {
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
                sx={{ minWidth: 240 }}
            >
                { fromCategory && <MenuItem id={"option-none"} value="" sx={{ height: "2.5rem" }} /> }
                {
                    fromCategory 
                        ? categories
                            ?.filter(x => x.name !== fromCategory.name)
                            ?.map((c, i) => (
                                <MenuItem id={`option-${i}`} key={i} value={c?.name}>{c?.name}</MenuItem>
                            ))
                        : categories?.map((c, i) => (
                            <MenuItem id={`option-${i}`} key={i} value={c?.name}>{c?.name}</MenuItem>
                        ))
                }
            </Select>
        </FormControl>
    )
}
