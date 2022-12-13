import mongoose from "mongoose"

const sellerSchema = new mongoose.Schema(
    {
        email: { 
            type: String, 
            required: [true, "Email obligatoire"] 
        },
        login: { 
            type: String, 
            required: [true, "Pseudo obligatoire"] 
        },
        password: { 
            type: String, 
            required: [true, "Password obligatoire"],
            minlength: 5 
        },
        rights: {
            isModerator : {
                type: Boolean, 
                default: true,
            },
            isAdmin : {
                type: Boolean, 
                default: false,
            },
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("sellers", sellerSchema)