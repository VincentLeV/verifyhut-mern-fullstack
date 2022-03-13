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