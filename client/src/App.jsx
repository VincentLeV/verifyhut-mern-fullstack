import React from "react"
import "./styles/app.css"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import UserProvider from "./context/UserContext"
import ToastProvider from "./context/ToastContext"
import AlertProvider from "./context/AlertContext"
import CategoryProvider from "./context/CategoryContext"
import SignatureProvider from "./context/SignatureContext"

import Main from "./views/Main"
import Onboarding from "./views/Onboarding"
import Toast from "./components/Toast"
import Alert from "./components/Alert"

function App() {
    return (
        <Router>
            <UserProvider>
            <ToastProvider>
            <AlertProvider>
            <CategoryProvider>
            <SignatureProvider>
                <Routes>
                    <Route path="*" index element={<Onboarding />} />
                    <Route path="/home" element={<Main />} />
                </Routes>            
                
                <Toast />
                <Alert />
            </SignatureProvider>
            </CategoryProvider>
            </AlertProvider>
            </ToastProvider>
            </UserProvider>
        </Router>
    );
}

export default App
