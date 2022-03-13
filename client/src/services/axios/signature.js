import axios from "axios"
import { baseUrl } from "."

export const getUncategorized = async () => {
    const req = await axios.get(`${baseUrl}/api/signatures/uncategorized`)
    return req.data
}

export const addSignature = async (data, token) => {
    console.log(data)
    const res = await axios.post(`${baseUrl}/api/signatures`, data, {
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