import axios from "axios"
import { baseUrl } from "."

export const getUsers = async () => {
    const req = await axios.get(`${baseUrl}/api/users`)
    return req.data
}

export const getUser = async (id) => {
    const req = await axios.get(`${baseUrl}/api/users/${id}`)
    return req.data
}

export const createUser = async (data) => {
    const res = await axios.post(`${baseUrl}/api/users`, data)
    return res.data
}