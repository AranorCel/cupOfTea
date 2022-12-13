import orderModel from "../../models/orderModel.js"

// Delete Order
export default async (req, res, next) => {
    const id = req.query.id
    let order;
    try {
        order = await orderModel.findByIdAndDelete(id)
    } catch (err) {
        return console.log(err)
    }
    if (!order) {
        return res.status(500).json({ message: 'This order has already been removed' })
    }
    return res.status(200).json({ message: 'Successfully deleted' });
}