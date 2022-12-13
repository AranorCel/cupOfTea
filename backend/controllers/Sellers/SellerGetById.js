import sellerModel from '../../models/sellerModel.js';

//? Get Seller
export default async (req, res) => {
    let mySeller;
    try {
        mySeller = await sellerModel.findById(req.query.id);
    } catch (err) {
        console.log(err)
    } if (!mySeller) {
        res.status(404).json({ message: 'No Seller Found' })
    } else {
        return res.status(200).json( {mySeller} );
    }
};


