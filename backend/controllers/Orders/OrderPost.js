import orderModel from "../../models/orderModel.js"

// Post Order
export default (req, res) => {
    const myOrder = new orderModel(req.body)
    try {
        myOrder.save()
    } catch (err) {
        return console.log(err);
    }
    return res
        .status(201)
        .json( {myOrder} );
}
