import mongoose from 'mongoose'

const teaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Merci d'ajouter votre nom"],
    },
    ref: {
        type: String,
        required: [true, "Merci d'ajouter une référence produit"],
    },
    img : {
        type: String,
        required: [true, "Merci d'ajouter une image"],
    },
    origin : {
        type: String,
        required: [true, "Merci d'ajouter l'origine du produit"],
    },
    category : {
        type: String,
        required: [true, "Merci d'ajouter le type de thé (exemples : noir, vert, rooïbos, blanc, infusion...)"],
    },
    description : {
        type: String,
        required: [true, "Merci d'ajouter une description succincte (exemple : thé noir à la bergamote"],
    },
    detail : {
        type: String,
        required: [true, "Merci d'ajouter le descriptif complet du produit"],
    },
    unitPrice : {
        type: Number,
        required: [true, "Merci d'indiquer un prix unitaire pour 100 grammes"],
    },
    bagSize : [{
        size : {
            type: Number,
            required: [true, "Merci d'indiquer le volume"],
        },
        reducePrice : {
            type: Number,
            required: [true, "Merci d'indiquer la réduction"],
        }   
    }],
    reviews : [{
        note :      {type: Number, required: [true, "Merci d'indiquer votre note (ex : 1 à 5 étoiles)"]},
        date :      {type: Date, default: Date.now()},
        author :    {type: String, required: [true, "Merci d'indiquer votre nom"]},
        content :   {type: String, required: [true, "Commentaire obligatoire"]}     
    }],
    stock: [{
        bagSize :   {type: Number, required : [true, "Format obligatoire"]},
        quantity :  {type: Number, required : [true, "Quantité obligatoire"]},
    }],
    isDiscounted :  {type: Boolean, default: false},
    isGrandCru :    {type: Boolean,default: false},
    isNewProduct :  {type: Boolean,default: false},
    isBestSeller :  {type: Boolean,default: false},
    isFavorite :    {type: Boolean,default: false},
},
    {
        timestamps: true
    }
)

export default mongoose.model("teas", teaSchema)