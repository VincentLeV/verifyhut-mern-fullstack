import React, { useState } from "react"
import { Typography, Box } from "@mui/material"

import LoginForm from "../components/LoginForm"
import SignUpForm from "../components/SignUpForm"
import AppLogo from "../components/AppLogo"
import Spinner from "../components/Spinner"

export default function Onboarding() {
    const [ showSignUpForm, setShowSignUpForm ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    return (
        <Box>
            <AppLogo isDescription={true} />

            {loading && <Spinner />}

            {
                showSignUpForm 
                    ? <SignUpForm setShowSignUpForm={setShowSignUpForm} setLoading={setLoading} /> 
                    : <LoginForm setShowSignUpForm={setShowSignUpForm} setLoading={setLoading} />
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
                    Don&#39;t have account yet? Sign up now
                    </Typography>
            }
        </Box>
    )
}
