import React from "react"
import { Link } from "react-router-dom"
import { Typography } from "@mui/material"
import { indigo } from "@mui/material/colors"

import Logo from "../../assets/app-logo.png"

export default function AppLogo({ width, margin, padding, isDescription }) {
    return (
        <div className="app-logo" style={{ padding: padding ? padding : "2.5rem 0 0 0" }}>
            <Link to="/home">
                <div className="logo-container">
                    <img 
                        src={Logo} 
                        alt="App Logo" 
                        style={{ width: width ? width : "4.5rem", margin: margin ? margin : "0.7rem auto" }} 
                    />
                </div>
            </Link>
            {
                isDescription && 
                <>
                    <Typography 
                        variant="h5"
                        fontWeight="bold"
                        my={1}
                        color={indigo[800]}
                    >
                        VerifyHut
                    </Typography>
                    <Typography variant="body">
                        Sign and verify any transaction for you
                    </Typography>
                </>
            }
        </div>
    )
}
