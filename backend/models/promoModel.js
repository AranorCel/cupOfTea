import mongoose from "mongoose"

const promoSchema = new mongoose.Schema(
    {
        label :         {type: String, required : true},
        products :      [{
                            type :          {type: mongoose.Types.ObjectId, ref: 'Tea', required : true},
                            discountValue : {type: Number, required : true},
                        }],
        startDate :     {type: Date, required : true},
        endDate :       {type: Date, required : true},
    },
    {
        timestamps : true
    }
)

export const Promo = mongoose.model("promos", promoSchema)