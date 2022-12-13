import orderModel from "../../models/orderModel.js"

// Update Order
export default async (req, res, next) => {
    let order;
    try {
        order = await orderModel.findByIdAndUpdate(req.body.id,req.body,{new: true})

    } catch (err) {
        return console.log(err);
    }
    if (!order) {
        return res.status(500).json({ message: 'This order does not exist' })
    }
    return res.status(200).json( {order} )
}
