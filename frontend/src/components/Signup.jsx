import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup';
import Field from './Field';
import * as yup from "yup";
import axios from "axios"
import { Box, Button, Typography } from '@mui/material';


const schema = yup.object({
    firstname: yup
        .string('Prénom incorrect.')
        .matches(/^[\w -]{3,}$/, 'Prénom incorrect.')
        .required('Prénom obligatoire.'),
    lastname: yup
        .string('Nom incorrect.')
        .matches(/^[\w -]{3,}$/, 'Nom incorrect.')
        .required('Nom obligatoire.'),
    email: yup
        .string('Email incorrect')
        .email('Email incorrect')
        .required('Email requis.'),
    emailConfirmation: yup
        .string()
        .test("confirmEmail", "Votre email ne correspond pas.", (value, ctx) => (value === ctx.parent.email)),
    password: yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, "Mot de passe incorrect.")
        .required("Mot de passe requis"),
    passwordConfirmation: yup
        .string()
        .test("confirmPassword", "Votre mot de passe ne correspond pas.", (value, ctx) => (value === ctx.parent.password)),
    phoneNumber: yup
        .string()
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Numéro de téléphone invalide.')
        .required("Numéro de téléphone requis."),
    streetNumber: yup
        .string()
        .matches(/^\d*$/, "Format de numéro incorrect.")
        .required("Numéro requis."),
    streetName: yup
        .string("Format de rue incorrect.")
        .required("Rue requise."),
    postalCode: yup
        .string()
        .matches(/^\d{5}$/, "Format de code postal incorrect.")
        .required("Code postal de téléphone requis."),
    city: yup
        .string("Format de ville incorrect.")
        .required("Ville requise.")
}).required();


const Signup = () => {
    const [errMessage, setErrMessage] = useState("")
    const [, setState] = useState(); // Ne sert que pour le raffraichissement de la page
    const { register, formState: { errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) });
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fieldsGroupInfo = [
        { field: "firstname", label: "Prénom", type: "text" },
        { field: "lastname", label: "Nom", type: "text" },
        { field: "email", label: "Email", type: "text" },
        { field: "emailConfirmation", label: "Confirmation de votre email", type: "text" },
        { field: "password", label: "Mot de passe", type: "password" },
        { field: "passwordConfirmation", label: "Confirmation de votre mot de passe", type: "password" },
        { field: "phoneNumber", label: "Numéro de téléphone", type: "text" },
    ]

    const fieldsGroupAddress = [
        { field: "streetNumber", label: "Numéro", type: "text" },
        { field: "addNumber", label: "Additionnel", type: "select", values: ["", "bis", "ter", "quar"] },
        { field: "streetName", label: "Rue", type: "text" },
        { field: "postalCode", label: "Code Postal", type: "text" },
        { field: "city", label: "Ville", type: "text" },
        { field: "complement", label: "Complément", type: "text" },
    ]

    const onSubmit = async (data) => {
        let res
        console.log(data)

        let client = {
            email: data.email.toLowerCase(),
            password: data.password,
            passwordVis: data.passwordVis,
            firstname: data.firstname,
            lastname: data.lastname.toUpperCase(),
            phoneNumber: data.phoneNumber,
            isGoldMember: false,
            address: {
                streetNumber: parseInt(data.streetNumber),
                addNumber: data.addNumber,
                streetName: data.streetName,
                postalCode: parseInt(data.postalCode),
                city: data.city.toUpperCase(),
                complement: data.complement,
            }
        }

        try {
            res = await axios.post(`/api/createClient`, client)
        } catch (err) {
            setErrMessage(err.response.data.message)
        }
        // Redirection vers le home avec création de la session (store)
        console.log(res)

        dispatch({ type: "cart/login", payload: { id: res.data.client._id, firstname: res.data.client.firstname, lastname: res.data.client.lastname } })
        navigate("/")
    }

    const handleChange = (e) => {
        if (Object.keys(errors).length !== 0) {
            if (errors[e.target.name] !== undefined && errors[e.target.name].message !== "") {
                errors[e.target.name].message = ""
                setState({})    //
            }
        }
    }

    return (
        <>
            <Typography variant="h2" padding={3} textAlign="center">
                Nouveau client ?
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" padding={3} textAlign="center">
                    Informations de connexion :
                </Typography>
                {fieldsGroupInfo.map((fields, k) => (
                    <Field key={k}
                        fields={fields}
                        register={register}
                        errors={errors}
                        handleChange={handleChange}
                    />
                ))}
                <Typography variant="h4" padding={3} textAlign="center">
                    Addresse :
                </Typography>
                {fieldsGroupAddress.map((fields, k) => (
                    <Field key={k}
                        fields={fields}
                        register={register}
                        errors={errors}
                        handleChange={handleChange}
                    />
                ))}
            </form>
            <p>{errMessage}</p>
            <Box
                m={1}
                display="flex"
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2, height: 40, width: 100 }}
                    onClick={handleSubmit(onSubmit)}
                >
                    S'inscrire
                </Button>
            </Box>
        </>
    );
}

export default Signup