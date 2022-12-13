import router from './routes/routes.js';
import * as dotenv from 'dotenv'
import express from 'express';
// import connectDB from "./config/DataBase.js"
import connectDB from "./config/DataBaseAtlas.js"
import cors from "cors"
import session from "express-session"
import dotenvExpand from 'dotenv-expand'
import mongoose from 'mongoose';
import colors from "colors"

dotenv.config()
dotenvExpand.expand(dotenv)

// Importation de express et on l'assigne à la const app
export const app = express();

// Création de l'access public
app.use(express.static('public'));

// Initialisation du système de session
app.use(session({
	secret: process.env.MYSECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 3600000 }
}));

// Eviter les problèmes de crossorigin
app.use(cors());

// Pour la gestion des JSON au cas où
app.use(express.json())

//! Pour l'accessibilité en méthode POST
app.use(express.urlencoded({ extended: true }))

// Chargement des Routes
app.use("/", router)

// Connection à la Base de Données
connectDB()

// Ouverture de l'écoute sur le port
app.listen(process.env.PORT, () =>
    console.log(`Serveur started on port http://${process.env.MYHOSTNAME}:${process.env.PORT}`));