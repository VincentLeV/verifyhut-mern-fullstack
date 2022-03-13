import { 
    getUsers, 
    getUser,
    createUser
} from "./user"
import { 
    getCategories,
    getCategory, 
    addCategory,
    updateCategory,
    deleteCategory,
    getUserCategories
} from "./category"
import { 
    getUncategorized,
    addSignature, 
    deleteSignature 
} from "./signature"
import { login } from "./authentication"

export const baseUrl = process.env.REACT_APP_API_BASE_URL || "https://verifyhut-mern-fullstack.herokuapp.com"

const Axios = {
    login,
    getUsers,
    getUser,
    createUser,
    getCategories,
    getCategory,
    getUserCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getUncategorized,
    addSignature,
    deleteSignature
}

export default Axios