import axios from "axios"
const baseUrl = process.env.REACT_APP_API_BASE_URL

export const login = async (userDetails) => {
    const res = await axios.post(`${baseUrl}/api/login`, userDetails)
    return res.data
}