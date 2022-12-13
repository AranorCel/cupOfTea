import orderModel from '../../models/orderModel.js';

//? Get Orders
export default async (req, res) => {
    let myOrder;
    try {
        myOrder = await orderModel.findById(req.query.id);
    } catch (err) {
        console.log(err)
    } if (!myOrder) {
        res.status(404).json({ message: 'No Order Found' })
    } else {
        return res.status(200).json( {myOrder} );
    }
};


