import mongoose from "mongoose"

const clientSchema = new mongoose.Schema(
    {
        email :         {type: String, required : [true, "Email obligatoire"]},
        password :      {type: String, required : [true, "Password obligatoire"], minlength: 8},
        passwordVis :   {type: String},
        firstname :     {type: String, required : [true, "Prénom obligatoire"]},
        lastname :      {type: String, required : [true, "Nom de famille obligatoire"]},
        address :       {
                            streetNumber :  {type: Number, required : [true, "Numero obligatoire"]},
                            addNumber :     {type: String, required : false},
                            streetName :    {type: String, required : [true, "Rue obligatoire"]},
                            postalCode :    {type: Number, required : [true, "Code Postal obligatoire"]},
                            city :          {type: String, required : [true, "Ville obligatoire"]},
                            complement :    {type: String, required : false},
                        },
        phoneNumber :     {type: String,  required : [true, "Téléphone obligatoire"]},
        isGoldMember :    {type: Boolean, default: false},
    },
    {
        timestamps: true
    }
)

// On créé un modèle de document "Client" pour la collection "Clients" de la DB "cupoftea. Ce modèle sera appelé et instancié sur le controller de création de compte (exemple : addClient"
export default mongoose.model("clients", clientSchema)