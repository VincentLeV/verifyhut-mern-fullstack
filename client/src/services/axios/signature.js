import axios from "axios"
const baseUrl = process.env.REACT_APP_API_BASE_URL

export const getUncategorized = async () => {
    const req = await axios.get(`${baseUrl}/api/signatures/uncategorized`)
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

export const deleteSignature = async (id, token) => {
    const res = await axios.delete(`${baseUrl}/api/signatures/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}` 
        }
    })
    return res.data
}