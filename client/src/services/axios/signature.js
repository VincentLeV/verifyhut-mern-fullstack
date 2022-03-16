import axios from "axios"
import { baseUrl } from "."

export const getUncategorized = async (id) => {
    const req = await axios.get(`${baseUrl}/api/signatures/uncategorized/user/${id}`)
    return req.data
}

export const addSignature = async (data, token) => {
    const res = await axios.post(`${baseUrl}/api/signatures`, data, {
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    })
    return res.data
}

export const updateSignature = async (id, data, token) => {
    const res = await axios.patch(`${baseUrl}/api/signatures/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    })
    return res.data
}

export const deleteSignature = async (id, token) => {
    const res = await axios.delete(`${baseUrl}/api/signatures/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    })
    return res.data
}