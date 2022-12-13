import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux'
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Typography } from '@mui/material';
import FieldsGroup from './Field';
import { Container } from "@mui/system";
import Field from './Field';
import ButtonModel from './ButtonModel';

const schema = yup.object({
    email: yup
        .string('Email incorrect')
        .email('Email incorrect')
        .required('Email obligatoire pour se connecter.'),

    password: yup
        .string()
        .required('Mot de passe obligatoire pour se connecter.')
}).required();


const Login = () => {
    const [errMessage, setErrMessage] = useState("")
    const [, setState] = useState() // Ne sert que pour le raffraichissement de la page
    const [passwordVisibility, setPasswordVisibility] = useState("password")
    const { register, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) });
    const fields = [["email", "Email"], ["firstname", "Prénom"]]
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fieldsGroupInfo = [
        { field: "email", label: "Email", type: "text" },
        { field: "password", label: "Mot de passe", type: "password" },
    ]

    const onSubmit = async (data) => {
        let res
        try {
            res = await axios.post(`/api/client`, data)
        } catch (err) {
            setErrMessage(err.response.data.message)
        }
        dispatch({ type: "cart/login", payload: { id: res.data.client._id, firstname: res.data.client.firstname, lastname: res.data.client.lastname } })
        navigate("/")
    }

    const handleChange = (e) => {
        if (errMessage !== "") setErrMessage("")
        if (Object.keys(errors).length !== 0) {
            if (errors[e.target.name].message !== "") {
                errors[e.target.name].message = ""
                setState({})
            }
        }
    }

    const handleSignUp = () => navigate("/signup")
    const handleLogin = () => navigate("/")
    const changeVisibility = () => setPasswordVisibility(passwordVisibility === "password" ? "text" : "password")

    return (
        <>
            <Container maxWidth="md">
                <Typography variant="h2" padding={3} textAlign="center">
                    Nouveau client ?
                </Typography>

                <Typography variant="h4" padding={3} textAlign="center">
                    Inscrivez-vous pour commander et accéder à nos services.
                </Typography>

                <Typography variant="h4" padding={3} textAlign="center">
                    Nous nous engageons sur la sécurité et la confidentialité de vos
                    informations.
                </Typography>

                <ButtonModel handleClick={handleSignUp} label="S'enregistrer" />

                <Typography variant="h2" padding={3} textAlign="center">
                    Déjà client ?
                </Typography>
                <Typography variant="h4" padding={3} textAlign="center">
                    Saisissez votre email et votre mot de passe ci dessous
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                        {fieldsGroupInfo.map((fields, k) => (
                            <Field
                                key={k}
                                fields={fields}
                                register={register}
                                errors={errors}
                                handleChange={handleChange}
                            />
                        ))}
                    </Container>
                <ButtonModel type="submit" label="Se connecter"/>
                </form>
            </Container>
        </>
    );
}

export default Login