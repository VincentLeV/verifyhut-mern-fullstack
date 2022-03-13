import axios from "axios"
import { baseUrl } from "."

export const getCategories = async () => {
    const req = await axios.get(`${baseUrl}/api/categories`)
    return req.data
}

export const getCategory = async (id) => {
    const req = await axios.get(`${baseUrl}/api/categories/${id}`)
    return req.data
}

export const getUserCategories = async (userId) => {
    const req = await axios.get(`${baseUrl}/api/categories/user/${userId}`)
    return req.data
}

export const addCategory = async (data, token) => {
    const res = await axios.post(`${baseUrl}/api/categories`, data, {
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    })
    return res.data
}

export const updateCategory = async (id, data, token) => {
    const res = await axios.put(`${baseUrl}/api/categories/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    })
    return res.data
}

export const deleteCategory = async (id, token) => {
    const res = await axios.delete(`${baseUrl}/api/categories/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    })
    return res.data
}