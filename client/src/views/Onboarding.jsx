import React, { useState } from "react"
import { Typography } from "@mui/material"

import LoginForm from "../components/LoginForm"
import SignUpForm from "../components/SignUpForm"
import AppLogo from "../components/AppLogo"

export default function Onboarding() {
    const [ showSignUpForm, setShowSignUpForm ] = useState(false)

    return (
        <div>
            <AppLogo isDescription={true} />
            {
                showSignUpForm 
                ? <SignUpForm setShowSignUpForm={setShowSignUpForm} /> 
                : <LoginForm setShowSignUpForm={setShowSignUpForm} />
            }
            {
                showSignUpForm
                ? <Typography 
                    className="link"
                    variant="subtitle2"
                    sx={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => setShowSignUpForm(false)}
                >
                    Already have account? Go back
                </Typography>
                : <Typography 
                    className="link"
                    variant="subtitle2"
                    sx={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => setShowSignUpForm(true)}
                >
                    Don't have account yet? Sign up now
                </Typography>
            }
        </div>
    )
}
