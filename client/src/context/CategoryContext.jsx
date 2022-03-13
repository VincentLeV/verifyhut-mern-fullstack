import React, { useState, createContext, useContext } from "react"

const CategoryContext = createContext()

export const useCategories = () => useContext(CategoryContext)

export default function CategoryProvider({ children }) {
    const [ categories, setCategories ] = useState([])

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    )
}