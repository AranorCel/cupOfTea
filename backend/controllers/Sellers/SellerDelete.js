import sellerModel from "../../models/sellerModel.js";

// Delete Seller
export default async (req, res, next) => {

    const id = req.query.id
    let seller;
    try {
        seller = await sellerModel.findByIdAndDelete(id)
    } catch (err) {
        return console.log(err)
    }
    if (!seller) {
        return res.status(500).json({ message: 'This seller has already been removed' })
    }
    return res.status(200).json({ message: 'Successfully deleted' });
}