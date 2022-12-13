import mongoose from "mongoose"
import colors from "colors"
import express from 'express';

export default () => {
    mongoose.connect(`mongodb+srv://admin:admin123@cluster0.vvbk4t6.mongodb.net/CupOfTea?retryWrites=true&w=majority`)

    mongoose.connection.on("error", () => {console.log(`Connection impossible avec la DB ${process.env.DBNAME}`)})

    mongoose.connection.on("open", () =>{console.log(`Connection établie avec la DB ${process.env.DBNAME}`)})

}

