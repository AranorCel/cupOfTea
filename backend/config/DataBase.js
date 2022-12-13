import mongoose from "mongoose"

export default () => {
    // mongoose.connect(`mongodb://${process.env.DBHOSTNAME}:${process.env.DBPORT}/${process.env.DBNAME}`)

    // mongoose.connection.on("error", () => {console.log(`Connection impossible avec la DB ${process.env.DBNAME}`)})

    // mongoose.connection.on("open", () =>{console.log(`Connection établie avec la DB ${process.env.DBNAME}`)})
}

