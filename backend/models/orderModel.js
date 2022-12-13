import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    client:             {type: mongoose.Types.ObjectId, ref: "Client", required: true},
    cart: [{
        type:           { type: mongoose.Types.ObjectId, ref: "Tea", required: true },
        name:           { type: String, required: true },
        bagSize :       { type: Number, required: true },
        quantity:       { type: Number, required: true },
        price:          { type: Number, required: true },
    }],
    totalPrice:         { type: Number, required: true },
    paymentMethod:      { type: String, required: true },
    shippingPrice:      { type: String, required: true },
    shoppingPlace:      { type: String, required: true },
    shippingAddress:    {
        streetNumber :  {type: Number,required: [true, "numéro de rue obligatoire"]},
        addNumber:      {type: String,required: false},
        streetName:     {type: String,required: [true, "nom de rue ou équivalent"]},
        postalCode:     {type: Number,required: [true, "numéro de commune"]},
        city:           {type: String,required: [true, "nom de ville"]},
    },
    isValidated :       {type: Boolean, required : true},
    isPaid :            {type: Boolean, required : true},
    isShipped :         {type: Boolean, required : true},
    isDelivered :       {type: Boolean, required : true},
})

export default mongoose.model("orders", orderSchema)