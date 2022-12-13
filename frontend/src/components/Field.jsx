import { useState } from "react"
import VisibilityIcon from '@mui/icons-material/Visibility';
import ErrorOutlineSharpIcon from '@mui/icons-material/ErrorOutlineSharp';
import { Box, IconButton, MenuItem, TextField, Tooltip, Zoom, Typography } from '@mui/material';

import React from 'react'
import { Container } from "@mui/system";

// Component qui gère les champs type input field, text ou password et select
// Et crée le lien avec le register et la "banque" d'erreur de Yum.
// Le handleChange gère la disparition du message d'erreur quand l'utilisateur recorrige son champ
const Field = ({ fields, register, errors, handleChange }) => {
    const [type, setType] = useState(fields.type)

    const handleType = () => {
        if (fields.type === "password") {
            setType(type === "password" ? "text" : "password")
        }
    }

    return (
        <>
            <Container className="field" sx={{ maxWidth: 7 / 9, display: "flex" }} >

                {(fields.type === "password" || fields.type === "text") &&
                    <TextField InputProps={{ style: { fontSize: "2rem" } }} fullWidth margin="dense" error={errors[fields.field]?.message ? true : false} type={type}
                        label={fields.label} {...register(fields.field)} onChange={e => handleChange(e)} />
                }

                {fields.type === "password" &&
                    (<Tooltip title={<Typography fontSize={"1.2rem"}>Afficher/Masquer</Typography>} placement="right" TransitionComponent={Zoom}
                        TransitionProps={{ timeout: 600 }} arrow onClick={handleType} >
                        <IconButton>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>)}

                {(fields.type !== "select" && errors[fields.field]?.message) &&
                    <Tooltip placement="right" TransitionComponent={Zoom} TransitionProps={{ timeout: 600 }} arrow
                        title={<Typography fontSize={"1.2rem"}>{errors[fields.field]?.message}</Typography>} >
                        <IconButton color='error' >
                            <ErrorOutlineSharpIcon />
                        </IconButton>
                    </Tooltip>}

                {fields.type === "select" &&
                    (<Box width='250px'>
                        <TextField label={fields.label} select  {...register(fields.field)} fullWidth>
                            {fields.values.map((item, key) => <MenuItem key={key} value={item}>{item}</MenuItem>)}
                        </TextField>
                    </Box>)
                }
            </Container>
        </>
    )
}

export default Field