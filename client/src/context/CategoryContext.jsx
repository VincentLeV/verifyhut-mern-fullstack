import React, { useState, createContext, useContext } from "react"

const CategoryContext = createContext()

export const useCategories = () => useContext(CategoryContext)

export default function CategoryProvider({ children }) {
    const [ categories, setCategories ] = useState([])
    const [ category, setCategory ] = useState({})

    return (
        <CategoryContext.Provider value={{ categories, setCategories, category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}