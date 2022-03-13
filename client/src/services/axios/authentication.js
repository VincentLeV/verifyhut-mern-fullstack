import axios from "axios"
import { baseUrl } from "."

export const login = async (userDetails) => {
    const res = await axios.post(`${baseUrl}/api/login`, userDetails)
    return res.data
}