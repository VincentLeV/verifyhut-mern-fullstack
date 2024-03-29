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
    updateSignature,
    deleteSignature 
} from "./signature"
import { login } from "./authentication"

export const baseUrl = process.env.REACT_APP_API_BASE_URL

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
    updateSignature,
    deleteSignature
}

export default Axios