import React, { useState, useEffect } from "react"
import { Buffer } from "buffer"
import { 
    Stack, 
    Button, 
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Box,
    Divider
} from "@mui/material"
import { red } from "@mui/material/colors"
import { useSignatures } from "../../context/SignatureContext"
import { useCategories } from "../../context/CategoryContext"
import { useAlert } from "../../context/AlertContext"
import { useToast } from "../../context/ToastContext"
import moment from "moment-mini"
import Close from "@mui/icons-material/Close"
import { getDataLS } from "../../utils/helpers"
import Axios from "../../services/axios"

import ActionBar from "./ActionBar"
import InfoCanvas from "./InfoCanvas"

export default function Signature({ setShowSignBoard }) {
    const { signature, setSignature, uncategorized, setUncategorized } = useSignatures()
    const { category, categories, setCategories } = useCategories()
    const { isConfirmed } = useAlert()
    const { setToast } = useToast()
    const [ infoBase64, setInfoBase64 ] = useState("")
    const [ sigHeight, setSigHeight ] = useState(0)

    useEffect(() => {
        if (signature?.image) {
            const sigBase64 = Buffer.from(signature.image, 'base64').toString('binary')
            const i = new Image()
            i.src = sigBase64
            i.onload = () => {
                setSigHeight(i.height)
            }
        }
        
    }, [signature])

    const handleDeleteSignature = async (e) => {
        e.preventDefault()
        const confirmed = await isConfirmed( 
            "Delete Signature", 
            `Do you really want to delete signature signed by ${signature?.signer_name}?`
        )
        if (confirmed) {
            try {
                const token = getDataLS("auth-token")
                await Axios.deleteSignature(signature?.id, token)
                if (category) {
                    const categorySignatures = category?.signatures.filter(x => x.id !== signature.id)
                    const newCategory = { ...category, signatures: categorySignatures }
                    const temp = [ ...categories.filter(x => x.id !== category.id), newCategory ]
                    setCategories(temp)
                } else {
                    setUncategorized(uncategorized.filter(x => x.id !== signature.id))
                }
                setToast({ isOpen: true, msg: "Successfully deleted signature!" })
                setSignature(null)
            } catch (err) {
                setToast({ isOpen: true, msg: err?.response?.data?.message, severity: "error" })
            }
        } 
    }

    return (
        <Stack alignItems="center" justifyContent="center" sx={{ height: "90vh" }} mt={!signature && 10}>
            <Button
                variant="outlined" 
                onClick={() => setShowSignBoard(true)} 
                sx={{ marginBottom: "1rem" }}
            >
                Start Signing
            </Button>

            {
                signature &&
                <Card sx={{ maxWidth: 345, width: 345 }}>
                    <Stack 
                        py={2}
                        px={2}
                        alignItems="flex-end"
                        sx={{ cursor: "pointer" }}
                    >
                        <Box 
                            pt={0.4}
                            px={0.4}
                            width={20}
                            border="1px solid"
                            borderRadius="4px"
                            borderColor={red[800]}
                            onClick={handleDeleteSignature}
                            sx={{ cursor: "pointer" }}
                        >
                            <Close fontSize="small" color="error" />
                        </Box>
                    </Stack>
                    <Divider />
                    <CardMedia
                        component="img"
                        alt="Signature"
                        height="200"
                        sx={{ objectFit: "contain" }}
                        image={signature && Buffer.from(signature?.image, "base64").toString()}
                    />
                    <CardContent>
                        <InfoCanvas 
                            sigHeight={sigHeight}
                            signerName={signature.signer_name} 
                            createdAt={moment(signature.createdAt).format("DD-MM-YYYY hh:mm A")} 
                            reason={signature.reason}
                            setInfoBase64={setInfoBase64}
                        />

                        <Typography variant="body2" color="text.secondary" mb={1}>
                            {moment(signature.createdAt).format("DD-MM-YYYY hh:mm A")}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {signature.signer_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {signature.reason}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <ActionBar 
                            image={Buffer.from(signature?.image, "base64").toString()}
                            svg={signature?.svg}
                            infoBase64={infoBase64}
                        />
                    </CardActions>
                </Card>
            }
        </Stack>
    )
}
